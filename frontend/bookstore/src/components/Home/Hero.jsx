import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-white to-[#F3EFCC] flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 lg:px-20 gap-10 py-12 overflow-hidden">
      {/* Left Section with Enhanced Animation and Styling */}
      <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6 z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#406343] leading-tight">
          Discover Your Next <br />
          <span className="text-[#DF9755] relative">
            Great Read
            <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#ECE7B4] opacity-50 rounded-full"></span>
          </span>
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-xl">
          Uncover captivating stories, enriching knowledge, and endless inspiration 
          in our carefully curated collection of exceptional books.
        </p>

        <div className="flex gap-4 pt-4">
          <button 
            className="text-white text-lg font-medium bg-[#406343] px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-[#ECE7B4] hover:text-[#406343] hover:shadow-xl transform hover:-translate-y-1"
            onClick={() => navigate("/all-books")}
          >
            Explore Books
          </button>
          <button 
            className="text-[#406343] text-lg font-medium bg-transparent border-2 border-[#406343] px-6 py-3 rounded-full shadow-md transition-all duration-300 hover:bg-[#406343] hover:text-white hover:shadow-lg transform hover:-translate-y-1"
            onClick={() => navigate("/about-us")}
          >
            About Us
          </button>
        </div>
        
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#ECE7B4] border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-[#DF9755] border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-[#406343] border-2 border-white"></div>
          </div>
          <span>Join 10,000+ happy readers</span>
        </div>
      </div>

      {/* Right Section with Enhanced Image Display */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative mt-8 lg:mt-0">
        <div className="absolute w-64 h-64 bg-[#ECE7B4] rounded-full opacity-20 blur-3xl"></div>
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#F3EFCC] rounded-full border-8 border-white shadow-inner z-0"></div>
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#406343] opacity-10 rounded-full z-0"></div>
          <img 
            src="/hero1.png" 
            alt="Book collection" 
            className="w-full max-w-sm md:max-w-md lg:max-w-lg relative z-10 drop-shadow-2xl transform transition-all duration-700 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;