import React, { useEffect, useState } from "react";
import axios from "axios";
import TwitterBox from "./TwitterBox";
import { usePost } from "../contexts/PostContext";

const TwitterTrendyPost = () => {
  const { posts, updatePosts } = usePost();
  const [trendyPosts, setTrendyPosts] = useState([]);

  useEffect(() => {
    const postAPI = "http://localhost:3000/trendy";
    axios.get(postAPI).then((res) => {
      const sortedPosts = res.data.data.sort(
        (a, b) => b.likes.length - a.likes.length
      );
      setTrendyPosts(sortedPosts.slice(0, 3));
    });
  }, []);

  return (
    <div className="flex flex-col gap-y-1">
      {trendyPosts?.map((post) => (
        <div
          key={post._id}
          style={{
            border: "2px solid red",
            borderRadius: "10px",
            padding: "0rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow
          }}
        >
          <div
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            Trendy Twitter
          </div>
          <TwitterBox
            displayName={post.userName}
            content={post.content}
            postId={post._id}
            userId={post.userId}
            initialLikes={post.likes}
            initialDislikes={post.dislikes}
            initcomments={post.comments}
            initReads={post.reads}
            complaints={post.complaints}
          />
        </div>
      ))}
    </div>
  );
};

export default TwitterTrendyPost;
