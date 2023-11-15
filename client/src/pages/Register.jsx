import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


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
    <div
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold mb-6 text-center">Sign Up</h3>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
        <div className="mt-3">
          <span className="text-gray-600">Already have an account?</span>
          <Link to="/Login" className="text-blue-500 hover:underline ml-1">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register
