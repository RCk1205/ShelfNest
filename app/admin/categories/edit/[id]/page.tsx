import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/actions/category";
import EditCategoryForm from "@/components/categories/EditCategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#D6EBF3] p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Edit Category
        </h1>

        <p className="text-gray-700 mb-8">
          Update category information
        </p>

        <EditCategoryForm
          id={category.id}
          name={category.name}
          slug={category.slug}
          description={category.description}
          isActive={category.isActive}
        />

      </div>
    </main>
  );
}