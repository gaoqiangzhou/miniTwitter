const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

// In-memory storage for posts
let posts = [];

// Get all posts
router.get("/posts", (req, res) => {
  res.json(posts);
});

// Create a new post
router.post("/posts", (req, res) => {
  const { username, content } = req.body;
  if (!username || !content) {
    return res
      .status(400)
      .json({ error: "Username and content are required fields." });
  }

  const newPost = {
    id: posts.length + 1,
    username: username,
    content: content,
    createdAt: new Date(),
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

module.exports = router;
