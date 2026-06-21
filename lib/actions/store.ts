"use server";

import { prisma } from "@/lib/prisma";

export async function getStoreSettings() {
  const settings =
    await prisma.storeSettings.findFirst();

  return settings;
}

export async function saveStoreSettings(
  formData: {
    storeName: string;
    logo?: string;
    email?: string;
    phone?: string;
    address?: string;
    bannerImage?: string;
  }
) {
  const existing =
    await prisma.storeSettings.findFirst();

  if (existing) {
    return prisma.storeSettings.update({
      where: {
        id: existing.id,
      },
      data: formData,
    });
  }

  return prisma.storeSettings.create({
    data: formData,
  });
}