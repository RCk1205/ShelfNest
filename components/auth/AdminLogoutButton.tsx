"use client";

import { signOut } from "next-auth/react";

export default function AdminLogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/admin/login",
        })
      }
      className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
    >
      Logout
    </button>
  );
}