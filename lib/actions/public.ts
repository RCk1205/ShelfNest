"use server";

import { prisma } from "@/lib/prisma";

export async function getFeaturedBooks() {
  return prisma.book.findMany({
    where: {
      isActive: true,
      featured: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });
}

export async function getLatestBooks() {
  return prisma.book.findMany({
    where: {
      isActive: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 12,
  });
}
export async function getBookBySlug(
  slug: string
) {
  return prisma.book.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
    },
  });
}
export async function getBestSellerBooks() {
  return prisma.book.findMany({
    where: {
      isActive: true,
      bestseller: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });
}