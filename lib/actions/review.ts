"use server";

import { prisma } from "@/lib/prisma";

export async function addReview(
  userId: string,
  bookId: string,
  rating: number,
  comment: string
) {
  return prisma.review.upsert({
    where: {
      userId_bookId: {
        userId,
        bookId,
      },
    },

    update: {
      rating,
      comment,
    },

    create: {
      userId,
      bookId,
      rating,
      comment,
    },
  });
}

export async function getBookReviews(
  bookId: string
) {
  return prisma.review.findMany({
    where: {
      bookId,
    },

    include: {
      user: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAverageRating(
  bookId: string
) {
  const result =
    await prisma.review.aggregate({
      where: {
        bookId,
      },

      _avg: {
        rating: true,
      },
    });

  return result._avg.rating || 0;
}