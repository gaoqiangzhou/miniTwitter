import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {user, login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username, password)
    .then((res) => res && navigate("../suggest/"+res?._id, { replace: true }))
  }
  return (
    <form onSubmit={handleSubmit}>
      <h3 className = "font-bold text-center">Login</h3>
      <label className = "block mb-2 text-sm font-medium">Username:</label>
      <input type = "username" onChange={(e) => setUsername(e.target.value)} className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      <label className = "block mb-2 text-sm font-medium">password:</label>
      <input type = "password" onChange={(e) => setPassword(e.target.value)} className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
      <button className = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
    </form>
  )
}

export default Login
