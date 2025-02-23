import { useEffect, useState } from "react";
import axios from "axios";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/get-all-orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen  p-4 mt-[-50px]">

            <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-8 overflow-y-auto max-h-[80vh]">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">📦 All Orders</h2>

                {loading ? (
                    <p className="text-center text-gray-600">Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p className="text-center text-gray-600">No orders found.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
                                <p className="text-gray-800 font-semibold">📖 Book: {order.book?.title || "Unknown Book"}</p>
                                <p className="text-gray-600">👤 Ordered by: {order.user?.username || "Anonymous"}</p>
                                <p className="text-gray-600">🕒 Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Unknown Date"}</p>
                                <p className="text-gray-600">🚀 Status: {order.status || "Pending"}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllOrders;
