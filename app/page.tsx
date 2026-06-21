import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";

import {
  getFeaturedBooks,
  getLatestBooks,
  getBestSellerBooks,
} from "@/lib/actions/public";

export default async function Home() {
  const featuredBooks =
    await getFeaturedBooks();

  const bestSellerBooks =
    await getBestSellerBooks();

  const latestBooks =
    await getLatestBooks();

  return (
    <div className="min-h-screen bg-[#F8FBFD]">

      <Navbar />

      <Hero />

      <FeaturedBooks
        title="Featured Books"
        books={featuredBooks}
      />

      <FeaturedBooks
        title="Best Sellers"
        books={bestSellerBooks}
      />

      <FeaturedBooks
        title="Latest Arrivals"
        books={latestBooks}
      />

      <Footer />

    </div>
  );
}