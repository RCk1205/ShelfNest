"use server";

import { prisma } from "@/lib/prisma";

export async function createOrder(formData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;

  items: {
    bookId: string;
    quantity: number;
    price: number;
  }[];
}) {
  const subtotal = formData.items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const orderNumber =
    "ORD-" + Date.now();

  const order =
    await prisma.order.create({
      data: {
        orderNumber,

        customerName:
          formData.customerName,

        customerEmail:
          formData.customerEmail,

        customerPhone:
          formData.customerPhone,

        address:
          formData.address,

        subtotal,
        shipping: 0,
        total: subtotal,

        items: {
          create: formData.items.map(
            (item) => ({
              bookId: item.bookId,
              quantity: item.quantity,
              price: item.price,
            })
          ),
        },
      },
    });

  for (const item of formData.items) {
    await prisma.book.update({
      where: {
        id: item.bookId,
      },
      data: {
        stock: {
          decrement: item.quantity,
        },
      },
    });
  }

  return order;
}

export async function getOrders() {
  return prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getOrderById(
  id: string
) {
  return prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        include: {
          book: true,
        },
      },
    },
  });
}

export async function updateOrderStatus(
  id: string,
  orderStatus:
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
) {
  return prisma.order.update({
    where: {
      id,
    },
    data: {
      orderStatus,
    },
  });
}