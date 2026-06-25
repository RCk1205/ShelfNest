"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { addReview } from "@/lib/actions/review";

export default function ReviewForm({
  bookId,
}: {
  bookId: string;
}) {
  const { data: session } =
    useSession();

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

    const [isSubmitting, setIsSubmitting] =
  useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();e.preventDefault();

if (isSubmitting) {
  return;
}

setIsSubmitting(true);

 if (!session?.user) {

  toast.error(
    "Please login first."
  );

  setIsSubmitting(false);

  return;
}

  try {

  await addReview(
    (session.user as any).id,
    bookId,
    rating,
    comment
  );

  toast.success(
    "Review submitted successfully."
  );

  setComment("");
  setRating(5);

} catch {

  toast.error(
    "Unable to submit review."
  );

} finally {

  setIsSubmitting(false);

}
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-xl p-6 mt-10"
    >
      <h3 className="text-xl font-semibold mb-4">
        Write Review
      </h3>

      <select
        value={rating}
        onChange={(e) =>
          setRating(
            Number(e.target.value)
          )
        }
        className="w-full border rounded-lg p-3 mb-4"
      >
        <option value={5}>5 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={2}>2 Stars</option>
        <option value={1}>1 Star</option>
      </select>

      <textarea
        rows={4}
        value={comment}
        onChange={(e) =>
          setComment(
            e.target.value
          )
        }
        placeholder="Write your review..."
        className="w-full border rounded-lg p-3 mb-4"
      />

      <button
  type="submit"
  disabled={isSubmitting}
  className="px-5 py-3 rounded-lg bg-[#447F98] text-white disabled:opacity-60 disabled:cursor-not-allowed"
>
  {isSubmitting
    ? "Submitting..."
    : "Submit Review"}
</button>
    </form>
  );
}