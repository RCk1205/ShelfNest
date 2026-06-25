import Link from "next/link";
import { getOrders } from "@/lib/actions/order";

export default async function OrdersPage() {
  const orders =
    await getOrders();

  return (
    <div>
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Orders
          </h1>

          <p className="text-gray-700">
            Manage customer orders
          </p>

        </div>

        <div className="bg-white rounded-xl border overflow-hidden">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-[#EAF4F8]">

                <th className="text-left p-4">
                  Order No
                </th>

                <th className="text-left p-4">
                  Customer
                </th>

                <th className="text-left p-4">
                  Total
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Action
                </th>
                <th className="text-left p-4">
  Payment Method
</th>

<th className="text-left p-4">
  Payment Status
</th>

              </tr>

            </thead>

            <tbody>

              {orders.map(
                (order: any) => (
                  <tr
                    key={order.id}
                    className="border-b"
                  >

                    <td className="p-4">
  <Link
    href={`/admin/orders/${order.id}`}
    className="text-[#447F98] font-medium hover:underline"
  >
    {order.orderNumber}
  </Link>
</td>

                    <td className="p-4">
                      {
                        order.customerName
                      }
                    </td>

                    <td className="p-4">
                      ₹{order.total}
                    </td>
<td className="p-4">

  <span
    className={`px-3 py-1 rounded-full text-sm font-medium
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

</td>

                    <td className="p-4">

                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="px-3 py-1 rounded bg-[#447F98] text-white"
                      >
                        View
                      </Link>

                    </td>
                    <td className="p-4">
  {order.paymentMethod}
</td>

<td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium
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
</td>

                  </tr>
                  
                )
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}