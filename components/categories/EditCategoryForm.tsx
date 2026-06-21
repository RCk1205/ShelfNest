"use client";

import { useState } from "react";
import { updateCategory } from "@/lib/actions/category";

type Props = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
};

export default function EditCategoryForm({
  id,
  name: initialName,
  slug: initialSlug,
  description: initialDescription,
  isActive: initialActive,
}: Props) {
  const [name, setName] = useState(initialName);
  const [slug, setSlug] = useState(initialSlug);
  const [description, setDescription] = useState(
    initialDescription || ""
  );
  const [isActive, setIsActive] = useState(initialActive);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await updateCategory(id, {
        name,
        slug,
        description,
        isActive,
      });

      window.location.href = "/admin/categories";
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
          onChange={(e) => {
            const value = e.target.value;

            setName(value);

            setSlug(
              value
                .toLowerCase()
                .replace(/\s+/g, "-")
            );
          }}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-800">
          Slug
        </label>

        <input
          type="text"
          value={slug}
          readOnly
          className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-800">
          Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
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
        className="px-6 py-3 rounded-lg bg-[#447F98] hover:bg-[#2F657C] text-white"
      >
        {loading
          ? "Updating..."
          : "Update Category"}
      </button>
    </form>
  );
}