"use server";

import { prisma } from "@/lib/prisma";

export async function createOrder(formData: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;

  userId?: string;

  paymentMethod:
    | "COD"
    | "UPI"
    | "CARD"
    | "NET_BANKING";

  paymentStatus?:
    | "PENDING"
    | "PAID"
    | "FAILED";

  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;

  discount?: number;

  items: {
    bookId: string;
    quantity: number;
    price: number;
  }[];
}) {

  return await prisma.$transaction(async (tx) => {

    const subtotal = formData.items.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    const total =
      subtotal *
      (100 - (formData.discount || 0)) /
      100;

 const orderNumber =
  `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Validate stock
    for (const item of formData.items) {

      const book =
        await tx.book.findUnique({
          where: {
            id: item.bookId,
          },
        });

      if (!book) {
        throw new Error(
          "Book not found"
        );
      }

      if (book.stock < item.quantity) {
        throw new Error(
          `${book.title} has only ${book.stock} copies left`
        );
      }

    }

    // Create order
    const order =
      await tx.order.create({

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

          userId:
            formData.userId || null,

          subtotal,

          shipping: 0,

          total,

          paymentMethod:
            formData.paymentMethod,

          paymentStatus:
            formData.paymentStatus ??
            "PENDING",

          razorpayOrderId:
            formData.razorpayOrderId,

          razorpayPaymentId:
            formData.razorpayPaymentId,

          razorpaySignature:
            formData.razorpaySignature,

          items: {

            create:
              formData.items.map(
                (item) => ({
                  bookId:
                    item.bookId,
                  quantity:
                    item.quantity,
                  price:
                    item.price,
                })
              ),

          },

        },

      });

    // Reduce stock
    for (const item of formData.items) {

      await tx.book.update({

        where: {
          id: item.bookId,
        },

        data: {
          stock: {
            decrement:
              item.quantity,
          },
        },

      });

    }

    return order;

  });

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
export async function updatePaymentStatus(
  id: string,
  paymentStatus:
    | "PENDING"
    | "PAID"
    | "FAILED"
) {
  return prisma.order.update({
    where: {
      id,
    },
    data: {
      paymentStatus,
    },
  });
}