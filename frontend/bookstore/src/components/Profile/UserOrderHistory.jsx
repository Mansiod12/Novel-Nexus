import React, { useEffect, useState } from "react";
import axios from "axios";

const UserOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");

        if (!token || !userId) {
          setError("User not authenticated. Please log in.");
          return;
        }

        const headers = {
          id: userId,
          authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-order-history`,
          { headers }
        );

        setOrders(response.data.data);
      } catch (error) {
        setError("Failed to fetch order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 min-h-screen text-[#6B591D]">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Order History</h2>

      {loading ? (
        <p className="text-gray-600 text-center">Loading orders...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : orders.length > 0 ? (
        // Responsive Scrollable Container
        <div className="max-h-[500px] overflow-y-auto border border-gray-300 rounded-lg shadow-lg bg-white p-4 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-3/4 mx-auto">

          {orders.map((order, index) => (
            <div
              key={order._id}
              className="p-4 bg-white rounded-lg shadow-md mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200"
            >
              {/* Order Details */}
              <div className="flex-1">
                <p className="text-gray-700 font-semibold">
                  {index + 1}. {order.book?.title || "Unknown Book"}
                </p>
                <p className="text-gray-600 text-sm break-words sm:max-w-sm">
                  {order.book?.desc || "No description available"}
                </p>
              </div>

              {/* Price & Status */}
              <div className="text-left sm:text-right mt-2 sm:mt-0">
                <p className="text-gray-800 font-medium">₹{order.book?.price || 0}</p>
                <p className="text-green-600 font-semibold">{order.status}</p>
                <p className="text-gray-600 text-sm">COD</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No orders found.</p>
      )}
    </div>
  );
};

export default UserOrderHistory;
