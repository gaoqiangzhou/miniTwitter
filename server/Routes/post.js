const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const Post = require("../Models/post");

// Create a new post
router.post("/post", (req, res) => {
  const { content } = req.body;

  if (!content) {
    res.json({
      status: "FAILED",
      message: "Content is required for the post.",
    });
  }

  const newPost = new Post({
    content: content,
    // Include other fields as needed (comments, likes, dislikes, etc.)
  });

  newPost
    .save()
    .then((post) => {
      res.json({
        status: "SUCCESS",
        message: "Post created successfully.",
        data: post,
      });
    })
    .catch((error) => {
      res.json({
        status: "FAILED",
        message: "Failed to create post.",
      });
    });
});

// Get all posts
router.get("/post", (req, res) => {
  Post.find()
    .then((posts) => {
      res.json({
        status: "SUCCESS",
        message: "Posts retrieved successfully.",
        data: posts,
      });
    })
    .catch((error) => {
      res.json({
        status: "FAILED",
        message: "Failed to retrieve posts.",
        error: error.message,
      });
    });
});

module.exports = router;
