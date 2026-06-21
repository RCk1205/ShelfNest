"use client";

import { CldUploadWidget } from "next-cloudinary";

export default function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  return (
    <div className="space-y-4">

      <CldUploadWidget
        uploadPreset={
          process.env
            .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        }
        onSuccess={(result: any) => {
          onChange(
            result.info.secure_url
          );
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="px-4 py-2 rounded-lg bg-[#447F98] hover:bg-[#2F657C] text-white"
          >
            Upload Cover Image
          </button>
        )}
      </CldUploadWidget>

      {value && (
        <img
          src={value}
          alt="Book Cover"
          className="w-40 rounded-lg border"
        />
      )}

    </div>
  );
}