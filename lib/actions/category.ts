"use server";

import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/validations/category";

export async function createCategory(formData: {
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
}) {
  const validated = categorySchema.parse(formData);

  const existing = await prisma.category.findUnique({
    where: {
      slug: validated.slug,
    },
  });

  if (existing) {
    throw new Error("Category slug already exists");
  }

  return await prisma.category.create({
    data: validated,
  });
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteCategory(id: string) {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
}

export async function toggleCategoryStatus(
  id: string,
  isActive: boolean
) {
  return await prisma.category.update({
    where: {
      id,
    },
    data: {
      isActive,
    },
  });
}
export async function getCategoryById(id: string) {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
}
export async function updateCategory(
  id: string,
  formData: {
    name: string;
    slug: string;
    description?: string;
    isActive: boolean;
  }
) {
  const validated = categorySchema.parse(formData);

  return await prisma.category.update({
    where: {
      id,
    },
    data: validated,
  });
}