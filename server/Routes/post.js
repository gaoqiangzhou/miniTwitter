const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const Post = require("../Models/post");
const { default: App } = require("../../client/src/App");

// Create a new post
App.post("/post", async (req, res) => {
  try {
    const newpost = await post.create(req.body);
    res.status(200).json(newpost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Message: error.massage });
  }
});
module.exports = router;
