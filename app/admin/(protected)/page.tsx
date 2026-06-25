import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session =
  await getServerSession(authOptions);

if (!session) {
  redirect("/admin/login");
}

if (
  (session.user as any).role !==
  "ADMIN"
) {
  redirect("/");
}

  const totalBooks = await prisma.book.count();

  const totalCategories =
    await prisma.category.count();

  const featuredBooks =
    await prisma.book.count({
      where: {
        featured: true,
      },
    });

  const lowStockBooks =
    await prisma.book.count({
      where: {
        stock: {
          lte: 5,
        },
      },
    });

    const totalOrders =
  await prisma.order.count();

const pendingOrders =
  await prisma.order.count({
    where: {
      orderStatus: "PENDING",
    },
  });
  const paidOrders =
  await prisma.order.count({
    where: {
      paymentStatus: "PAID",
    },
  });

const pendingPayments =
  await prisma.order.count({
    where: {
      paymentStatus: "PENDING",
    },
  });

const deliveredOrders =
  await prisma.order.count({
    where: {
      orderStatus: "DELIVERED",
    },
  });

const revenueResult =
  await prisma.order.aggregate({
    where: {
      paymentStatus: "PAID",
    },

    _sum: {
      total: true,
    },
  });

const totalRevenue =
  revenueResult._sum.total || 0;

const recentOrders =
  await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  
  const recentBooks =
    await prisma.book.findMany({
      
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
const lowStockBookList =
  await prisma.book.findMany({
    where: {
      stock: {
        lte: 5,
      },
    },

    orderBy: {
      stock: "asc",
    },

    take: 10,
  });
  const currentMonth = new Date();
currentMonth.setDate(1);
currentMonth.setHours(0, 0, 0, 0);

const monthlyOrders =
  await prisma.order.count({
    where: {
      createdAt: {
        gte: currentMonth,
      },
    },
  });

const monthlyRevenueResult =
  await prisma.order.aggregate({
    where: {
      paymentStatus: "PAID",
      createdAt: {
        gte: currentMonth,
      },
    },
    _sum: {
      total: true,
    },
  });

const monthlyRevenue =
  monthlyRevenueResult._sum.total || 0;

const topSellingBooks =
  await prisma.orderItem.groupBy({
    by: ["bookId"],

    _sum: {
      quantity: true,
    },

    orderBy: {
      _sum: {
        quantity: "desc",
      },
    },

    take: 5,
  });

const topSellingBooksWithData =
  await Promise.all(
    topSellingBooks.map(
      async (item) => {
        const book =
          await prisma.book.findUnique({
            where: {
              id: item.bookId,
            },
          });

        return {
          title:
            book?.title || "Unknown",
          sold:
            item._sum.quantity || 0,
        };
      }
    )
  );
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-700 mt-2">
          Welcome to ShelfNest
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

  <div className="bg-white rounded-xl border-l-4 border-[#447F98] p-6 shadow-sm">
    <h3 className="text-gray-600 text-sm">
      Total Books
    </h3>

    <p className="text-3xl font-bold text-gray-900 mt-2">
      {totalBooks}
    </p>
  </div>
  <div className="bg-white rounded-xl border-l-4 border-indigo-500 p-6 shadow-sm">
  <h3 className="text-gray-600 text-sm">
    Categories
  </h3>

  <p className="text-3xl font-bold mt-2">
    {totalCategories}
  </p>
</div>
<div className="bg-white rounded-xl border-l-4 border-red-500 p-6 shadow-sm">
  <h3 className="text-gray-600 text-sm">
    Low Stock Books
  </h3>

  <p className="text-3xl font-bold mt-2">
    {lowStockBooks}
  </p>
</div>
<div className="bg-white rounded-xl border-l-4 border-purple-500 p-6 shadow-sm">
  <h3 className="text-gray-600 text-sm">
    Featured Books
  </h3>

  <p className="text-3xl font-bold mt-2">
    {featuredBooks}
  </p>
</div>
  <div className="bg-white rounded-xl border-l-4 border-[#447F98] p-6 shadow-sm">
    <h3 className="text-gray-600 text-sm">
      Total Orders
    </h3>

    <p className="text-3xl font-bold text-gray-900 mt-2">
      {totalOrders}
    </p>
  </div>

  <div className="bg-white rounded-xl border-l-4 border-[#447F98] p-6 shadow-sm">
    <h3 className="text-gray-600 text-sm">
      Revenue
    </h3>

    <p className="text-3xl font-bold text-gray-900 mt-2">
      ₹{totalRevenue}
    </p>
  </div>

  <div className="bg-white rounded-xl border-l-4 border-[#447F98] p-6 shadow-sm">
    <h3 className="text-gray-600 text-sm">
      Pending Orders
    </h3>

    <p className="text-3xl font-bold text-gray-900 mt-2">
      {pendingOrders}
    </p>
  </div>
  <div className="bg-white rounded-xl border-l-4 border-emerald-500 p-6 shadow-sm">
  <h3 className="text-gray-600 text-sm">
    Delivered Orders
  </h3>

  <p className="text-3xl font-bold mt-2">
    {deliveredOrders}
  </p>
</div>
<div className="bg-white rounded-xl border-l-4 border-green-500 p-6 shadow-sm">
  <h3 className="text-gray-600 text-sm">
    Paid Orders
  </h3>

  <p className="text-3xl font-bold mt-2">
    {paidOrders}
  </p>
</div>

<div className="bg-white rounded-xl border-l-4 border-yellow-500 p-6 shadow-sm">
  <h3 className="text-gray-600 text-sm">
    Pending Payments
  </h3>

  <p className="text-3xl font-bold mt-2">
    {pendingPayments}
  </p>
</div>
<div className="bg-white rounded-xl border-l-4 border-cyan-500 p-6 shadow-sm">
  <h3 className="text-gray-600 text-sm">
    Monthly Orders
  </h3>

  <p className="text-3xl font-bold mt-2">
    {monthlyOrders}
  </p>
</div>

<div className="bg-white rounded-xl border-l-4 border-pink-500 p-6 shadow-sm">
  <h3 className="text-gray-600 text-sm">
    Monthly Revenue
  </h3>

  <p className="text-3xl font-bold mt-2">
    ₹{monthlyRevenue}
  </p>
</div>
</div>

<div className="bg-white rounded-xl border overflow-hidden">

  <div className="p-6 border-b">
    <h2 className="text-xl font-semibold text-gray-900">
      Recent Orders
    </h2>
  </div>

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

      </tr>

    </thead>

    <tbody>

      {recentOrders.map((order) => (

        <tr
          key={order.id}
          className="border-b"
        >

          <td className="p-4">
            {order.orderNumber}
          </td>

          <td className="p-4">
            {order.customerName}
          </td>

          <td className="p-4">
            ₹{order.total}
          </td>

          <td className="p-4">
            {order.orderStatus}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>
<div className="bg-white rounded-xl border overflow-hidden">

  <div className="p-6 border-b">
    <h2 className="text-xl font-semibold text-red-600">
      Low Stock Alert
    </h2>
  </div>

  <div className="p-6">

    {lowStockBookList.length === 0 ? (
      <p className="text-green-600">
        All books have sufficient stock
      </p>
    ) : (
      <div className="space-y-3">

        {lowStockBookList.map((book) => (
          <div
            key={book.id}
            className="flex justify-between border-b pb-2"
          >
            <span>
              {book.title}
            </span>

            <span className="font-bold text-red-600">
              {book.stock} left
            </span>
          </div>
        ))}

      </div>
    )}

  </div>

</div>
<div className="bg-white rounded-xl border overflow-hidden">

  <div className="p-6 border-b">
    <h2 className="text-xl font-semibold text-gray-900">
      Top Selling Books
    </h2>
  </div>

  <div className="p-6">

    {topSellingBooksWithData.length === 0 ? (
      <p className="text-gray-500">
        No sales yet
      </p>
    ) : (
      <div className="space-y-3">

        {topSellingBooksWithData.map(
          (book, index) => (
            <div
              key={index}
              className="flex justify-between border-b pb-2"
            >
              <span>
                {book.title}
              </span>

              <span className="font-bold text-[#447F98]">
                {book.sold} sold
              </span>
            </div>
          )
        )}

      </div>
    )}

  </div>

</div>

      <div className="bg-white rounded-xl border overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Books
          </h2>
        </div>

        <table className="w-full">

          <thead>

            <tr className="border-b bg-[#EAF4F8]">

              <th className="text-left p-4 text-gray-900">
                Title
              </th>

              <th className="text-left p-4 text-gray-900">
                Author
              </th>

              <th className="text-left p-4 text-gray-900">
                Category
              </th>

              <th className="text-left p-4 text-gray-900">
                Stock
              </th>

            </tr>

          </thead>

          <tbody>

            {recentBooks.map((book) => (

              <tr
                key={book.id}
                className="border-b"
              >

                <td className="p-4 text-gray-800">
                  {book.title}
                </td>

                <td className="p-4 text-gray-800">
                  {book.author}
                </td>

                <td className="p-4 text-gray-800">
                  {book.category.name}
                </td>

                <td className="p-4 text-gray-800">
                  {book.stock}
                </td>

              </tr>

            ))}

            {recentBooks.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  No books available
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}