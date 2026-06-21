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
          : "bg-[#447F98] hover:bg-[#2F657C] hover:bg-[#447F98]"
      }`}
    >
      {added
        ? "Added To Cart ✓"
        : "Add To Cart"}
    </button>
  );
}