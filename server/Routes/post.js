const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const Post = require("../Models/post");
const User = require("../Models/user");

// Create a new post
router.post("/", async (req, res) => {
  const { content, userId, userName } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "User not found" });
    }

    const newPost = new Post({
      content,
      userId,
      userName,
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
//get all posts
router.get("/", async(req, res) =>{
  Post.find({}).then((posts) => {
    res.send(posts);
  }).catch(err => {
    res.json({
      status: "FAILED",
      message: "Failed to get all posts"
  })
  })
})

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

    post.comments.push(newComment);
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
      message: "Error occurred while adding the likes",
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
// delect like
router.delete("/:postId/like/:userId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Post not found" });
    }

    const like = post.likes.find((like) => like.user.toString() === userId);
    if (!like) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Like not found" });
    }

    post.likes.pull(like);
    await post.save();

    res.json({
      status: "SUCCESS",
      message: "Like deleted successfully",
      data: like,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Error occurred while deleting the like",
      error: error.message,
    });
  }
});


// delect dislike
router.delete("/:postId/dislike/:userId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Post not found" });
    }

    const dislike = post.dislikes.find((dislike) => dislike.user.toString() === userId);
    if (!dislike) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Dislike not found" });
    }

    post.dislikes.pull(dislike);
    await post.save();

    res.json({
      status: "SUCCESS",
      message: "Dislike deleted successfully",
      data: dislike,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Error occurred while deleting the dislike",
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

module.exports = router;
