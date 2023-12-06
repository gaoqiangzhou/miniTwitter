import React, { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { usePost } from "../contexts/PostContext";

const TwitterPostBox = () => {
  const [tweet, setTweet] = useState("");
  const { user } = useAuth();
  const { posts, updatePosts } = usePost();
  const postAPI = "http://localhost:3000/post";
  const userName = user?.name;
  const userId = user?._id;
  const tabooWordList = ["fuck", "asshole", "damn"]; // Replace with your actual taboo words

  const filterTweet = (tweet) => {
    let filteredTweet = tweet;
    let filterCount = 0;
    tabooWordList.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b|${word}`, "gi");
      if (regex.exec(filteredTweet)) {
        filterCount += 1;
      }
      filteredTweet = filteredTweet.replace(regex, (match) =>
        "*".repeat(match.length)
      );
    });
    return [filterCount, filteredTweet];
  };

  const handleTweetChange = (e) => {
    setTweet(e.target.value);
  };

  const handleSubmitTweet = (e) => {
    e.preventDefault();
    const filterResult = filterTweet(tweet);
    const filteredContent = filterResult[1];
    let tabooWordCount = filterResult[0];

    if (tabooWordCount >= 3) {
      console.log("Tweet blocked due to excessive taboo words.");
      // Optionally show a warning to the user
      alert(
        "Your message contains three or more taboo words. Please review your message."
      );
    } else {
      try {
        axios
          .post(postAPI, { content: filteredContent, userId, userName })
          .then((res) => {
            const data = res.data;
            if (data.status != "SUCCESS") throw new Error("error");
            const newPost = data.data;
            updatePosts([newPost, ...posts]);
            setTwitter("");
            //parent.location.reload();
          });
      } catch (error) {
        console.error("Error when posting a tweet", error);
      }
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
