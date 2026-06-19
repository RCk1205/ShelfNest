export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">
          ShelfNest Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Bookstore Management System
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Books</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Orders</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Revenue</h2>
            <p className="text-3xl font-bold mt-2">₹0</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">Low Stock</h2>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        </div>
      </div>
    </main>
  );
}