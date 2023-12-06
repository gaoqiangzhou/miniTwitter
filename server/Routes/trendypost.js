const express = require("express");
const router = express.Router();
const Post = require("../Models/post");

// Get trendy posts
router.get("/", async (req, res) => {
  try {
    // Fetch all posts
    const posts = await Post.find({}).sort({ createdAt: "desc" });

    // Filter posts that meet the conditions to be "trendy"
    const trendyPosts = posts.filter(
      (post) =>
        post.reads.length > 10 && post.likes.length - post.dislikes.length > 3
    );

    res.json({
      status: "SUCCESS",
      message: "Trendy posts retrieved successfully",
      data: trendyPosts,
    });
  } catch (err) {
    res.json({
      status: "FAILED",
      message: "Failed to get trendy posts",
      error: err.message,
    });
  }
});

module.exports = router;
