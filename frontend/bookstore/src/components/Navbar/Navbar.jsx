import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "About Us", link: "/about-us" },
    

  ];
  if (!isLoggedIn) links.splice(2, 2);
  

  return (
    <nav className="bg-[#406343] text-white px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img className="h-12 mr-4" src="/logo.png" alt="logo" />
          <h1 className="text-3xl font-bold tracking-wide">Novel Nexus</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((items, i) => (
            <Link
              to={items.link}
              key={i}
              className="text-lg font-medium hover:text-[#ECE7B4] transition-all duration-300"
            >
              {items.title}
            </Link>
          ))}

          <div className="flex gap-6">
            {isLoggedIn ? (
              role === "admin" ? (
                <Link
                  to="/profile"
                  className="px-5 py-2 border-2 border-[#ECE7B4] rounded-md hover:bg-[#ECE7B4] hover:text-[#406343] transition-all"
                >
                  Admin Profile
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="px-5 py-2 border-2 border-[#ECE7B4] rounded-md hover:bg-[#ECE7B4] hover:text-[#406343] transition-all"
                >
                  Profile
                </Link>
              )
            ) : (
              <>
                <Link
                  to="/LogIn"
                  className="px-5 py-2 border-2 border-[#ECE7B4] rounded-md hover:bg-[#ECE7B4] hover:text-[#406343] transition-all"
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="px-5 py-2 bg-[#F3EFCC] text-black rounded-md hover:bg-[#ECE7B4] hover:text-[#406343] transition-all"
                >
                  SignUp
                </Link>
              </>
            )}

          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-3xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 bg-[#406343] py-4">
          {links.map((items, i) => (
            <Link
              to={items.link}
              key={i}
              className="text-lg font-medium hover:text-[#ECE7B4] transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              {items.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

