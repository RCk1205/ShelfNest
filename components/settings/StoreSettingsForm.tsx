"use client";

import { useState } from "react";
import { saveStoreSettings } from "@/lib/actions/store";
import ImageUpload from "@/components/ImageUpload";

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

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    await saveStoreSettings({
      storeName,
      email,
      phone,
      address,
      logo,
      bannerImage,
    });

    alert("Settings Saved");
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

      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-[#447F98] hover:bg-[#2F657C] text-white"
      >
        Save Settings
      </button>
    </form>
  );
}