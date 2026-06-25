"use server";

import { prisma } from "@/lib/prisma";

export async function getCouponByCode(
  code: string
) {
  return prisma.coupon.findFirst({
    where: {
      code: code.toUpperCase(),
      active: true,
    },
  });
}

export async function getCoupons() {
  return prisma.coupon.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createCoupon(
  code: string,
  discount: number
) {
  return prisma.coupon.create({
    data: {
      code: code.toUpperCase(),
      discount,
    },
  });
}
export async function deleteCoupon(
  id: string
) {
  return prisma.coupon.delete({
    where: {
      id,
    },
  });
}