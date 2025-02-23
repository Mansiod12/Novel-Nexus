import React, { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  const [profileData, setProfileData] = useState(null);
  const [value, setValue] = useState({ address: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/get-user-information`,
          { headers }
        );

        setProfileData(response.data);
        setValue({ address: response.data.address || "" });
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const response = await axios.put(
        "http://localhost:1000/api/v1/update-address",
        { address: value.address },
        { headers }
      );

      alert(response.data.message); // Show success alert

      // Update profileData state to reflect the new address immediately
      setProfileData((prev) => ({ ...prev, address: value.address }));
    } catch (error) {
      alert("Failed to update address"); // Show error alert
    }
  };

  return (
    <div className="h-full p-6 md:p-10 min-h-screen  from-gray-100 to-blue-100">

      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : profileData ? (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-2xl mx-auto">
          {/* Username & Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-700 font-semibold">Username</label>
              <p className="p-3 rounded border border-gray-300 mt-2 text-gray-800">
                {profileData.username}
              </p>
            </div>
            <div>
              <label className="text-gray-700 font-semibold">Email</label>
              <p className="p-3 rounded border border-gray-300 mt-2 text-gray-800">
                {profileData.email}
              </p>
            </div>
          </div>

          {/* Address Input */}
          <div className="mt-6">
            <label className="text-gray-700 font-semibold">Address</label>
            <textarea
              className="w-full p-3 rounded border border-gray-300 mt-2  focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              rows="4"
              placeholder="Enter your address"
              name="address"
              value={value.address}
              onChange={(e) => setValue({ address: e.target.value })}
            ></textarea>
          </div>

          {/* Update Button */}
          <div className="mt-6 flex justify-end">
            <button
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-500 transition-all shadow-md"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">No profile data found.</p>
      )}
    </div>
  );
};

export default Settings;
