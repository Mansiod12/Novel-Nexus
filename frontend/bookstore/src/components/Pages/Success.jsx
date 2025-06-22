import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your order is confirmed — time to grab a coffee ☕ while we process it.
      </p>
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
