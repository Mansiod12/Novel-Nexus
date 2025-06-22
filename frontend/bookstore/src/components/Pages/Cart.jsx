import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

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

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-user-cart`,
          { headers }
        );
        setCartBooks(response.data.data || []);
      } catch (error) {
        alert("Failed to load cart. Please try again.", error);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    setTotalPrice(cartBooks.reduce((sum, book) => sum + (book.price || 0), 0));
  }, [cartBooks]);


  const deleteFromCart = async (bookId) => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/remove-from-cart/${bookId}`,
        {},
        { headers }
      );
      setCartBooks(cartBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      alert("Failed to remove book. Please try again.", error);
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );

    const body = {
      products: cartBooks,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/create-checkout-session`,
      body,
      { headers }
    );

    const session = response.data;

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
      alert("Failed to redirect to payment gateway. Please try again.");
    }
  };

  // Just wrap your JSX in return ( ... )
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
                  <h3 className="text-lg font-semibold text-[#6B591D]">
                    {book.title}
                  </h3>
                  <p className="text-[#233714] mt-1 font-medium">
                    Price: ₹{(book.price || 0).toFixed(2)}
                  </p>
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
            <h3 className="text-2xl font-semibold text-[#6B591D]">
              Total: ₹{totalPrice.toFixed(2)}
            </h3>
            <button
              className="mt-4 px-8 py-3 bg-green-800 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
              onClick={makePayment}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        // Empty Cart UI
        <div className="flex flex-col items-center justify-center flex-grow text-center p-4">
          <img
            className="w-40 h-auto opacity-80"
            src="https://cdn-icons-png.flaticon.com/512/11010/11010851.png"
            alt="Empty Cart"
          />
          <p className="mt-4 text-xl font-semibold text-[#6B591D]">
            Your cart is empty.
          </p>
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
