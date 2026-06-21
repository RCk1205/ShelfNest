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
                      {order.orderNumber}
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
                      {
                        order.orderStatus
                      }
                    </td>

                    <td className="p-4">

                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="px-3 py-1 rounded bg-[#447F98] text-white"
                      >
                        View
                      </Link>

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