import React, { useEffect, useState } from "react";
import axios from "axios";
import TwitterBox from "./TwitterBox";
import { usePost } from "../contexts/PostContext";
import TwitterTrendyPost from "./TwitterTrendyPost";

const TwitterList = () => {
  const { posts, updatePosts } = usePost();
  return (
    <div className="flex flex-col gap-y-1">
      <TwitterTrendyPost trendyPosts = {posts.sort(
                (a, b) =>
                  (b.likes.length + b.rewardLikes) -
                  b.dislikes.length -
                  ((a.likes.length + a.rewardLikes) - a.dislikes.length)
              )}/>
      {posts?.map((post) => (
        <div key={post._id}>
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

export default TwitterList;
