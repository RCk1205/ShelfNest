import { notFound } from "next/navigation";
import PaymentStatusForm from "@/components/orders/PaymentStatusForm";
import {
  getOrderById,
} from "@/lib/actions/order";

import OrderStatusForm from "@/components/orders/OrderStatusForm"

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  const order =
    await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Details
        </h1>

        <p className="text-gray-600 mb-8">
          {order.orderNumber}
        </p>

        <div className="bg-white border rounded-xl p-6 mb-6">
<div className="bg-white border rounded-xl p-6 mb-6">

  <h2 className="text-xl font-bold mb-4">
    Payment Status
  </h2>

  <div className="mb-4">

    <span className="font-medium">
      Current Status:
    </span>

    <span
      className={`ml-3 px-3 py-1 rounded-full text-sm font-medium
      ${
        order.paymentStatus === "PAID"
          ? "bg-green-100 text-green-800"
          : order.paymentStatus === "FAILED"
          ? "bg-red-100 text-red-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {order.paymentStatus}
    </span>

  </div>

  <PaymentStatusForm
    orderId={order.id}
    currentStatus={
      order.paymentStatus
    }
  />

</div>
          <h2 className="text-xl font-bold mb-4">
            Customer Information
          </h2>

          <div className="space-y-2">

            <p>
              <strong>Name:</strong>{" "}
              {order.customerName}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.customerEmail}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.customerPhone}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.address}
            </p>
     <p>
  <strong>Payment Method:</strong>{" "}
  {order.paymentMethod}
</p>

<p>
  <strong>Payment Status:</strong>{" "}
  <span
    className={`px-2 py-1 rounded text-sm font-medium
    ${
      order.paymentStatus === "PAID"
        ? "bg-green-100 text-green-800"
        : order.paymentStatus === "FAILED"
        ? "bg-red-100 text-red-800"
        : "bg-yellow-100 text-yellow-800"
    }`}
  >
    {order.paymentStatus}
  </span>
</p>

          </div>
          <div className="bg-white border rounded-xl p-6 mb-6">

  <h2 className="text-xl font-bold mb-4">
    Payment Information
  </h2>

  <div className="space-y-2">

    <p>
      <strong>Method:</strong>{" "}
      {order.paymentMethod}
    </p>

    <p>
      <strong>Status:</strong>{" "}
      {order.paymentStatus}
    </p>

  </div>

</div>

        </div>

        <div className="bg-white border rounded-xl p-6 mb-6">

          <h2 className="text-xl font-bold mb-4">
            Ordered Books
          </h2>

          <div className="space-y-4">

            {order.items.map(
              (item: any) => (
                <div
                  key={item.id}
                  className="border-b pb-3"
                >
                  <p className="font-semibold">
                    {item.book?.title}
                  </p>

                  <p>
                    Quantity:
                    {" "}
                    {item.quantity}
                  </p>

                  <p>
                    Price:
                    {" "}
                    ₹{item.price}
                  </p>
                </div>
              )
            )}

          </div>

        </div>
<div className="mt-6 border-t pt-6">

  <h2 className="text-xl font-bold mb-4">
    Payment Status
  </h2>

  <PaymentStatusForm
    orderId={order.id}
    currentStatus={
      order.paymentStatus
    }
  />

</div>
        <div className="bg-white border rounded-xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Order Status
          </h2>

         <div className="mb-4">

  <span className="font-medium">
    Current Status:
  </span>

  <span
    className={`ml-3 px-3 py-1 rounded-full text-sm font-medium
    ${
      order.orderStatus === "PENDING"
        ? "bg-yellow-100 text-yellow-800"
        : order.orderStatus === "PROCESSING"
        ? "bg-blue-100 text-blue-800"
        : order.orderStatus === "SHIPPED"
        ? "bg-purple-100 text-purple-800"
        : order.orderStatus === "DELIVERED"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }`}
  >
    {order.orderStatus}
  </span>

</div>

          <OrderStatusForm
            orderId={order.id}
            currentStatus={
              order.orderStatus
            }
          />

        </div>

      </div>
    </div>
  );
}