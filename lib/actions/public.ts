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

export async function getRelatedBooks(
  categoryId: string,
  currentBookId: string
) {
  return prisma.book.findMany({
    where: {
      categoryId,
      isActive: true,

      NOT: {
        id: currentBookId,
      },
    },

    take: 4,

    orderBy: {
      createdAt: "desc",
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
export async function getPublicCategories() {
  return prisma.category.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCategoryBySlug(
  slug: string
) {
  return prisma.category.findUnique({
    where: {
      slug,
    },
    include: {
      books: {
        where: {
          isActive: true,
        },
      },
    },
  });
}
export async function searchBooks(
  search: string
) {
  return prisma.book.findMany({
    where: {
      isActive: true,
      OR: [
        {
          title: {
            contains: search,
          },
        },
        {
          author: {
            contains: search,
          },
        },
      ],
    },
    include: {
      category: true,
    },
  });
}