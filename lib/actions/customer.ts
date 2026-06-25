"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function registerCustomer(formData: {
  name: string;
  email: string;
  password: string;
}) {
  const existing = await prisma.user.findUnique({
    where: {
      email: formData.email,
    },
  });

  if (existing) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(
    formData.password,
    10
  );

return prisma.user.create({
  data: {
    name: formData.name,
    email: formData.email,
    password: hashedPassword,
    role: "CUSTOMER",
  },
});
}