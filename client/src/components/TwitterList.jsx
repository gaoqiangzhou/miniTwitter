import React from "react";
import TwitterBox from "./TwitterBox";
import { usePost } from "../contexts/PostContext";
import TwitterTrendyPost from "./TwitterTrendyPost";

const TwitterList = () => {
  const { posts, updatePosts } = usePost();

  // Sort posts by the specified criterion
  const sortedPosts = posts.sort(
    (a, b) =>
      b.likes.length +
      b.rewardLikes -
      b.dislikes.length -
      (a.likes.length + a.rewardLikes - a.dislikes.length)
  );
  // Get the top 3 posts as trendy posts
  const trendyPosts = sortedPosts.slice(0, 3);

  return (
    <div className="flex flex-col gap-y-1">
      <TwitterTrendyPost trendyPosts={trendyPosts} />
      {/* Render the remaining posts (excluding the trendy posts) */}
      {sortedPosts.slice(3).map((post) => (
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
            rewardLikes={post.rewardLikes}
          />
        </div>
      ))}
    </div>
  );
};

export default TwitterList;
