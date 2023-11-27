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
router.delete("/:postId/like/:likeId", async (req, res) => {
  const postId = req.params.postId;
  const likeId = req.params.likeId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Post not found" });
    }

    // Find the index of the like in the likes array
    const likeIndex = post.likes.findIndex(
      (like) => like._id.toString() === likeId
    );

    // Check if the like exists
    if (likeIndex === -1) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Like not found" });
    }

    // Remove the like from the array
    post.likes.splice(likeIndex, 1);

    await post.save();
    res.json({
      status: "SUCCESS",
      message: "Like deleted successfully",
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
router.delete("/:postId/dislike/:dislikeId", async (req, res) => {
  const postId = req.params.postId;
  const dislikeId = req.params.dislikeId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "Post not found" });
    }

    // Find the index of the like in the likes array
    const dislikeIndex = post.dislikes.findIndex(
      (dislike) => dislike._id.toString() === dislikeId
    );

    // Check if the like exists
    if (dislikeIndex === -1) {
      return res
        .status(404)
        .json({ status: "FAILED", message: "disLike not found" });
    }

    // Remove the like from the array
    post.dislikes.splice(dislikeIndex, 1);

    await post.save();
    res.json({
      status: "SUCCESS",
      message: "disLike deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      message: "Error occurred while deleting the like",
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
