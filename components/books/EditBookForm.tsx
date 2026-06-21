"use client";

import { useState } from "react";
import { updateBook } from "@/lib/actions/book";
import ImageUpload from "@/components/ImageUpload";

export default function EditBookForm({
  book,
  categories,
}: {
  book: any;
  categories: any[];
}) {
  const [title, setTitle] = useState(book.title);
  const [slug, setSlug] = useState(book.slug);
  const [author, setAuthor] = useState(book.author);
  const [language, setLanguage] = useState(book.language || "");
  const [isbn, setIsbn] = useState(book.isbn || "");
  const [description, setDescription] = useState(book.description);

  const [mrp, setMrp] = useState(String(book.mrp));
  const [price, setPrice] = useState(String(book.price));
  const [stock, setStock] = useState(String(book.stock));

  const [image, setImage] = useState(book.image || "");

  const [categoryId, setCategoryId] = useState(book.categoryId);

  const [featured, setFeatured] = useState(book.featured);
  const [bestseller, setBestseller] = useState(book.bestseller);
  const [isActive, setIsActive] = useState(book.isActive);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    await updateBook(book.id, {
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

    window.location.href = "/admin/books";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border p-6 space-y-6"
    >
      <input
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
        value={author}
        onChange={(e) =>
          setAuthor(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <input
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <input
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
        {categories.map((c: any) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={mrp}
        onChange={(e) =>
          setMrp(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <input
        type="number"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <input
        type="number"
        value={stock}
        onChange={(e) =>
          setStock(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <textarea
        rows={5}
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
        Update Book
      </button>

    </form>
  );
}