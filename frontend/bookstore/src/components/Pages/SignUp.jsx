import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import axios from "axios";

const SignupPage = () => {
  
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/sign-up`, values);
      
      alert(response.data.message); 
      navigate("/LogIn"); 
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#F8D49D] to-[#32502E]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-[#32502E]"
      >
        <h2 className="text-4xl font-bold text-[#32502E] text-center mb-6">Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {["username", "email", "password", "address"].map((field, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <label className="block text-[#32502E] font-semibold capitalize">{field}</label>
              <input
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                name={field}
                value={values[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#32502E] focus:outline-none transition-all"
              />
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#32502E] text-white py-3 rounded-lg font-semibold hover:bg-[#2a4727] transition"
          >
            Create Account
          </motion.button>
        </form>

        <p className="mt-6 text-center text-[#32502E]">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
