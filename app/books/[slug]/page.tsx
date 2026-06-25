import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/cart/AddToCartButton";

import Image from "next/image";
import WishlistButton from "@/components/wishlist/WishlistButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReviewForm from "@/components/reviews/ReviewForm";



import {
getBookBySlug,
getRelatedBooks,
} from "@/lib/actions/public";
import {
  getBookReviews,
  getAverageRating,
} from "@/lib/actions/review";



export default async function BookDetailsPage({
params,
}: {
params: Promise<{
slug: string;
}>;
}) {
const { slug } = await params;

const book =
await getBookBySlug(slug);

if (!book) {
notFound();
}

const relatedBooks =

await getRelatedBooks(
book.categoryId,
book.id
);

const reviews =
  await getBookReviews(
    book.id
  );

const averageRating =
  await getAverageRating(
    book.id
  );
return (
<> <Navbar />

```
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

<div className="mb-4">

  <span className="ml-2 text-yellow-600">

  {reviews.length > 0
    ? `⭐ ${Number(
        averageRating
      ).toFixed(1)} / 5`
    : "No ratings"}

</span>

<span className="ml-2 text-gray-500">
  ({reviews.length} reviews)
</span>

</div>

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

          <p className="text-gray-700 leading-7 mb-6">
            {book.description}
          </p>

          <div className="mb-6">

            {book.stock <= 0 ? (
              <p className="font-semibold text-red-600">
                Out Of Stock
              </p>
            ) : book.stock <= 5 ? (
              <p className="font-semibold text-orange-600">
                Only {book.stock} left in stock
              </p>
            ) : (
              <p className="font-semibold text-green-600">
                In Stock
              </p>
            )}

          </div>

          <div className="flex gap-4">

  <AddToCartButton book={book} />

  <WishlistButton
    bookId={book.id}
  />

</div>

        </div>

      </div>

      {relatedBooks.length > 0 && (

        <div className="mt-16">

          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Books
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {relatedBooks.map((related) => (

              <Link
                key={related.id}
                href={`/books/${related.slug}`}
                className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition"
              >

                {related.image ? (
                  <Image
                    src={related.image}
                    alt={related.title}
                    width={300}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="h-64 bg-gray-100 flex items-center justify-center">
                    No Cover
                  </div>
                )}

                <div className="p-4">

                  <h3 className="font-semibold text-gray-900">
                    {related.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    {related.author}
                  </p>

                  <p className="text-[#447F98] font-bold mt-3">
                    ₹{related.price}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </div>

      )}

    </div>

  </div>
<div className="max-w-6xl mx-auto px-6 pb-12">

  <ReviewForm
    bookId={book.id}
  />

  <div className="bg-white border rounded-xl p-6 mt-6">

    <h2 className="text-2xl font-bold mb-6">
      Customer Reviews
    </h2>

    {reviews.length === 0 ? (

      <p className="text-gray-500">
        No reviews yet
      </p>

    ) : (

      <div className="space-y-6">

        {reviews.map(
          (review) => (
            <div
              key={review.id}
              className="border-b pb-4"
            >
              <p className="font-semibold">
                {review.user.name}
              </p>

              <p className="text-yellow-600">
                {"⭐".repeat(
                  review.rating
                )}
              </p>

              <p className="mt-2 text-gray-700">
                {review.comment}
              </p>
            </div>
          )
        )}

      </div>

    )}

  </div>

</div>
  <Footer />
</>

);
}
