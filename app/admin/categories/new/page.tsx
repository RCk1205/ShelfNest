import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import CategoryForm from "@/components/categories/CategoryForm";

export default async function NewCategoryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#D6EBF3] p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          New Category
        </h1>

        <p className="text-gray-700 mb-8">
          Create a new bookstore category
        </p>

        <CategoryForm />
      </div>
    </main>
  );
}