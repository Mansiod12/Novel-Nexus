import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartBooks, setCartBooks] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Session expired. Please log in again.");
          navigate("/login");
          return;
        }

        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/get-user-cart`, { headers });
        setCartBooks(response.data.data || []);
      } catch (error) {
        alert("Failed to load cart. Please try again.");
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    setTotalPrice(cartBooks.reduce((sum, book) => sum + (book.price || 0), 0));
  }, [cartBooks]);

  const placeOrder = async () => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/place-order`,
        { order: cartBooks },
        { headers }
      );

      if (response.data.status === "success") {
        alert(response.data.message);
        setCartBooks([]);
        navigate("/profile/orderHistory");
      } else {
        alert("Something went wrong! Try again.");
      }
    } catch (error) {
      alert("Failed to place order. Please try again.");
    }
  };

  const deleteFromCart = async (bookId) => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/remove-from-cart/${bookId}`, {}, { headers });
      setCartBooks(cartBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      alert("Failed to remove book. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex flex-col bg-[#FDECED] text-[#6B591D]">
      {cartBooks.length > 0 ? (
        <>
          {/* Book List Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {cartBooks.map((book) => (
              <div
                key={book._id}
                className="flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-xl p-4 w-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={book.url || "https://via.placeholder.com/100"}
                  alt={book.title}
                  className="w-28 h-36 object-cover rounded-lg mb-2 sm:mb-0"
                />
                <div className="sm:ml-4 flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-[#6B591D]">{book.title}</h3>
                  <p className="text-[#233714] mt-1 font-medium">Price: ₹{(book.price || 0).toFixed(2)}</p>
                </div>
                <button
                  className="mt-3 sm:mt-0 sm:ml-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300"
                  onClick={() => deleteFromCart(book._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
  
          {/* Checkout Section */}
          <div className="mt-8 flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-[#6B591D]">Total: ₹{totalPrice.toFixed(2)}</h3>
            <button
              className="mt-4 px-8 py-3 bg-green-800 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
              onClick={placeOrder}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        // Empty Cart UI
        <div className="flex flex-col items-center justify-center flex-grow text-center p-4">
          <img className="w-40 h-auto opacity-80" src="https://cdn-icons-png.flaticon.com/512/11010/11010851.png " alt="Empty Cart" />
          <p className="mt-4 text-xl font-semibold text-[#6B591D]">Your cart is empty.</p>
          <button
            className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            onClick={() => navigate("/all-books")}
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
