"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/actions/wishlist";

export default function WishlistButton({
  bookId,
}: {
  bookId: string;
}) {
  const { data: session } =
    useSession();

  const [saved, setSaved] =
    useState(false);

  async function handleWishlist() {
    if (!session?.user) {
  toast.error(
    "Please login first."
  );
  return;
}

    if (saved) {
      await removeFromWishlist(
        (session.user as any).id,
        bookId
      );

      setSaved(false);
    } else {
      await addToWishlist(
        (session.user as any).id,
        bookId
      );

      setSaved(true);
    }
  }

  return (
    <button
      onClick={handleWishlist}
      className={`px-6 py-3 rounded-lg text-white
      ${
        saved
          ? "bg-red-500"
          : "bg-pink-500"
      }`}
    >
      {saved
        ? "Remove Wishlist"
        : "Add Wishlist"}
    </button>
  );
}