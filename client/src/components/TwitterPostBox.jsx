import React, { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const TwitterPostBox = () => {
  const [tweet, setTweet] = useState("");
  const { user } = useAuth();
  const postAPI = "http://localhost:3000/post";
  const userName = user?.name;
  const userId = user?._id;
  const tabooWordList = ["nigger", "bitch","dam"]; // Replace with your actual taboo words


  const filterTweet = (tweet) => {
    let filteredTweet = tweet;
    tabooWordList.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b|${word}`, 'gi');
      filteredTweet = filteredTweet.replace(regex, (match) => '*'.repeat(match.length));
    }, 0);
    return filteredTweet;
  };

  const handleTweetChange = (e) => {
    console.log("New tweet value:", e.target.value);

    setTweet(e.target.value);
  };

  const handleSubmitTweet = async (e) => {
    e.preventDefault();
    const filteredContent = filterTweet(tweet);
    const tabooWordCount = tabooWordList.reduce((count, word) => {
      const regex = new RegExp(`\\b${word}\\b|${word}`, 'gi');
      return count + (filteredContent.match(regex) || []).length;
    }, 0);

    if (tabooWordCount <= 2) {
      try {
        await axios.post(postAPI, { content: filteredContent, userId, userName });
        console.log("Tweet posted successfully");
        // Optionally update state or trigger re-render here
      } catch (error) {
        console.error("Error when posting a tweet", error);
      }
    } else {
      console.log("Tweet blocked due to excessive taboo words.");
      // Optionally show a warning to the user
      alert("Your message contains excessive taboo words. Please review your message.");
    }
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
