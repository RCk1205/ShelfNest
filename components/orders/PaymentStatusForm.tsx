"use client";

import { useState } from "react";
import { updatePaymentStatus } from "@/lib/actions/order";

export default function PaymentStatusForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] =
    useState(currentStatus);

  async function handleUpdate() {
    await updatePaymentStatus(
      orderId,
      status as any
    );

    window.location.reload();
  }

  return (
    <div className="flex gap-3">

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="border rounded-lg px-3 py-2"
      >
        <option value="PENDING">
          PENDING
        </option>

        <option value="PAID">
          PAID
        </option>

        <option value="FAILED">
          FAILED
        </option>
      </select>

      <button
        onClick={handleUpdate}
        className="px-4 py-2 rounded-lg bg-green-600 text-white"
      >
        Update
      </button>

    </div>
  );
}