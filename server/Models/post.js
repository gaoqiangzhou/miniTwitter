const mongoose = require("mongoose");


const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model for the user who posted the message
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model for the user who commented
          required: true,
        },
        username: {
          type: String,
          required: true,
        },

        content: {
          type: String,
          required: true,
        },
      },
    ],
    complaints:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint"
      }
    ],
    tips: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model for the user who tipped
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model for the user who liked
          required: true,
        },
      },
    ],
    dislikes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User model for the user who disliked
          required: true,
        },
      },
    ],
    reads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model for the user who reads
        required: true,
      }
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
