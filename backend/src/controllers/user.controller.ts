import { Response } from "express";
import * as userService from "../services/user.service";

export async function me(req: any, res: Response) {
  try {
    const data = await userService.getMe(req.user.userId);
    return res.json(data);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

export async function transactions(req: any, res: Response) {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);

    const data = await userService.getTransactions(
      req.user.userId,
      page,
      limit
    );

    return res.json(data);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

export async function redemptions(req: any, res: Response) {
  try {
    const data = await userService.getRedemptions(req.user.userId);
    return res.json(data);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
}

export async function leaderboard(req: any, res: Response) {
  try {
    const data = await userService.leaderboard();
    return res.json(data);
  } catch (error: any) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
}