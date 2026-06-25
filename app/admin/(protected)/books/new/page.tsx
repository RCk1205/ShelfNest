import { prisma } from "@/lib/prisma";
import BookForm from "@/components/books/BookForm";

export default async function NewBookPage() {
  const categories =
    await prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });

  return (
    <div>
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          New Book
        </h1>

        <p className="text-gray-700 mb-8">
          Add a new book to inventory
        </p>

        <BookForm
          categories={categories}
        />

      </div>
    </div>
  );
}