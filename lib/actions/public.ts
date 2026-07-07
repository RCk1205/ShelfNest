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

export async function getBookBySlug(slug: string) {
  return prisma.book.findFirst({
    where: {
      slug,
      isActive: true,
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
    include: {
      category: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPublicCategories() {
  return prisma.category.findMany({
    where: {
      isActive: true,
    },
    include: {
      books: {
        where: {
          isActive: true,
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findFirst({
    where: {
      slug,
      isActive: true,
    },
    include: {
      books: {
        where: {
          isActive: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

export async function searchBooks(search: string) {
  const query = search.trim();

  if (!query) {
    return getLatestBooks();
  }

  return prisma.book.findMany({
    where: {
      isActive: true,
      OR: [
        {
          title: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          author: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          isbn: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}