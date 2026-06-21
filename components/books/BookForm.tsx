"use client";

import { useState } from "react";
import { createBook } from "@/lib/actions/book";
import ImageUpload from "@/components/ImageUpload";

export default function BookForm({
  categories,
}: {
  categories: any[];
}) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] =
    useState("");

  const [mrp, setMrp] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [image, setImage] = useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [bestseller, setBestseller] =
    useState(false);

  const [isActive, setIsActive] =
    useState(true);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    await createBook({
      title,
      slug,
      author,
      language,
      isbn,
      description,
      mrp: Number(mrp),
      price: Number(price),
      stock: Number(stock),
      image,
      categoryId,
      featured,
      bestseller,
      isActive,
    });

    window.location.href =
      "/admin/books";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border p-6 space-y-6"
    >
      <input
        placeholder="Book Title"
        value={title}
        onChange={(e) => {
          const value = e.target.value;

          setTitle(value);

          setSlug(
            value
              .toLowerCase()
              .replace(/\s+/g, "-")
          );
        }}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <input
        value={slug}
        readOnly
        className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 text-gray-900"
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) =>
          setAuthor(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <input
        placeholder="Language"
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <input
        placeholder="ISBN"
        value={isbn}
        onChange={(e) =>
          setIsbn(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <select
        value={categoryId}
        onChange={(e) =>
          setCategoryId(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      >
        <option value="">
          Select Category
        </option>

        {categories.map((c: any) => (
          <option
            key={c.id}
            value={c.id}
          >
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="MRP"
        value={mrp}
        onChange={(e) =>
          setMrp(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <input
        type="number"
        placeholder="Selling Price"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) =>
          setStock(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <textarea
        rows={5}
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <div>
        <label className="block mb-2 font-medium text-gray-900">
          Book Cover
        </label>

        <ImageUpload
          value={image}
          onChange={setImage}
        />
      </div>

      <div className="space-y-3">

        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(e.target.checked)
            }
          />
          Featured
        </label>

        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={(e) =>
              setBestseller(e.target.checked)
            }
          />
          Best Seller
        </label>

        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) =>
              setIsActive(e.target.checked)
            }
          />
          Active
        </label>

      </div>

      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-[#447F98] hover:bg-[#2F657C] text-white"
      >
        Create Book
      </button>

    </form>
  );
}