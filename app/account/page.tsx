import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const session =
    await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email:
          session.user?.email || "",
      },
      include: {
        orders: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#F8FBFD]">

      <div className="max-w-6xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          My Account
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white rounded-xl border-l-4 border-[#447F98] p-6 shadow-sm">
            <h3 className="text-gray-600 text-sm">
              Name
            </h3>

            <p className="text-xl font-bold mt-2">
              {user.name}
            </p>
          </div>

          <div className="bg-white rounded-xl border-l-4 border-[#447F98] p-6 shadow-sm">
            <h3 className="text-gray-600 text-sm">
              Email
            </h3>

            <p className="text-lg font-medium mt-2">
              {user.email}
            </p>
          </div>

          <div className="bg-white rounded-xl border-l-4 border-[#447F98] p-6 shadow-sm">
            <h3 className="text-gray-600 text-sm">
              Total Orders
            </h3>

            <p className="text-3xl font-bold mt-2">
              {user.orders.length}
            </p>
          </div>

        </div>
<div className="mb-8">

  <Link
    href="/account/wishlist"
    className="inline-block px-5 py-3 rounded-lg bg-[#447F98] text-white hover:bg-[#2F657C]"
  >
    View Wishlist
  </Link>

</div>
        <div className="bg-white rounded-xl border overflow-hidden">

          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-900">
              My Orders
            </h2>
          </div>

          <table className="w-full">

            <thead>
<tr className="border-b bg-[#EAF4F8]">

  <th className="text-left p-4">
    Order No
  </th>

  <th className="text-left p-4">
    Date
  </th>

  <th className="text-left p-4">
    Total
  </th>

  <th className="text-left p-4">
    Payment
  </th>

  <th className="text-left p-4">
    Payment Status
  </th>

  <th className="text-left p-4">
    Order Status
  </th>

</tr>

            </thead>

            <tbody>

              {user.orders.map(
                (order) => (
                 <tr
  key={order.id}
  className="border-b"
>

  <td className="p-4">
    {order.orderNumber}
  </td>

  <td className="p-4">
    {new Date(
      order.createdAt
    ).toLocaleDateString()}
  </td>

  <td className="p-4">
    ₹{order.total}
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

</tr>
                )
              )}

              {user.orders.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}