"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createCoupon } from "@/lib/actions/coupon";

export default function NewCouponPage() {
  const router = useRouter();

  const [code, setCode] = useState("");
const [discount, setDiscount] = useState(10);

const [isSubmitting, setIsSubmitting] =
  useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

if (isSubmitting) {
  return;
}

setIsSubmitting(true);

 if (!code.trim()) {

  toast.error(
    "Please enter a coupon code."
  );

  setIsSubmitting(false);

  return;
}

 if (discount < 1 || discount > 100) {

  toast.error(
    "Discount must be between 1 and 100."
  );

  setIsSubmitting(false);

  return;
}

   try {

  await createCoupon(
    code,
    discount
  );

  toast.success(
    "Coupon created successfully."
  );

  router.push("/admin/coupons");

} catch {

  toast.error(
    "Unable to create coupon."
  );

} finally {

  setIsSubmitting(false);

}
  }

  return (
    <div className="max-w-xl">

      <h1 className="text-3xl font-bold mb-8">
        Create Coupon
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border p-6 space-y-5"
      >

        <div>

          <label className="block mb-2 font-medium">
            Coupon Code
          </label>

          <input
            value={code}
            onChange={(e) =>
              setCode(e.target.value.toUpperCase())
            }
            placeholder="WELCOME10"
            className="w-full border rounded-lg px-4 py-3"
            required
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Discount (%)
          </label>

          <input
            type="number"
            value={discount}
            onChange={(e) =>
              setDiscount(Number(e.target.value))
            }
            min={1}
            max={100}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

        </div>

        <button
  type="submit"
  disabled={isSubmitting}
  className="px-6 py-3 rounded-lg bg-[#447F98] text-white hover:bg-[#2F657C] disabled:opacity-60 disabled:cursor-not-allowed"
>
  {isSubmitting
    ? "Creating..."
    : "Create Coupon"}
</button>

      </form>

    </div>
  );
}