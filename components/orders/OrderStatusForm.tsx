"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/lib/actions/order";

export default function OrderStatusForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] =
    useState(currentStatus);

  async function handleUpdate() {
    await updateOrderStatus(
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

        <option value="PROCESSING">
          PROCESSING
        </option>

        <option value="SHIPPED">
          SHIPPED
        </option>

        <option value="DELIVERED">
          DELIVERED
        </option>

        <option value="CANCELLED">
          CANCELLED
        </option>
      </select>

      <button
        onClick={handleUpdate}
        className="px-4 py-2 rounded-lg bg-[#447F98] text-white"
      >
        Update
      </button>

    </div>
  );
}