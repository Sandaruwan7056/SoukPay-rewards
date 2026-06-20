import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  me,
  transactions,
  redemptions,
  leaderboard,
} from "../controllers/user.controller";

const router = Router();

router.get("/me", authMiddleware, me);

router.get("/me/transactions", authMiddleware, transactions);

router.get("/me/redemptions", authMiddleware, redemptions);

router.get("/leaderboard", leaderboard);

export default router;