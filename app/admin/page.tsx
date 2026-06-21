import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const totalBooks = await prisma.book.count();

  const totalCategories =
    await prisma.category.count();

  const featuredBooks =
    await prisma.book.count({
      where: {
        featured: true,
      },
    });

  const lowStockBooks =
    await prisma.book.count({
      where: {
        stock: {
          lte: 5,
        },
      },
    });

  const recentBooks =
    await prisma.book.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-700 mt-2">
          Welcome to ShelfNest
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl border-l-4 border-[#447F98] p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm">
            Total Books
          </h3>

          <p className="text-3xl font-bold text-gray-900 mt-2">
            {totalBooks}
          </p>
        </div>

        <div className="bg-white rounded-xl border-l-4 border-[#447F98] p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm">
            Categories
          </h3>

          <p className="text-3xl font-bold text-gray-900 mt-2">
            {totalCategories}
          </p>
        </div>

        <div className="bg-white rounded-xl border-l-4 border-[#447F98] p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm">
            Featured Books
          </h3>

          <p className="text-3xl font-bold text-gray-900 mt-2">
            {featuredBooks}
          </p>
        </div>

        <div className="bg-white rounded-xl border-l-4 border-[#447F98] p-6 shadow-sm">
          <h3 className="text-gray-600 text-sm">
            Low Stock
          </h3>

          <p className="text-3xl font-bold text-gray-900 mt-2">
            {lowStockBooks}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl border overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Books
          </h2>
        </div>

        <table className="w-full">

          <thead>

            <tr className="border-b bg-[#EAF4F8]">

              <th className="text-left p-4 text-gray-900">
                Title
              </th>

              <th className="text-left p-4 text-gray-900">
                Author
              </th>

              <th className="text-left p-4 text-gray-900">
                Category
              </th>

              <th className="text-left p-4 text-gray-900">
                Stock
              </th>

            </tr>

          </thead>

          <tbody>

            {recentBooks.map((book) => (

              <tr
                key={book.id}
                className="border-b"
              >

                <td className="p-4 text-gray-800">
                  {book.title}
                </td>

                <td className="p-4 text-gray-800">
                  {book.author}
                </td>

                <td className="p-4 text-gray-800">
                  {book.category.name}
                </td>

                <td className="p-4 text-gray-800">
                  {book.stock}
                </td>

              </tr>

            ))}

            {recentBooks.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-gray-500"
                >
                  No books available
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}