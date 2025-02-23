import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-books",
          { headers }
        );

        if (response.data && Array.isArray(response.data.data)) {
          setFavouriteBooks(response.data.data);
        } else {
          console.error("Invalid response format:", response.data);
          setFavouriteBooks([]);
        }
      } catch (error) {
        console.error("Error fetching favourite books:", error);
        setFavouriteBooks([]);
      }
    };

    fetchFavourites();
  }, [FavouriteBooks]);

  const handleRemoveBook = (bookId) => {
    setFavouriteBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
  };

  return (
    <div className="container mx-auto p-4">

      {/* Scrollable Container */}
      <div className="max-h-[500px] overflow-y-auto  rounded-lg p-4 shadow-md">
        {FavouriteBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {FavouriteBooks.map((item, i) => (
              <BookCard key={i} data={item} favourite={true} onRemove={handleRemoveBook} />
            ))}
          </div>
        ) : (<>
          <div className="flex items-center justify-center">
            <img
              className="w-40 h-auto opacity-80"  // Adjust size & opacity for better UI
              src="https://static.vecteezy.com/system/resources/previews/013/169/282/original/stack-of-book-pile-of-books-illustration-icon-stack-of-books-in-flat-style-png.png"
              alt="No Books"
            />
            <p className="text-center text-xl text-gray-600 mt-4">
              No favourite books found.
            </p>
          </div>
        </>)}
      </div>
    </div>
  );
};

export default Favourites;
