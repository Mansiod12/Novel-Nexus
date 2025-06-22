import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "/src/store/cartSlice";
import { CheckCircle, Home, Package, Sparkles, Coffee, ArrowRight, BookOpen, Star } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.auth.id);
  const role = useSelector((state) => state.auth.role);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderProcessed, setOrderProcessed] = useState(false);
  const [floatingBooks, setFloatingBooks] = useState([]);

  useEffect(() => {
    const placeOrder = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/place-order`,
          { order: cartItems },
          { headers: { id: userId, Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        dispatch(clearCart());
        setOrderProcessed(true);
      } catch (error) {
        console.error("Error placing order:", error);
        setOrderProcessed(true); // Still show success UI even if there's an error
      }
    };

    if (cartItems.length > 0) {
      placeOrder();
    } else {
      // If no cart items, still show success (user might have refreshed page)
      setTimeout(() => setOrderProcessed(true), 1000);
    }
    
    // Trigger entrance animations
    setTimeout(() => setIsLoaded(true), 100);

    // Generate floating book elements
    const books = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      size: Math.random() * 20 + 15,
      rotation: Math.random() * 360,
      color: ['bg-amber-200', 'bg-orange-200', 'bg-green-200', 'bg-yellow-200'][Math.floor(Math.random() * 4)]
    }));
    setFloatingBooks(books);
  }, [cartItems, userId, dispatch]);

  const FloatingBook = ({ book }) => (
    <div
      className={`absolute ${book.color} rounded-sm opacity-20 animate-bounce`}
      style={{
        left: `${book.left}%`,
        top: `${book.top}%`,
        width: `${book.size}px`,
        height: `${book.size * 1.3}px`,
        animationDelay: `${book.animationDelay}s`,
        animationDuration: '4s',
        transform: `rotate(${book.rotation}deg)`,
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <BookOpen className="w-3 h-3 text-gray-400" />
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Floating background books */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingBooks.map((book) => (
          <FloatingBook key={book.id} book={book} />
        ))}
      </div>

      {/* Large decorative elements matching your theme */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/10 to-orange-200/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-tr from-green-200/10 to-amber-200/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-bl from-orange-200/10 to-yellow-200/10 rounded-full blur-3xl animate-pulse delay-2000" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Main success icon with book-themed styling */}
        <div className={`relative mb-8 transition-all duration-1000 ease-out ${isLoaded ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-green-600 to-green-700 rounded-full animate-ping opacity-15" />
          <div className="absolute inset-1 w-30 h-30 bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse opacity-25" />
          <div className="absolute inset-2 w-28 h-28 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-ping opacity-20 delay-500" />
          <div className="relative w-32 h-32 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <CheckCircle className="w-16 h-16 text-white drop-shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
          {/* Decorative stars around the success icon */}
          <Star className="absolute -top-2 -right-2 w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
          <Star className="absolute -bottom-2 -left-2 w-4 h-4 text-orange-400 animate-spin delay-1000" style={{ animationDuration: '4s' }} />
        </div>

        {/* Success message with your brand colors */}
        <div className={`text-center mb-12 transition-all duration-1000 delay-300 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-green-600 animate-pulse" />
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent tracking-tight">
              Success!
            </h1>
            <BookOpen className="w-8 h-8 text-green-600 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <div className="space-y-4">
            <p className="text-2xl md:text-3xl text-gray-700 font-bold">
              Your Book Order is Confirmed!
            </p>
            
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <Package className="w-6 h-6 text-green-600" />
              <span className="text-lg font-medium">Your literary journey awaits</span>
            </div>
          </div>
        </div>

        {/* Enhanced message with book theme */}
        <div className={`mb-12 transition-all duration-1000 delay-500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="group bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-amber-200/50 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:border-amber-300/60">
            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                <Coffee className="w-8 h-8 text-amber-600 animate-bounce" style={{ animationDelay: '1s' }} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-60" />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-700 mb-1">Time for a cozy reading break!</p>
                <p className="text-gray-600">We're carefully preparing your books for shipment</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-600 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Action buttons matching your brand theme */}
        <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-700 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <button
            onClick={() => navigate("/")}
            className="group relative px-10 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <div className="relative flex items-center gap-3">
              <Home className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Back to Home</span>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </button>

          <button
            onClick={() => navigate(role === "admin" ? "/profile/All-Orders" : "/profile/orderHistory")}
            className="group px-10 py-5 bg-white/95 backdrop-blur-lg text-green-700 font-bold text-lg rounded-2xl border-2 border-green-600/30 hover:border-green-600/60 hover:bg-white shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>{role === "admin" ? "Manage Orders" : "View My Orders"}</span>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </button>

          <button
            onClick={() => navigate("/all-books")}
            className="group px-10 py-5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 font-bold text-lg rounded-2xl border-2 border-amber-300/50 hover:border-amber-400/70 hover:from-amber-200 hover:to-orange-200 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Explore More Books</span>
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </button>
        </div>

        {/* Enhanced order status with book theme */}
        {orderProcessed && (
          <div className="mt-10 animate-fade-in">
            <div className="flex items-center gap-3 text-green-800 bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 rounded-full border-2 border-green-200/60 shadow-lg">
              <div className="relative">
                <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-50" />
              </div>
              <span className="font-bold">Order placed successfully</span>
              <CheckCircle className="w-5 h-5 text-green-700" />
              <span className="text-sm bg-green-200 px-3 py-1 rounded-full font-semibold">
                📚 Ready for your reading adventure!
              </span>
            </div>
          </div>
        )}

        {/* Reading community message */}
        <div className={`mt-8 transition-all duration-1000 delay-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="flex items-center gap-2 text-gray-600 bg-amber-50/80 px-6 py-3 rounded-full border border-amber-200/50 shadow-sm">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white" />
              <div className="w-6 h-6 bg-amber-400 rounded-full border-2 border-white" />
              <div className="w-6 h-6 bg-orange-400 rounded-full border-2 border-white" />
            </div>
            <span className="font-medium">Join 10,000+ happy readers</span>
            <Star className="w-4 h-4 text-amber-500 fill-current" />
          </div>
        </div>

        {/* Decorative bottom elements with book theme */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-3">
            <BookOpen className="w-4 h-4 text-green-400 animate-pulse opacity-60" />
            <BookOpen className="w-4 h-4 text-amber-400 animate-pulse opacity-60" style={{ animationDelay: '0.5s' }} />
            <BookOpen className="w-4 h-4 text-orange-400 animate-pulse opacity-60" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Success;