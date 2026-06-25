"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const router = useRouter();

  const { data: session } =
    useSession();

  const [search, setSearch] =
    useState("");

  const { cart } = useCart();

  const cartCount = cart.reduce(
    (sum: number, item: any) =>
      sum + item.quantity,
    0
  );

  function handleSearch(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(
      `/books?search=${encodeURIComponent(
        search
      )}`
    );
  }

  async function handleLogout() {
    await signOut({
      callbackUrl: "/",
    });
  }

  return (
    <header className="bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        <Link
          href="/"
          className="text-2xl font-bold text-[#447F98]"
        >
          ShelfNest
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md"
        >

          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-[#447F98]"
          />

        </form>

        <nav className="flex items-center gap-6 text-gray-700 font-medium">

          <Link
            href="/"
            className="hover:text-[#447F98]"
          >
            Home
          </Link>

          <Link
            href="/books"
            className="hover:text-[#447F98]"
          >
            Books
          </Link>

          <Link
            href="/categories"
            className="hover:text-[#447F98]"
          >
            Categories
          </Link>

          <Link
            href="/cart"
            className="hover:text-[#447F98]"
          >
            Cart ({cartCount})
          </Link>

          {!session ? (
            <>
              <Link
                href="/register"
                className="px-4 py-2 rounded-lg border border-[#447F98] text-[#447F98]"
              >
                Register
              </Link>

              <Link
                href="/login"
                className="px-4 py-2 rounded-lg bg-[#447F98] hover:bg-[#2F657C] text-white"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {(session.user as any)?.role ===
              "ADMIN" ? (
                <Link
                  href="/admin"
                  className="px-4 py-2 rounded-lg border border-[#447F98] text-[#447F98]"
                >
                  Admin
                </Link>
              ) : (
                <Link
                  href="/account"
                  className="px-4 py-2 rounded-lg border border-[#447F98] text-[#447F98]"
                >
                  My Account
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-[#447F98] hover:bg-[#2F657C] text-white"
              >
                Logout
              </button>
            </>
          )}

        </nav>

      </div>

    </header>
  );
}