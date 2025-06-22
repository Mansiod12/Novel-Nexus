import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Cancelled!</h1>
      <p className="text-lg text-gray-700 mb-6">
        It seems you hit the cancel button... or maybe you had second thoughts 🧐.
      </p>
      <Link
        to="/"
        className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition duration-300"
      >
         Go to Home
      </Link>
    </div>
  );
};

export default Cancel;
