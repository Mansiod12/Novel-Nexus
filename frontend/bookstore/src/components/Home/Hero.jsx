import React from "react";
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate=useNavigate();
  return (
    <div className="h-[80vh] flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 lg:px-20 gap-10">
      {/* Left Section */}
      <div className="w-full lg:w-3/6 text-center lg:text-left flex flex-col items-center lg:items-start">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#32502E] leading-tight animate-fade-in">
          Discover Your Next <br />
          <span className="text-[#DF9755]">Great Read</span>
        </h1>

        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-700 max-w-xl animate-fade-in delay-200">
          Uncover captivating stories, enriching knowledge, and endless inspiration 
          in our curated collection of books.
        </p>

        <div className="mt-6">
          <button className="text-white text-lg md:text-xl font-semibold bg-[#32502E] px-8 md:px-10 py-3 rounded-full shadow-md transition-all duration-300 hover:bg-[#EED690] hover:text-[#32502E] hover:scale-105"
          onClick={() => navigate("/all-books")}>
            Discover Books
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-3/6 flex items-center justify-center">
        <img 
          src="src/assets/hero1.png" 
          alt="hero" 
          className="w-full max-w-xs md:max-w-md lg:max-w-lg drop-shadow-lg transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Hero;
