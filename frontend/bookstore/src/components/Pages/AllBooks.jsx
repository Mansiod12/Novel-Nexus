import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const AllBooks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-all-books");
        console.log("Fetched Data:", response.data);
        setData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching recently added books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <h4 className="text-3xl text-[#32502E] font-semibold mb-6">All Books!</h4>

      {/* Book Grid (flex-grow ensures footer stays at the bottom) */}
      <div className="flex-grow">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data.map((item, i) => (
              <BookCard key={i} data={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No books available.</p>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
