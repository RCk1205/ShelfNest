"use client";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useCart } from "@/components/cart/CartContext";
import { createOrder } from "@/lib/actions/order";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } =
  useSession();

  useEffect(() => {
  if (session?.user) {
    setCustomerName(
      session.user.name || ""
    );

    setCustomerEmail(
      session.user.email || ""
    );
  }
}, [session]);

  const { cart, clearCart } = useCart();

  const [customerName, setCustomerName] =
  useState(
    session?.user?.name || ""
  );

const [customerEmail, setCustomerEmail] =
  useState(
    session?.user?.email || ""
  );
  const [settings, setSettings] =
  useState<any>(null);

  const [customerPhone, setCustomerPhone] =
    useState("");

  const [address, setAddress] =
    useState("");
   const [paymentMethod, setPaymentMethod] =
  useState<
    "COD" | "UPI" | "CARD" | "NET_BANKING"
  >("COD");
  const [couponCode, setCouponCode] =
  useState("");

const [discount, setDiscount] =
  useState(0);

  const [isSubmitting, setIsSubmitting] =
  useState(false);

const cartTotal = cart.reduce(
  (
    sum: number,
    item: any
  ) =>
    sum +
    item.price *
      item.quantity,
  0
);

const finalTotal = Math.round(
  cartTotal *
    (100 - discount) /
    100
);
async function loadRazorpay() {
  return new Promise<boolean>(
    (resolve) => {

      if (
        document.getElementById(
          "razorpay-script"
        )
      ) {
        resolve(true);
        return;
      }

      const script =
        document.createElement("script");

      script.id =
        "razorpay-script";

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () =>
        resolve(true);

      script.onerror = () =>
        resolve(false);

      document.body.appendChild(
        script
      );
    }
  );
}
useEffect(() => {
  async function loadSettings() {
    const res = await fetch(
      "/api/payment-settings"
    );

    const data =
      await res.json();

    setSettings(data);

    if (data?.enableCOD) {
      setPaymentMethod("COD");
    } else if (
      data?.enableUPI
    ) {
      setPaymentMethod("UPI");
    } else if (
      data?.enableCard
    ) {
      setPaymentMethod("CARD");
    } else if (
      data?.enableNetBanking
    ) {
      setPaymentMethod(
        "NET_BANKING"
      );
    }
  }

  loadSettings();
}, []); 

useEffect(() => {
  if (cart.length === 0) {
    router.push("/cart");
  }
}, [cart, router]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
   e.preventDefault();

if (isSubmitting) {
  return;
}

setIsSubmitting(true);

if (!settings) {
  toast.error(
  "Unable to load payment settings. Please refresh."
);

setIsSubmitting(false);

return;
}
const name =
  customerName.trim();

const email =
  customerEmail.trim();

const phone =
  customerPhone.trim();

const fullAddress =
  address.trim();

if (name.length < 3) {

  toast.error(
    "Please enter a valid name."
  );

  setIsSubmitting(false);

  return;
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {

  toast.error(
    "Please enter a valid email address."
  );

  setIsSubmitting(false);

  return;
}

if (!/^\d{10}$/.test(phone)) {

  toast.error(
    "Please enter a valid 10-digit phone number."
  );

  setIsSubmitting(false);

  return;
}

if (fullAddress.length < 10) {

  toast.error(
    "Please enter a complete address."
  );

  setIsSubmitting(false);

  return;
}

if (!/^\d{10}$/.test(customerPhone)) {

  toast.error(
    "Please enter a valid 10-digit phone number."
  );

  setIsSubmitting(false);

  return;
}

if (address.length < 10) {

  toast.error(
    "Please enter a complete address."
  );

  setIsSubmitting(false);

  return;
}

const validMethods = [
  settings.enableCOD && "COD",
  settings.enableUPI && "UPI",
  settings.enableCard && "CARD",
  settings.enableNetBanking &&
    "NET_BANKING",
].filter(Boolean);

console.log(
  "SESSION USER ID:",
  (session?.user as any)?.id
);
console.log("SESSION:", session);
// proceed to payment flow
if (
  paymentMethod !== "COD"
) {

const loaded =
  await loadRazorpay();

if (!loaded) {
  toast.error(
    "Failed to load Razorpay."
  );
  setIsSubmitting(false);
  return;
}

  const response =
    await fetch(
      "/api/razorpay/order",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          amount:
            finalTotal,
        }),
      }
    );

const razorpayOrder =
  await response.json();

if (!response.ok) {
  toast.error(
    razorpayOrder.error ||
    "Unable to create Razorpay order."
  );

  return;
}

  const options = {
   key:
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,

    amount:
      razorpayOrder.amount,

    currency: "INR",

    name: "ShelfNest",

    description:
      "Book Purchase",

    order_id:
      razorpayOrder.id,

    prefill: {
      name:
        customerName,

      email:
        customerEmail,

      contact:
        customerPhone,
    },

handler:
async function (
  response: any
) {

  const verify =
    await fetch(
      "/api/razorpay/verify",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({

          razorpay_order_id:
            response.razorpay_order_id,

          razorpay_payment_id:
            response.razorpay_payment_id,

          razorpay_signature:
            response.razorpay_signature,

          customerName,
          customerEmail,
          customerPhone,
          address,

          userId:
            session?.user
              ? (session.user as any).id
              : undefined,

          paymentMethod,

          discount,

          items:
            cart.map(
              (item: any) => ({
                bookId:
                  item.id,
                quantity:
                  item.quantity,
                price:
                  item.price,
              })
            ),
        }),
      }
    );

  const result =
  await verify.json();

if (!verify.ok) {

  toast.error(
    result.error ||
    "Payment verification failed."
  );
setIsSubmitting(false);
  return;
}

  clearCart();

setIsSubmitting(false);

router.push(
  `/order-success?id=${result.orderId}`
);
}
  };

  const razorpay =
    new (
      window as any
    ).Razorpay(options);

  razorpay.open();
setIsSubmitting(false);
  return;
}

const order =
  await createOrder({
    customerName,
    customerEmail,
    customerPhone,
    address,

    userId:
      session?.user
        ? (session.user as any).id
        : undefined,

    paymentMethod,

    paymentStatus:
      "PENDING",

    discount,

    items: cart.map(
      (item: any) => ({
        bookId: item.id,
        quantity: item.quantity,
        price: item.price,
      })
    ),
  });

clearCart();

setIsSubmitting(false);

router.push(
  `/order-success?id=${order.id}`
);
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#F8FBFD]">

        <div className="max-w-3xl mx-auto px-6 py-12">

          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Checkout
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border p-6 space-y-4"
          >

        <input
  placeholder="Full Name"
  value={customerName}
  onChange={(e) =>
    setCustomerName(
      e.target.value
    )
  }
  className="w-full border rounded-lg px-4 py-3"
  minLength={3}
  maxLength={60}
  required
/>

          placeholder="Phone"

           <textarea
  rows={5}
  placeholder="Address"
  value={address}
  onChange={(e) =>
    setAddress(
      e.target.value
    )
  }
  className="w-full border rounded-lg px-4 py-3"
  minLength={10}
  maxLength={300}
  required
/>
            <div className="border rounded-lg p-4">

  <h3 className="font-semibold mb-3">
    Coupon Code
  </h3>

  <div className="flex gap-3">

    <input
      value={couponCode}
      onChange={(e) =>
        setCouponCode(
          e.target.value
        )
      }
      placeholder="Enter coupon"
      className="flex-1 border rounded-lg px-4 py-3"
    />

    <button
      type="button"
      onClick={async () => {

        const res =
          await fetch(
            "/api/coupon",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                code:
                  couponCode,
              }),
            }
          );

        const data =
  await res.json();

if (!data.valid) {
  toast.error(
    "Invalid coupon code."
  );

  return;
}

        setDiscount(
  data.discount
);

toast.success(
  `Coupon Applied (${data.discount}% OFF)`
);
      }}
      className="px-5 py-3 rounded-lg bg-[#447F98] text-white"
    >
      Apply
    </button>

  </div>

</div>
<div className="border-t pt-4">

  <h2 className="text-lg font-semibold mb-3">
    Payment Method
  </h2>

  <div className="space-y-3">

    {settings?.enableCOD && (
      <label className="flex items-center gap-3">
        <input
          type="radio"
          name="paymentMethod"
          value="COD"
          checked={
            paymentMethod === "COD"
          }
          onChange={() =>
            setPaymentMethod("COD")
          }
        />
        Cash On Delivery
      </label>
    )}

    {settings?.enableUPI && (
      <label className="flex items-center gap-3">
        <input
          type="radio"
          name="paymentMethod"
          value="UPI"
          checked={
            paymentMethod === "UPI"
          }
          onChange={() =>
            setPaymentMethod("UPI")
          }
        />
        UPI
      </label>
    )}

    {settings?.enableCard && (
      <label className="flex items-center gap-3">
        <input
          type="radio"
          name="paymentMethod"
          value="CARD"
          checked={
            paymentMethod === "CARD"
          }
          onChange={() =>
            setPaymentMethod("CARD")
          }
        />
        Credit / Debit Card
      </label>
    )}

    {settings?.enableNetBanking && (
      <label className="flex items-center gap-3">
        <input
          type="radio"
          name="paymentMethod"
          value="NET_BANKING"
          checked={
            paymentMethod ===
            "NET_BANKING"
          }
          onChange={() =>
            setPaymentMethod(
              "NET_BANKING"
            )
          }
        />
        Net Banking
      </label>
    )}

  </div>

</div><div className="bg-gray-50 rounded-lg p-4">

  <p>
    Cart Total: ₹{cartTotal}
  </p>

  <p>
    Discount: {discount}%
  </p>

  <p className="font-bold mt-2">
    Final Total: ₹{finalTotal}
  </p>

</div>
            <button
  type="submit"
  disabled={isSubmitting}
  className="px-6 py-3 rounded-lg bg-[#447F98] hover:bg-[#2F657C] text-white disabled:opacity-60 disabled:cursor-not-allowed"
>
  {isSubmitting
    ? "Processing..."
    : "Place Order"}
</button>

          </form>

        </div>

      </div>

      <Footer />
    </>
  );
}