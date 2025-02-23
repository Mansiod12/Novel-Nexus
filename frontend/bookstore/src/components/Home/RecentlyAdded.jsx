import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const RecentlyAdded = () => {
  const [data, setData] = useState([]); // ✅ State variable should start with lowercase

  useEffect(() => {
    const fetchBooks = async () => {  // ✅ Function name should be meaningful
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/get-recent-books`);  
        console.log("Fetched Data:", response.data);  // ✅ Debugging - Check API response

        setData(response.data.data || []);  // ✅ Ensure `data` exists in API response
      } catch (error) {
        console.error("Error fetching recently added books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-[#32502E] font-semibold">Recently Added Books</h4>

      {/* Grid for displaying books */}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.length > 0 ? (  // ✅ Display only if `data` is not empty
          data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />  {/* ✅ Ensure `BookCard` receives `data` */}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No recently added books available.</p>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;
