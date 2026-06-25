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

    enableCOD: boolean;
    enableUPI: boolean;
    enableCard: boolean;
    enableNetBanking: boolean;

    razorpayEnabled: boolean;
  }
) {
  const existing =
    await prisma.storeSettings.findFirst();

  if (existing) {
    return prisma.storeSettings.update({
      where: {
        id: existing.id,
      },
      data: {
        storeName: formData.storeName,
        logo: formData.logo,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        bannerImage: formData.bannerImage,

        enableCOD: formData.enableCOD,
        enableUPI: formData.enableUPI,
        enableCard: formData.enableCard,
        enableNetBanking:
          formData.enableNetBanking,

        razorpayEnabled:
          formData.razorpayEnabled,
      },
    });
  }

  return prisma.storeSettings.create({
    data: {
      storeName: formData.storeName,
      logo: formData.logo,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      bannerImage: formData.bannerImage,

      enableCOD: formData.enableCOD,
      enableUPI: formData.enableUPI,
      enableCard: formData.enableCard,
      enableNetBanking:
        formData.enableNetBanking,

      razorpayEnabled:
        formData.razorpayEnabled,
    },
  });
}
export async function getPaymentSettings() {
  const settings =
    await prisma.storeSettings.findFirst();

  return {
    enableCOD:
      settings?.enableCOD ?? true,

    enableUPI:
      settings?.enableUPI ?? false,

    enableCard:
      settings?.enableCard ?? false,

    enableNetBanking:
      settings?.enableNetBanking ?? false,

    razorpayEnabled:
      settings?.razorpayEnabled ??
      false,
  };
}