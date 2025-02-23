import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/get-book-by-id/${id}`);
        setData(response.data.data || {});
        setUpdatedData(response.data.data || {});
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleFavourite = async () => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/add-to-favourite`, {}, { headers });
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/add-to-cart`, {}, { headers });
    alert(response.data.message);
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/update-book`, updatedData, { headers });
      alert(response.data.message);
      setData(updatedData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/delete-book`, { headers });
      alert(response.data.message);
      navigate("/books"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book");
    }
  };

  if (loading) return <p className="text-[#32502E] text-lg">Loading...</p>;
  if (error) return <p className="text-red-500 text-lg">{error}</p>;
  if (!Data) return <p className="text-[#32502E] text-lg">No book found!</p>;

  return (
    <div className="px-15 py-8 flex flex-col md:flex-row gap-8 bg-[#F8D49D] min-h-screen">
      {/* Book Image & Buttons */}
      <div className="bg-white shadow-lg rounded-lg p-4 w-full md:w-1/2 flex flex-col justify-center items-center">
        {Data.url ? (
          <img className="w-70 h-100 object-cover rounded-md" src={Data.url} alt={Data.title || "Book Image"} />
        ) : (
          <p className="text-[#32502E] text-lg">No Image Available</p>
        )}

        {/* Buttons */}
        {isLoggedIn && role === "user" && (
          <div className="mt-4 flex gap-4 bg-white p-3 rounded-lg shadow-md">
            <button className="p-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-700" onClick={handleFavourite}>
              <FaHeart className="w-6 h-6" />
            </button>
            <button className="p-3 bg-[#32502E] text-white rounded-full shadow-md hover:bg-[#25381E]" onClick={handleCart}>
              <FaShoppingCart className="w-6 h-6" />
            </button>
          </div>
        )}

        {isLoggedIn && role === "admin" && (
          <div className="mt-4 flex gap-4 bg-white p-3 rounded-lg shadow-md">
            <button className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700" onClick={() => setEditMode(true)}>
              <FaEdit className="w-6 h-6" />
            </button>
            <button className="p-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-700" onClick={handleDelete}>
              <MdDeleteOutline className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="p-4 w-full md:w-1/2">
        <h2 className="text-3xl font-bold text-[#32502E]">{Data.title || "No Title"}</h2>
        <p className="mt-4 text-lg text-gray-700 font-medium">
          by <span className="text-[#32502E] font-semibold">{Data.author || "Unknown"}</span>
        </p>
        <p className="mt-2 text-lg text-[#32502E]">Price: <span className="font-bold">Rs. {Data.price || "N/A"}</span></p>
        <p className="mt-4 text-gray-800">{Data.desc || "No Description Available"}</p>
        <p className="mt-4 flex items-center text-[#32502E]">
          <GrLanguage className="mr-2" />
          <span className="font-semibold">{Data.language || "Language Not Specified"}</span>
        </p>
      </div>

      {/* Edit Modal */}
      {editMode && (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-[#32502E]">
      <h2 className="text-xl font-bold text-[#32502E]">Edit Book</h2>
      <input type="text" className="w-full p-2 mt-2 border rounded border-[#32502E]" 
        value={updatedData.title} 
        onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })} 
        placeholder="Title" 
      />
      <input type="text" className="w-full p-2 mt-2 border rounded border-[#32502E]" 
        value={updatedData.author} 
        onChange={(e) => setUpdatedData({ ...updatedData, author: e.target.value })} 
        placeholder="Author" 
      />
      <input type="number" className="w-full p-2 mt-2 border rounded border-[#32502E]" 
        value={updatedData.price} 
        onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })} 
        placeholder="Price" 
      />
      <textarea className="w-full p-2 mt-2 border rounded border-[#32502E]" 
        value={updatedData.desc} 
        onChange={(e) => setUpdatedData({ ...updatedData, desc: e.target.value })} 
        placeholder="Description">
      </textarea>
      <button className="bg-[#32502E] text-white px-4 py-2 mt-3 rounded-md hover:bg-[#25381E]" onClick={handleEdit}>
        Save Changes
      </button>
      <button className="ml-2 text-red-500" onClick={() => setEditMode(false)}>Cancel</button>
    </div>
  </div>
)}

    </div>
  );
};

export default ViewBookDetails;
