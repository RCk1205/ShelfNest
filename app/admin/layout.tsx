import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#D6EBF3]">
      <div className="flex min-h-screen">

        {/* Sidebar */}
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
  href="/admin/settings"
  className="block px-4 py-3 rounded-lg text-gray-800 hover:bg-[#D6EBF3]"
>
  Settings
</Link>
<Link
  href="/admin/orders"
  className="block px-4 py-3 rounded-lg text-gray-800 hover:bg-[#D6EBF3]"
>
  Orders
</Link>

          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          <div className="p-8">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}