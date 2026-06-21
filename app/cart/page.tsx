"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce(
    (sum: number, item: any) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#F8FBFD]">

      <div className="max-w-6xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Shopping Cart
        </h1>

        <p className="text-gray-600 mb-8">
          {cart.length} item(s) in cart
        </p>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl border p-8">

            <p className="text-gray-600">
              Your cart is empty.
            </p>

            <Link
              href="/books"
              className="inline-block mt-4 px-4 py-2 rounded-lg bg-[#447F98] hover:bg-[#2F657C] text-white"
            >
              Browse Books
            </Link>

          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 space-y-4">

              {cart.map((item: any) => (

                <div
                  key={item.id}
                  className="bg-white rounded-xl border p-4 flex gap-4"
                >

                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={90}
                      height={120}
                      className="rounded border"
                    />
                  ) : (
                    <div className="w-[90px] h-[120px] bg-gray-100 rounded border" />
                  )}

                  <div className="flex-1">

                    <h2 className="font-semibold text-gray-900">
                      {item.title}
                    </h2>

                    <p className="text-gray-600">
                      {item.author}
                    </p>

                    <p className="font-bold text-[#447F98] mt-2">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-3">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="w-8 h-8 rounded bg-gray-200"
                      >
                        -
                      </button>

                      <span className="font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="w-8 h-8 rounded bg-gray-200"
                      >
                        +
                      </button>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Subtotal: ₹
                      {item.price * item.quantity}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="px-3 py-1 rounded bg-red-500 text-white h-fit"
                  >
                    Remove
                  </button>

                </div>

              ))}

            </div>

            <div>

              <div className="bg-white rounded-xl border p-6 sticky top-6">

                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-3">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between mb-6">
                  <span>Total</span>
                  <span className="font-bold text-lg">
                    ₹{total}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="block text-center px-4 py-3 rounded-lg bg-[#447F98] hover:bg-[#2F657C] text-white hover:bg-[#447F98]"
                >
                  Proceed To Checkout
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}