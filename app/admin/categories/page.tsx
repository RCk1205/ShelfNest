import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getCategories } from "@/lib/actions/category";

export default async function CategoriesPage() {
    const session = await getServerSession(authOptions);

if (!session) {
  redirect("/admin/login");
}
  const categories = await getCategories();

  return (
    <div>
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
  <div>
    <h1 className="text-3xl font-bold">
      Categories
    </h1>

    <p className="text-gray-500 mt-1">
      Manage bookstore categories
    </p>
  </div>

  <a
    href="/admin/categories/new"
    className="px-4 py-2 rounded-lg text-white bg-[#447F98] hover:bg-[#2F657C] hover:bg-[#447F98]"
  >
    Add Category
  </a>
</div>

        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead>
             <tr className="border-b bg-[#EAF4F8]">
  <th className="text-left p-4 text-gray-900 font-semibold">
    Name
  </th>

  <th className="text-left p-4 text-gray-900 font-semibold">
    Slug
  </th>

  <th className="text-left p-4 text-gray-900 font-semibold">
    Status
  </th>

  <th className="text-left p-4 text-gray-900 font-semibold">
    Actions
  </th>
</tr>
            </thead>

            <tbody>
              {categories.map((category: any) => (
                <tr
                  key={category.id}
                  className="border-b"
                >
                  <td className="p-4 text-gray-800">
                    {category.name}
                  </td>

                  <td className="p-4 text-gray-800">
                    {category.slug}
                  </td>

                 <td className="p-4 text-gray-800">
  {category.isActive
    ? "Active"
    : "Inactive"}
</td>

<td className="p-4">
  <div className="flex gap-2">

   <a
  href={`/admin/categories/edit/${category.id}`}
  className="px-3 py-1 rounded bg-[#447F98] hover:bg-[#2F657C] text-white"
>
  Edit
</a>

    <button
      className="px-3 py-1 rounded bg-red-500 text-white"
    >
      Delete
    </button>

  </div>
</td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-gray-700"
                  >
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}