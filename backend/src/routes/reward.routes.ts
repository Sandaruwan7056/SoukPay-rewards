import express from "express";
import { redeem, getRewards } from "../controllers/reward.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, getRewards);
router.post("/:id/redeem", authMiddleware, redeem);

export default router;