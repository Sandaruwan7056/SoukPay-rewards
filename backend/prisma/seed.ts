import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import {PrismaClient} from "../src/prisma/generated/client"
import bcrypt from "bcrypt";


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter });


const USER_PRESETS = [
    { email: "alice@example.com", name: "Alice Tan", password: "Password123!" },
    { email: "bob@example.com", name: "Bob Fernando", password: "Password123!" },
    { email: "carol@example.com", name: "Carol Jayasinghe", password: "Password123!" },
];


const REWARD_PRESETS = [
    {
        name: "Pro Sound Headphones",
        description: "Studio-quality audio with active noise cancellation for the ultimate focus.",
        image_url: "",
        points_cost: 1500,
        stock_remaining: 12,
        is_active: true,
    },
    {
        name: "Zen Spa Escape",
        description: "A full-day immersive relaxation experience at our partner luxury retreats.",
        image_url: "",
        points_cost: 15000,
        stock_remaining: 5,
        is_active: true,
    },
    {
        name: "First Class Upgrade",
        description: "Upgrade any international flight to First Class suite with premium amenities.",
        image_url: "",
        points_cost: 45000,
        stock_remaining: 10,
        is_active: true,
    },
    {
        name: "Vanguard Timepiece",
        description: "Limited edition automatic chronograph with sapphire crystal and leather strap.",
        image_url: "",
        points_cost: 22000,
        stock_remaining: 1,
        is_active: true,
    },
];


const LEDGER_DELTA_RULES = [
    5000,
    3000,
    2000,
    1500,
    1000,
    800,
    500,
    300,
    -1000,
    -1500,
];

const EARN_REASONS = [
    "Cashback Reward",
    "Luxury Watch",
    "Interest Accrual",
    "Transfer to External",
    "Luxury Boutique",
    "Global Airways",
    "Maison Bistro",
    "Referral Bonus",
    "Bolt Rides",
];


function randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function main() {

    const users = [];

    for (const user of USER_PRESETS) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const createdUser = await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: {
                ...user,
                password: hashedPassword,
            },
        });

        users.push(createdUser);
    }



    await prisma.reward.createMany({
        data: REWARD_PRESETS,
    });




    for (const user of users) {
        const entries = [];

        for (let i = 0; i < 15; i++) {
            entries.push({
                user_id: user.id,
                delta: randomItem(LEDGER_DELTA_RULES),
                reason: randomItem(EARN_REASONS),
            });
        }

        await prisma.point_ledger.createMany({
            data: entries,
        });
    }
}

main()
    .catch((e) => {
        console.error("Seeding error:", e);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });