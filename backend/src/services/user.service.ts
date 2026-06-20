import { prisma } from "../lib/prisma";

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const ledger = await prisma.point_ledger.findMany({
    where: { user_id: userId },
  });

  const balance = ledger.reduce((sum, l) => sum + l.delta, 0);

  return { user, balance };
}

export async function getTransactions(userId: string, page = 1, limit = 20) {
  const skip = (page - 1) * limit;

  return prisma.point_ledger.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    skip,
    take: limit,
  });
}

export async function getRedemptions(userId: string) {
  return prisma.redemption.findMany({
    where: { user_id: userId },
  });
}

export async function leaderboard() {
  const users = await prisma.user.findMany({
    include: { ledger: true },
  });

  return users
    .map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      total: u.ledger.reduce((sum, l) => sum + l.delta, 0),
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);
}