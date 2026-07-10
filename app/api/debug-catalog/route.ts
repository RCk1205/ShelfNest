import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const [totalBooks, activeBooks, books] = await Promise.all([
      prisma.book.count(),
      prisma.book.count({
        where: {
          isActive: true,
        },
      }),
      prisma.book.findMany({
        select: {
          title: true,
          author: true,
          isActive: true,
          featured: true,
          bestseller: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return NextResponse.json(
      {
        environment: process.env.VERCEL_ENV ?? "local",
        databaseHost:
          new URL(process.env.DATABASE_URL ?? "").hostname,
        totalBooks,
        activeBooks,
        bookCountReturned: books.length,
        books,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        databaseHost: process.env.DATABASE_URL
          ? new URL(process.env.DATABASE_URL).hostname
          : "DATABASE_URL is missing",
      },
      { status: 500 }
    );
  }
}