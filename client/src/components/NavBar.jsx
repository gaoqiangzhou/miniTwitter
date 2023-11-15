import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Assuming you have an AuthContext for user authentication

const NavBar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const SmallNav = () => (
    <div className="md:hidden z-50">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="text-white text-[30px]"
        >
          <AiOutlineBars />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-auto rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul className="py-1" role="none">
            <Link to="/Login">
              <li
                onClick={() => setIsOpen(false)}
                className="ml-3 font-light hover:bg-white hover:text-black py-2 px-4 text-[13px] rounded-full"
              >
                Login
              </li>
            </Link>
            <Link to="/Register">
              <li
                onClick={() => setIsOpen(false)}
                className="ml-3 font-light hover:bg-white hover:text-black py-2 px-4 text-[13px] rounded-full"
              >
                Register
              </li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <nav style={{ zIndex: "101" }} className="fixed w-full top-0 bg-slate-900 ">
      <div className="flex justify-between items-center px-20 py-4">
        <Link to="/">
          <span className="text-white text-[10px] md:text-[15px] font-black flex font-mono">
            MiniTwitter
          </span>
        </Link>
        <div>
          {user ? (
            <div>
              <span className="text-white text-[13px] mr-4">
                {user?.data[0].name}
              </span>
              <button
                onClick={logout}
                className="text-white text-[13px] hover:bg-white hover:text-black py-2 px-4 rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <ul className="hidden md:flex text-white">
              <Link to="/Login">
                <li className="ml-3 font-light hover:bg-white hover:text-black py-2 px-4 text-[13px] rounded-full">
                  Login
                </li>
              </Link>
              <Link to="/Register">
                <li className="ml-3 font-light hover:bg-white hover:text-black py-2 px-4 text-[13px] rounded-full">
                  Register
                </li>
              </Link>
            </ul>
          )}
        </div>
        <SmallNav />
      </div>
    </nav>
  );
};

export default NavBar;
