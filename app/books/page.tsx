import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

import {
  getLatestBooks,
  searchBooks,
} from "@/lib/actions/public";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const params =
    await searchParams;

  const search =
    params.search || "";

  const books = search
    ? await searchBooks(search)
    : await getLatestBooks();

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8FBFD]">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Books
          </h1>

          <p className="text-gray-600 mb-10">
            {search
              ? `Search results for "${search}"`
              : "Browse our collection"}
          </p>

          {books.length === 0 && (
            <div className="bg-white rounded-xl border p-8 text-center">

              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No Books Found
              </h2>

              <p className="text-gray-600">
                Try a different search term.
              </p>

            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {books.map((book: any) => (

              <Link
                key={book.id}
                href={`/books/${book.slug}`}
                className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition"
              >

                {book.image ? (
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={400}
                    height={500}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="h-64 bg-gray-100 flex items-center justify-center">
                    No Cover
                  </div>
                )}

                <div className="p-4">

                  <h2 className="font-semibold text-gray-900">
                    {book.title}
                  </h2>

                  <p className="text-sm text-gray-600">
                    {book.author}
                  </p>

                  <p className="mt-2 font-bold text-[#447F98]">
                    ₹{book.price}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}