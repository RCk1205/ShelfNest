import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { authOptions } from "@/lib/auth";
import { getWishlist } from "@/lib/actions/wishlist";

export default async function WishlistPage() {
  const session =
    await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const wishlist =
    await getWishlist(
      (session.user as any).id
    );

  return (
    <div className="min-h-screen bg-[#F8FBFD]">

      <div className="max-w-6xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (

          <div className="bg-white border rounded-xl p-8 text-center">
            No books in wishlist
          </div>

        ) : (

          <div className="grid md:grid-cols-4 gap-6">

            {wishlist.map((item) => (

              <Link
                key={item.id}
                href={`/books/${item.book.slug}`}
                className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition"
              >

                {item.book.image ? (

                  <Image
                    src={item.book.image}
                    alt={item.book.title}
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
                    {item.book.title}
                  </h3>

                  <p className="text-sm text-gray-600 mt-1">
                    {item.book.author}
                  </p>

                  <p className="text-[#447F98] font-bold mt-3">
                    ₹{item.book.price}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}