"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

export default function AddToCartButton({
  book,
}: {
  book: any;
}) {
  const { addToCart } = useCart();

  const [added, setAdded] =
    useState(false);

  if (book.stock <= 0) {
    return (
      <button
        disabled
        className="px-8 py-3 rounded-lg bg-gray-400 text-white cursor-not-allowed"
      >
        Out Of Stock
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        addToCart(book);

        setAdded(true);

        setTimeout(() => {
          setAdded(false);
        }, 2000);
      }}
      className={`px-8 py-3 rounded-lg text-white transition
      ${
        added
          ? "bg-green-600"
          : "bg-[#447F98] hover:bg-[#2F657C]"
      }`}
    >
      {added
        ? "Added To Cart ✓"
        : "Add To Cart"}
    </button>
  );
}