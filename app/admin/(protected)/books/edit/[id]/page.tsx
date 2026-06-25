import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getBookById } from "@/lib/actions/book";
import EditBookForm from "@/components/books/EditBookForm";

export default async function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

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
          Edit Book
        </h1>

        <p className="text-gray-700 mb-8">
          Update book information
        </p>

        <EditBookForm
          book={book}
          categories={categories}
        />

      </div>
    </div>
  );
}