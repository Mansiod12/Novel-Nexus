import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [cart, setCart] = useState([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/get-user-cart`,
          {
            headers: {
              id: userId,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCart(res.data.data);
        setIsCartLoaded(true);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setIsCartLoaded(true);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your order is confirmed — time to grab a coffee ☕ while we process it.
      </p>

      {isCartLoaded && cart.length === 0 && (
        <p className="text-green-700 font-semibold mb-4">
          Cart is now empty 🚀
        </p>
      )}

      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Success;
