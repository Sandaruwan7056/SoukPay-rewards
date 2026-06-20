import { Response } from "express";
import * as rewardService from "../services/reward.service";

export async function getRewards(req: any, res: Response) {
    try {
        const data = await rewardService.getRewards();
        return res.json(data);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message || "Server Error",
        });
    }
}

export async function redeem(req: any, res: Response) {
    try {
        const rewardId = req.params.id;
        const idempotencyKey = req.headers["x-idempotency-key"] as string;

        const data = await rewardService.redeemReward(
            req.user.userId,
            rewardId,
            idempotencyKey
        );

        return res.json(data);
    } catch (error: any) {
        return res.status(400).json({
            message: error.message || "Server Error",
        });
    }
}