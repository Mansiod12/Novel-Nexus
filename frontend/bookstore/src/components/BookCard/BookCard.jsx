import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite, cartBook, handleRemoveBookFromCart }) => {  
  if (!data) return null;  // ✅ Prevents errors if data is undefined

  const handleRemoveBook = async () => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: data._id,
      };

      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      alert("Failed to remove book. Please try again.");
      console.error("Error removing book:", error);
    }
  };

  return (
    <div className="bg-[#32502E] rounded-lg p-4 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-[#F8D49D] rounded-lg flex items-center justify-center p-2">
          <img 
            src={data.url} 
            alt={data.title} 
            className="h-[25vh] rounded-md shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h2 className="mt-4 text-xl font-bold text-[#F8D49D]">{data.title}</h2>
        <p className="mt-2 text-white font-medium">by {data.author}</p>
        <p className="mt-2 text-white font-semibold">Rs. {data.price}</p>
      </Link>

      {favourite && (
        <button 
          className="bg-[#F8D49D] text-[#32502E] text-sm px-3 py-1 rounded-md border border-[#32502E] 
                   mt-2 cursor-pointer hover:bg-[#E6C48D] hover:border-[#283D21] transition-all duration-300"
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}

      {cartBook && (
        <button 
          className="bg-[#F8D49D] text-[#32502E] text-sm px-3 py-1 rounded-md border border-[#32502E] 
                   mt-2 cursor-pointer hover:bg-[#E6C48D] hover:border-[#283D21] transition-all duration-300"
          onClick={handleRemoveBookFromCart}
        >
          Remove from Cart
        </button>
      )}
    </div>
  );
};

export default BookCard;
