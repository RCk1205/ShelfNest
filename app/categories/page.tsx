import Link from "next/link";

import {
  getPublicCategories,
} from "@/lib/actions/public";

export default async function CategoriesPage() {
  const categories =
    await getPublicCategories();

  return (
    <div className="min-h-screen bg-[#F8FBFD]">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Categories
        </h1>

        <p className="text-gray-600 mb-10">
          Browse books by category
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {categories.map((category: any) => (

            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="bg-white rounded-xl border p-6 hover:shadow-lg transition"
            >

              <h2 className="text-xl font-semibold text-gray-900">
                {category.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {category.description}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}