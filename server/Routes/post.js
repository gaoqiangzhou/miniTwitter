const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const Post = require("../Models/post");
const User = require("../Models/user");

// Create a new post
router.post("/", async (req, res) => {
  const { content, user: userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "User not found" });
    }

    const newPost = new Post({
      content,
      user: userId,
    });

    await newPost.save();
    res.json({
      status: "SUCCESS",
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Error occurred while creating the post",
      error: error.message,
    });
  }
});

// Add a comment to a post
router.post("/:postId/comments", async (req, res) => {
  const { content, user: userId } = req.body;
  const postId = req.params.postId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "User not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Post not found" });
    }

    const newComment = {
      user: userId,
      content,
    };

    post.commlients.push(newComment);
    await post.save();
    res.json({
      status: "SUCCESS",
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Error occurred while adding the comment",
      error: error.message,
    });
  }
});

// Handle liking a post
router.post("/:postId/like", async (req, res) => {
  const { user: userId } = req.body;
  const postId = req.params.postId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "User not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Post not found" });
    }

    const newlike = {
      user: userId,
    };

    post.likes.push(newlike);
    await post.save();
    res.json({
      status: "SUCCESS",
      message: "likes added successfully",
      data: newlike,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Error occurred while adding the comment",
      error: error.message,
    });
  }
});

// Handle disliking a post
router.post("/:postId/dislike", async (req, res) => {
  const { user: userId } = req.body;
  const postId = req.params.postId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "User not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Post not found" });
    }

    const newdislike = {
      user: userId,
    };

    post.dislikes.push(newdislike);
    await post.save();
    res.json({
      status: "SUCCESS",
      message: "dislikes added successfully",
      data: newdislike,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Error occurred while adding the dislike",
      error: error.message,
    });
  }
});
// Handle liking a post
router.post("/:postId/like", async (req, res) => {
  const { user: userId } = req.body;
  const postId = req.params.postId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "User not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Post not found" });
    }

    const newlike = {
      user: userId,
    };

    post.likes.push(newlike);
    await post.save();
    res.json({
      status: "SUCCESS",
      message: "likes added successfully",
      data: newlike,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Error occurred while adding the like",
      error: error.message,
    });
  }
});
// Handle tips a post
router.post("/:postId/tips", async (req, res) => {
  const { user: userId, amount } = req.body;
  const postId = req.params.postId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "User not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Post not found" });
    }

    const newtips = {
      user: userId,
      amount,
    };

    post.tips.push(newtips);
    await post.save();
    res.json({
      status: "SUCCESS",
      message: "tips added successfully",
      data: newtips,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Error occurred while adding the tips",
      error: error.message,
    });
  }
});
//// Handle complain a post
router.post("/:postId/complain", async (req, res) => {
  const { user: userId, reason } = req.body;
  const postId = req.params.postId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "User not found" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Post not found" });
    }

    const newcomplain = {
      user: userId,
      reason,
    };

    post.complaints.push(newcomplain);
    await post.save();
    res.json({
      status: "SUCCESS",
      message: "complain added successfully",
      data: newcomplain,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Error occurred while adding the complain",
      error: error.message,
    });
  }
});

// Add more routes for tipping, complaining, following, and subscribing as needed

module.exports = router;
