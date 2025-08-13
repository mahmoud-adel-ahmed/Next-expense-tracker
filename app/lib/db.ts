import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = global.prisma || prisma;

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}
