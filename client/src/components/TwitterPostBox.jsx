import React, { useState } from 'react';
import { BsFillImageFill } from 'react-icons/bs';


const TwitterPostBox = () => {
  const [tweet, setTweet] = useState('');

  const handleTweetChange = (e) => {
    setTweet(e.target.value);
  };

  const handleSubmitTweet = (e) => {
    e.preventDefault();
    // Add your logic to handle the tweet submission here
    console.log('Tweet submitted:', tweet);
    setTweet(''); // Clear the input field
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow">
      <form onSubmit={handleSubmitTweet}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
          placeholder="What's happening?"
          value={tweet}
          onChange={handleTweetChange}
          rows="3"
        />
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <BsFillImageFill className="text-blue-500 cursor-pointer" />
            <span className="text-gray-500 ml-2">Add photos or videos</span>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default TwitterPostBox;
