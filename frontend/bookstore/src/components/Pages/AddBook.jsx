import { useState } from "react";
import axios from "axios";

const AddBook = () => {
    const [bookData, setBookData] = useState({
        url: "",
        title: "",
        author: "",
        language: "",
        desc: "",
        price: "", 
    });

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("id");

            if (!userId) {
                alert("User ID is missing. Please log in again.");
                return;
            }

            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/add-book`,
                bookData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        id: userId,
                    },
                }
            );
            alert("Book added successfully!");
            setBookData({
                url: "",
                title: "",
                author: "",
                language: "",
                desc: "",
                price: "",
            });
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert(`Failed to add book. ${error.response?.data?.message || ""}`);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4 mt-[-50px]">
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 overflow-y-auto max-h-[100vh]">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    📚 Add New Book
                </h2>

                {bookData.url && (
                    <img
                        src={bookData.url}
                        alt="Book Cover"
                        className="w-full h-56 object-cover rounded-lg mb-4 shadow-md"
                    />
                )}

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="url"
                        value={bookData.url}
                        onChange={handleChange}
                        placeholder="Enter Image URL"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="title"
                        value={bookData.title}
                        onChange={handleChange}
                        placeholder="Book Title"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="author"
                        value={bookData.author}
                        onChange={handleChange}
                        placeholder="Author Name"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="language"
                        value={bookData.language}
                        onChange={handleChange}
                        placeholder="Language"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <textarea
                        name="desc"
                        value={bookData.desc}
                        onChange={handleChange}
                        placeholder="Book Description"
                        rows="4"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>

                    <input
                        type="number"
                        name="price"
                        value={bookData.price}
                        onChange={handleChange}
                        placeholder="Enter Book Price"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:scale-105 hover:shadow-lg"
                    >
                        ➕ Add Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBook;
