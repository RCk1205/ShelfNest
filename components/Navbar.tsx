import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          href="/"
          className="text-2xl font-bold text-[#447F98]"
        >
          ShelfNest
        </Link>

       <nav className="flex gap-6 text-gray-700">
  <Link href="/">Home</Link>
  <Link href="/books">Books</Link>
  <Link href="/cart">
  Cart
</Link>
</nav>

      </div>
    </header>
  );
}