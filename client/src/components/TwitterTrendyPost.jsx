import React, { useEffect, useState } from "react";
import axios from "axios";
import TwitterBox from "./TwitterBox";
import { usePost } from "../contexts/PostContext";

const TwitterTrendyPost = (props) => {

  return (
    <div className="flex flex-col gap-y-1">
      {props.trendyPosts?.map((post) => (
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
            Trendy
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
            rewardLikes = {post.rewardLikes}
          />
        </div>
      ))}
    </div>
  );
};

export default TwitterTrendyPost;
