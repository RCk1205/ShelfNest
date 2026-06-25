import Link from "next/link";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminLogoutButton from "@/components/auth/AdminLogoutButton";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname =
  (await headers()).get(
    "x-invoke-path"
  ) || "";

if (
  pathname !== "/admin/login"
) {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session) {
    redirect("/admin/login");
  }

  if (
    (session.user as any).role !==
    "ADMIN"
  ) {
    redirect("/");
  }
}

  return (
    <div className="min-h-screen bg-[#D6EBF3]">
      <div className="flex min-h-screen">

        <aside className="w-64 bg-white border-r border-gray-200">

          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              ShelfNest
            </h1>

            <p className="text-sm text-gray-600">
              Bookstore Management
            </p>
          </div>

          <nav className="p-4 space-y-2">

            <Link
              href="/admin"
              className="block px-4 py-3 rounded-lg text-gray-800 hover:bg-[#D6EBF3]"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/categories"
              className="block px-4 py-3 rounded-lg text-gray-800 hover:bg-[#D6EBF3]"
            >
              Categories
            </Link>

            <Link
              href="/admin/books"
              className="block px-4 py-3 rounded-lg text-gray-800 hover:bg-[#D6EBF3]"
            >
              Books
            </Link>

            <Link
              href="/admin/orders"
              className="block px-4 py-3 rounded-lg text-gray-800 hover:bg-[#D6EBF3]"
            >
              Orders
            </Link>
<Link
  href="/admin/coupons"
  className="block px-4 py-3 rounded-lg text-gray-800 hover:bg-[#D6EBF3]"
>
  Coupons
</Link>
            <Link
              href="/admin/settings"
              className="block px-4 py-3 rounded-lg text-gray-800 hover:bg-[#D6EBF3]"
            >
              Settings
            </Link>
<div className="pt-4 border-t border-gray-200">
  <AdminLogoutButton />
</div>
          </nav>

        </aside>

        <div className="flex-1">
          <div className="p-8">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}