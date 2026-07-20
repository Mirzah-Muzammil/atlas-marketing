import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

// Load environment variables from .env file if running in Node environment
if (typeof process !== "undefined" && typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile();
  } catch (error) {
    // Ignore error if .env doesn't exist
  }
}


const getPrismaInstance = () => {
  const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Neither TURSO_DATABASE_URL nor DATABASE_URL is defined in environment variables.");
  }

  const adapter = new PrismaLibSql({
    url: url,
    authToken: process.env.TURSO_DATABASE_URL ? process.env.TURSO_AUTH_TOKEN : undefined,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof getPrismaInstance> | undefined;
};

export const prisma = globalForPrisma.prisma ?? getPrismaInstance();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
