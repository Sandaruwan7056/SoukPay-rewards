import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(req: any, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ message: "No Token" })
    }

    const token = header.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}
