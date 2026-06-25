"use server";

import { prisma } from "@/lib/prisma";

export async function addToWishlist(
  userId: string,
  bookId: string
) {
  return prisma.wishlist.upsert({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },

    update: {},

    create: {
      userId,
      bookId,
    },
  });
}

export async function removeFromWishlist(
  userId: string,
  bookId: string
) {
  return prisma.wishlist.deleteMany({
    where: {
      userId,
      bookId,
    },
  });
}

export async function getWishlist(
  userId: string
) {
  return prisma.wishlist.findMany({
    where: {
      userId,
    },

    include: {
      book: true,
    },
  });
}