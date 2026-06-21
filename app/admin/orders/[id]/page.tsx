import { notFound } from "next/navigation";

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

        <div className="bg-white border rounded-xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Order Status
          </h2>

          <p className="mb-4">
            Current:
            {" "}
            {order.orderStatus}
          </p>

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