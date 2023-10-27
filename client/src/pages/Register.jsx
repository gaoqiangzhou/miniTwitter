import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {user, signup} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(username, password);
    navigate("/");
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3 className = "font-bold text-center">Sign up</h3>
      <label className = "block mb-2 text-sm font-medium">Username:</label>
      <input type = "username" onChange={(e) => setUsername(e.target.value)} className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      <label className = "block mb-2 text-sm font-medium">password:</label>
      <input type = "password" onChange={(e) => setPassword(e.target.value)} className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      <button className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Register</button>
    </form>
  )
}

export default Register
