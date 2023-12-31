import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-1280px flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center">
          <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white text-[#00df9a]">Mini Twitter</span>
        </NavLink>

        <div className="w-full md:block md:w-auto" id="navbar-default">
          {!user ? 
            (<ul className = "font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="/login" className = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register" className = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</NavLink>
              </li>
            </ul>) :
            (<div>
              <NavLink to={"/profile/"+user._id} className = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">{user.name}</NavLink>
              <p className="text-center text-sm text-gray-400 font-medium">Balance:{user?.balance}</p>
              <button onClick={() => {logout(); navigate("../", { replace: true })}} className = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                logout
              </button>
            </div>)}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
