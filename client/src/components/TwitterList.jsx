import React, { useEffect, useState } from "react";
import axios from "axios";
import TwitterBox from "./TwitterBox";

const TwitterList = () => {
  const postAPI = "http://localhost:3000/post";
  const [posts, setPosts] = useState([]);
  //get all posts
  useEffect(() => {
    axios
      .get(postAPI)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log("failed to get all posts");
      });
  }, []);
  return (
    <div className="flex flex-col gap-y-1">
        
      {posts.map((post) => 
      <div key = {post._id}>
        <TwitterBox 
        displayName={post.userName} 
        content={post.content} 
        postId={post._id}
        userId={post.userId}
        initialLikes={post.likes}
        initialDislikes={post.dislikes}
        initcomments={post.comments}
        />
        </div>
      )}
    </div>
  );
};

export default TwitterList;
