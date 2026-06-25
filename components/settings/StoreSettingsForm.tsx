"use client";

import { useState } from "react";
import { saveStoreSettings } from "@/lib/actions/store";
import ImageUpload from "@/components/ImageUpload";
import { toast } from "sonner";

export default function StoreSettingsForm({
  settings,
}: {
  settings: any;
}) {
  const [storeName, setStoreName] =
    useState(settings?.storeName || "");

  const [email, setEmail] =
    useState(settings?.email || "");

  const [phone, setPhone] =
    useState(settings?.phone || "");

  const [address, setAddress] =
    useState(settings?.address || "");

  const [logo, setLogo] =
    useState(settings?.logo || "");

  const [bannerImage, setBannerImage] =
    useState(settings?.bannerImage || "");
    const [enableCOD, setEnableCOD] =
  useState(settings?.enableCOD ?? true);

const [enableUPI, setEnableUPI] =
  useState(settings?.enableUPI ?? false);

const [enableCard, setEnableCard] =
  useState(settings?.enableCard ?? false);

const [enableNetBanking, setEnableNetBanking] =
  useState(settings?.enableNetBanking ?? false);

const [razorpayEnabled, setRazorpayEnabled] =
  useState(settings?.razorpayEnabled ?? false);

const [isSubmitting, setIsSubmitting] =
  useState(false);

  

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

if (isSubmitting) {
  return;
}

setIsSubmitting(true);
if (
  !enableCOD &&
  !enableUPI &&
  !enableCard &&
  !enableNetBanking
) {

  toast.error(
    "At least one payment method must be enabled."
  );

  setIsSubmitting(false);

  return;
}

  try {

  await saveStoreSettings({
    storeName,
    email,
    phone,
    address,
    logo,
    bannerImage,

    enableCOD,
    enableUPI,
    enableCard,
    enableNetBanking,
    razorpayEnabled,
  });

  toast.success(
    "Settings saved successfully."
  );

} catch {

  toast.error(
    "Unable to save settings."
  );

} finally {

  setIsSubmitting(false);

}
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border p-6 space-y-6"
    >
      <input
        placeholder="Store Name"
        value={storeName}
        onChange={(e) =>
          setStoreName(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <textarea
        rows={4}
        placeholder="Address"
        value={address}
        onChange={(e) =>
          setAddress(e.target.value)
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
      />

      <div>
        <label className="block mb-2 font-medium text-gray-900">
          Store Logo
        </label>

        <ImageUpload
          value={logo}
          onChange={setLogo}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-900">
          Banner Image
        </label>

        <ImageUpload
          value={bannerImage}
          onChange={setBannerImage}
        />
      </div>
<div className="border-t pt-6">

  <h2 className="text-xl font-semibold mb-4">
    Payment Settings
  </h2>

  <div className="space-y-4">

    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={enableCOD}
        onChange={(e) =>
          setEnableCOD(e.target.checked)
        }
      />
      Cash On Delivery
    </label>

    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={enableUPI}
        onChange={(e) =>
          setEnableUPI(e.target.checked)
        }
      />
      UPI
    </label>

    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={enableCard}
        onChange={(e) =>
          setEnableCard(e.target.checked)
        }
      />
      Credit / Debit Card
    </label>

    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={enableNetBanking}
        onChange={(e) =>
          setEnableNetBanking(
            e.target.checked
          )
        }
      />
      Net Banking
    </label>

    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={razorpayEnabled}
        onChange={(e) =>
          setRazorpayEnabled(
            e.target.checked
          )
        }
      />
      Razorpay Enabled
    </label>

  </div>

</div>
      <button
  type="submit"
  disabled={isSubmitting}
  className="px-6 py-3 rounded-lg bg-[#447F98] hover:bg-[#2F657C] text-white disabled:opacity-60 disabled:cursor-not-allowed"
>
  {isSubmitting
    ? "Saving..."
    : "Save Settings"}
</button>
    </form>
  );
}