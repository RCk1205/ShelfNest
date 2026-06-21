import Image from "next/image";

export default function FeaturedBooks({
  title,
  books,
}: {
  title: string;
  books: any[];
}) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {books.map((book) => (

            <div
              key={book.id}
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
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500">
                  No Cover
                </div>
              )}

              <div className="p-4">

                <h3 className="font-semibold text-gray-900 mb-2">
                  {book.title}
                </h3>

                <p className="text-sm text-gray-600 mb-2">
                  {book.author}
                </p>

                <div className="flex items-center gap-2">

                  <span className="font-bold text-[#447F98]">
                    ₹{book.price}
                  </span>

                  {book.mrp > book.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{book.mrp}
                    </span>
                  )}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}