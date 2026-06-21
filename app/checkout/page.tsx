"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/components/cart/CartContext";
import { createOrder } from "@/lib/actions/order";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart } = useCart();

  const [customerName, setCustomerName] =
    useState("");

  const [customerEmail, setCustomerEmail] =
    useState("");

  const [customerPhone, setCustomerPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const order =
      await createOrder({
        customerName,
        customerEmail,
        customerPhone,
        address,

        items: cart.map(
          (item: any) => ({
            bookId: item.id,
            quantity:
              item.quantity,
            price: item.price,
          })
        ),
      });

    router.push(
      `/order-success?id=${order.id}`
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FBFD]">

      <div className="max-w-3xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border p-6 space-y-4"
        >

          <input
            placeholder="Full Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            placeholder="Email"
            value={customerEmail}
            onChange={(e) =>
              setCustomerEmail(
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            placeholder="Phone"
            value={customerPhone}
            onChange={(e) =>
              setCustomerPhone(
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <textarea
            rows={5}
            placeholder="Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-[#447F98] text-white"
          >
            Place Order
          </button>

        </form>

      </div>

    </div>
  );
}