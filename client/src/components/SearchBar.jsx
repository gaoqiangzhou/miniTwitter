// SearchBar.jsx
import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";




const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
 


  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center border rounded-md">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-gray-300 px-3 py-2 rounded-md hover:bg-gray-400"
        >
          <IoSearchOutline />
          
        </button>
        
      </div>
      
    </div>
  );
};

export default SearchBar;
