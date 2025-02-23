import React, { useEffect, useState } from "react";
import Sidebar from "/src/components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";

const Profile = () => {
  const [Profile,setProfile]=useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-user-information`,
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="absolute top-8 left-4 md:hidden text-white text-xl z-20"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 g-[#9DC08B] text-white p-4 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 md:w-1/6`}
      >
        <Sidebar data={Profile}/>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white text-[#32502E] p-6 w-full md:w-5/6">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
