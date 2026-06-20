import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma"
import { signToken } from "../utils/jwt";

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new Error("Invalid Email or Password");

    const token = signToken({ userId: user.id });

    return { token };
}