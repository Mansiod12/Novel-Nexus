import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const location = useLocation();

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "About Us", link: "/about-us" },
  ];
  
  if (!isLoggedIn) links.splice(2, 2);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#406343] shadow-xl py-2" : "bg-[#406343] bg-opacity-95 py-4"
    } text-white px-8 shadow-lg`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center group">
          <div className="overflow-hidden rounded-full bg-white p-1 shadow-md transform transition-all duration-300 group-hover:scale-105">
            <img className="h-10 w-10 object-contain" src="/logo.png" alt="logo" />
          </div>
          <h1 className="ml-3 text-2xl md:text-3xl font-bold tracking-wide">
            <span className="text-white">Novel</span>
            <span className="text-[#ECE7B4]">Nexus</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className={`relative text-lg font-medium transition-all duration-300 px-2 py-1 ${
                isActive(item.link) 
                  ? "text-[#ECE7B4]" 
                  : "text-white hover:text-[#ECE7B4]"
              }`}
            >
              {item.title}
              {isActive(item.link) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ECE7B4] rounded-full"></span>
              )}
            </Link>
          ))}

          <div className="flex gap-4 ml-4">
            {isLoggedIn ? (
              role === "admin" ? (
                <Link
                  to="/profile"
                  className="px-5 py-2 border-2 border-[#ECE7B4] rounded-full font-medium hover:bg-[#ECE7B4] hover:text-[#406343] transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Admin Profile
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="px-5 py-2 border-2 border-[#ECE7B4] rounded-full font-medium hover:bg-[#ECE7B4] hover:text-[#406343] transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Profile
                </Link>
              )
            ) : (
              <>
                <Link
                  to="/LogIn"
                  className="px-5 py-2 border-2 border-[#ECE7B4] rounded-full font-medium hover:bg-[#ECE7B4] hover:text-[#406343] transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="px-5 py-2 bg-[#F3EFCC] text-[#406343] font-medium rounded-full hover:bg-[#ECE7B4] transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl bg-[#406343] bg-opacity-80 p-2 rounded-full shadow-md hover:bg-[#ECE7B4] hover:text-[#406343] transition-all duration-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 bg-[#406343] py-4 border-t border-[#ECE7B4] bg-opacity-95 backdrop-blur-sm animate-slideDown">
          {links.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className={`text-lg font-medium py-3 px-6 w-full text-center ${
                isActive(item.link) 
                  ? "text-[#ECE7B4] bg-[#406343] bg-opacity-70" 
                  : "text-white hover:text-[#ECE7B4] hover:bg-[#406343] hover:bg-opacity-50"
              } transition-all duration-300`}
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}

          {/* Add Login/Signup to Mobile Menu */}
          <div className="flex flex-col gap-3 mt-4 w-full px-6">
            {isLoggedIn ? (
              role === "admin" ? (
                <Link
                  to="/profile"
                  className="px-5 py-3 border-2 border-[#ECE7B4] rounded-full hover:bg-[#ECE7B4] hover:text-[#406343] transition-all text-center font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Profile
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="px-5 py-3 border-2 border-[#ECE7B4] rounded-full hover:bg-[#ECE7B4] hover:text-[#406343] transition-all text-center font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
              )
            ) : (
              <>
                <Link
                  to="/LogIn"
                  className="px-5 py-3 border-2 border-[#ECE7B4] rounded-full hover:bg-[#ECE7B4] hover:text-[#406343] transition-all text-center font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="px-5 py-3 bg-[#F3EFCC] text-[#406343] rounded-full hover:bg-[#ECE7B4] transition-all text-center font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;