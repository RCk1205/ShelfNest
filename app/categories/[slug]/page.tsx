import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getCategoryBySlug,
} from "@/lib/actions/public";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } =
    await params;

  const category =
    await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F8FBFD]">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {category.name}
        </h1>

        <p className="text-gray-600 mb-10">
          {category.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {category.books.map((book: any) => (

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
  );
}