import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "/src/store/auth"; // Ensure this path is correct

const Sidebar = ({ data = {} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear(); // Clears all local storage items
    navigate("/");
  };

  return (
    <div className="bg-[#D0E8C5] text-[#3A6351] p-6 rounded-xl flex flex-col items-center w-full h-full shadow-lg transition-all duration-300">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <img
          src={data?.avatar || "/default-avatar.png"}
          alt="User Avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#3A6351] shadow-md"
        />
        <p className="mt-4 text-2xl font-bold">{data?.username || "Guest"}</p>
        <p className="mt-1 text-md text-gray-600 italic">{data?.email || "No Email"}</p>

        {/* Divider */}
        <div className="w-full mt-5 h-[2px] bg-[#3A6351] opacity-50"></div>
      </div>

      {/* Navigation Links */}
      <div className="w-full flex flex-col items-center mt-6 gap-4">
        {role === "admin" ? (
          <>
            <Link
              to="/profile/All-Orders"
              className="text-[#3A6351] font-semibold w-4/5 py-3 text-center bg-white rounded-lg shadow-md transition-all duration-300 hover:bg-[#3A6351] hover:text-white hover:scale-105 hover:shadow-lg"
            >
              All Orders
            </Link>
            <Link
              to="/profile/AddBook"
              className="text-[#3A6351] font-semibold w-4/5 py-3 text-center bg-white rounded-lg shadow-md transition-all duration-300 hover:bg-[#3A6351] hover:text-white hover:scale-105 hover:shadow-lg"
            >
              Add Book
            </Link>
          </>
        ) : role === "user" ? (
          <>
            {[
              { path: "/profile/Favourites", label: "Favourites" },
              { path: "/profile/orderHistory", label: "Order History" },
              { path: "/profile/settings", label: "Settings" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-[#3A6351] font-semibold w-4/5 py-3 text-center bg-white rounded-lg shadow-md transition-all duration-300 hover:bg-[#3A6351] hover:text-white hover:scale-105 hover:shadow-lg"
              >
                {item.label}
              </Link>
            ))}
          </>
        ) : null}

        {/* Logout Button (Common for Both) */}
        {isLoggedIn && (
          <button
            className="w-4/5 py-3 font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:scale-105 hover:shadow-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

    </div>
  );
};

export default Sidebar;
