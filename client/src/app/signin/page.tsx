"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/dashboard"; // Redirect to dashboard or home page
        }, 2000);
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-center text-2xl font-bold mb-6 text-blue-800">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-black mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
