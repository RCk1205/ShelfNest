"use server";

import { prisma } from "@/lib/prisma";
import { bookSchema } from "@/lib/validations/book";

export async function createBook(formData: {
  title: string;
  slug: string;
  author: string;
  language?: string;
  isbn?: string;
  description: string;
  mrp: number;
  price: number;
  stock: number;
  image?: string;
  categoryId: string;
  featured: boolean;
  bestseller: boolean;
  isActive: boolean;
}) {
  const validated = bookSchema.parse(formData);

  return prisma.book.create({
    data: validated,
  });
}

export async function getBooks() {
  return prisma.book.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getBookById(id: string) {
  return prisma.book.findUnique({
    where: {
      id,
    },
  });
}

export async function updateBook(
  id: string,
  formData: {
    title: string;
    slug: string;
    author: string;
    language?: string;
    isbn?: string;
    description: string;
    mrp: number;
    price: number;
    stock: number;
    image?: string;
    categoryId: string;
    featured: boolean;
    bestseller: boolean;
    isActive: boolean;
  }
) {
  const validated = bookSchema.parse(formData);

  return prisma.book.update({
    where: {
      id,
    },
    data: validated,
  });
}

export async function deleteBook(id: string) {
  return prisma.book.delete({
    where: {
      id,
    },
  });
}