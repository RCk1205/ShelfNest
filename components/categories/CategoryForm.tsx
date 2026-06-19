"use client";

import { useState } from "react";
import { createCategory } from "@/lib/actions/category";
import { useRouter } from "next/navigation";

export default function CategoryForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createCategory({
        name,
        slug,
        description,
        isActive,
      });

      router.push("/admin/categories");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border p-6 space-y-6"
    >
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-800">
          Category Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
          placeholder="Fiction"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-800">
          Slug
        </label>

        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
          placeholder="fiction"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-800">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
          placeholder="Books belonging to the fiction category"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) =>
            setIsActive(e.target.checked)
          }
        />

        <label className="text-gray-800 font-medium">
  Active Category
</label>
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 rounded-lg text-white bg-[#629BB6] hover:bg-[#447F98]"
      >
        {loading ? "Saving..." : "Create Category"}
      </button>
    </form>
  );
}