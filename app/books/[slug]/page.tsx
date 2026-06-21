import AddToCartButton from "@/components/cart/AddToCartButton";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  getBookBySlug,
} from "@/lib/actions/public";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } =
    await params;

  const book =
    await getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F8FBFD]">

      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-2 gap-10">

          <div>

            {book.image ? (
              <Image
                src={book.image}
                alt={book.title}
                width={600}
                height={800}
                className="rounded-xl border w-full"
              />
            ) : (
              <div className="h-[600px] bg-gray-100 rounded-xl flex items-center justify-center">
                No Cover
              </div>
            )}

          </div>

          <div>

            <p className="text-sm text-[#447F98] mb-2">
              {book.category?.name}
            </p>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {book.title}
            </h1>

            <p className="text-lg text-gray-600 mb-4">
              By {book.author}
            </p>

            <div className="flex gap-3 items-center mb-6">

              <span className="text-3xl font-bold text-[#447F98]">
                ₹{book.price}
              </span>

              {book.mrp > book.price && (
                <span className="line-through text-gray-500">
                  ₹{book.mrp}
                </span>
              )}

            </div>

            <p className="text-gray-700 leading-7 mb-8">
              {book.description}
            </p>

            <AddToCartButton book={book} />

          </div>

        </div>

      </div>

    </div>
  );
}