import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const data = await authService.login(email, password);

    return res.json(data);
  } catch (error: any) {
    return res.status(400).json({ message: error.message || "Server Error"});
  }
}