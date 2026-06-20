import { prisma } from "../lib/prisma";

export async function getRewards() {
    return prisma.reward.findMany({
        where: {
            is_active: true,
            stock_remaining: {
                gt: 0,
            },
        },
        orderBy: {
            points_cost: "asc",
        },
    });
}

export async function redeemReward(
  userId: string,
  rewardId: string,
  idempotencyKey: string
) {
  if (!idempotencyKey) {
    throw new Error("Missing Idempotency Key");
  }

  const existing = await prisma.redemption.findUnique({
    where: { idempotency_key: idempotencyKey },
  });

  if (existing) {
    return { message: "Already redeemed", data: existing };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { ledger: true },
  });

  if (!user) throw new Error("User not found");

  const reward = await prisma.reward.findUnique({
    where: { id: rewardId },
  });

  if (!reward || !reward.is_active) {
    throw new Error("Reward not available");
  }

  if (reward.stock_remaining <= 0) {
    throw new Error("Out of stock");
  }


  const balance = user.ledger.reduce((sum, l) => sum + l.delta, 0);

  if (balance < reward.points_cost) {
    throw new Error("Insufficient points");
  }

 
  const result = await prisma.$transaction(async (tx) => {

    const redemption = await tx.redemption.create({
      data: {
        user_id: userId,
        reward_id: rewardId,
        points_cost: reward.points_cost,
        idempotency_key: idempotencyKey,
      },
    });


    await tx.reward.update({
      where: { id: rewardId },
      data: {
        stock_remaining: {
          decrement: 1,
        },
      },
    });

   
    await tx.point_ledger.create({
      data: {
        user_id: userId,
        delta: -reward.points_cost,
        reason: reward.name,
      },
    });

    return redemption;
  });

  return result;
}
