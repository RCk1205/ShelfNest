import Link from "next/link";
import Image from "next/image";
import { getBooks, deleteBook } from "@/lib/actions/book";

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div>
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Books
            </h1>

            <p className="text-gray-700">
              Manage bookstore inventory
            </p>
          </div>

          <Link
            href="/admin/books/new"
            className="px-4 py-2 rounded-lg bg-[#447F98] hover:bg-[#2F657C] text-white"
          >
            Add Book
          </Link>

        </div>

        <div className="bg-white rounded-xl border overflow-hidden">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-[#EAF4F8]">

                <th className="text-left p-4 font-semibold text-gray-900">
                  Cover
                </th>

                <th className="text-left p-4 font-semibold text-gray-900">
                  Title
                </th>

                <th className="text-left p-4 font-semibold text-gray-900">
                  Author
                </th>

                <th className="text-left p-4 font-semibold text-gray-900">
                  Category
                </th>

                <th className="text-left p-4 font-semibold text-gray-900">
                  MRP
                </th>

                <th className="text-left p-4 font-semibold text-gray-900">
                  Price
                </th>

                <th className="text-left p-4 font-semibold text-gray-900">
                  Stock
                </th>

                <th className="text-left p-4 font-semibold text-gray-900">
                  Status
                </th>

                <th className="text-left p-4 font-semibold text-gray-900">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {books.map((book: any) => {

                const discount =
                  book.mrp > 0
                    ? Math.round(
                        ((book.mrp - book.price) /
                          book.mrp) *
                          100
                      )
                    : 0;

                return (
                  <tr
                    key={book.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">

                      {book.image ? (
                        <Image
                          src={book.image}
                          alt={book.title}
                          width={60}
                          height={80}
                          className="rounded border object-cover"
                        />
                      ) : (
                        <div className="w-[60px] h-[80px] rounded border bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                          No Image
                        </div>
                      )}

                    </td>

                    <td className="p-4 text-gray-900 font-medium">
                      {book.title}
                    </td>

                    <td className="p-4 text-gray-800">
                      {book.author}
                    </td>

                    <td className="p-4 text-gray-800">
                      {book.category?.name}
                    </td>

                    <td className="p-4 text-gray-700">
                      ₹{book.mrp}
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-green-700">
                        ₹{book.price}
                      </div>

                      {discount > 0 && (
                        <div className="text-xs text-red-600">
                          {discount}% OFF
                        </div>
                      )}
                    </td>

                    <td className="p-4 text-gray-800">
                      {book.stock}
                    </td>

                    <td className="p-4">

                      {book.isActive ? (
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                          Inactive
                        </span>
                      )}

                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <Link
                          href={`/admin/books/edit/${book.id}`}
                          className="px-3 py-1 rounded bg-[#447F98] hover:bg-[#2F657C] text-white"
                        >
                          Edit
                        </Link>

                        <form
                          action={async () => {
                            "use server";
                            await deleteBook(book.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="px-3 py-1 rounded bg-red-500 text-white"
                          >
                            Delete
                          </button>
                        </form>

                      </div>

                    </td>

                  </tr>
                );
              })}

              {books.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="p-8 text-center text-gray-500"
                  >
                    No books found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}