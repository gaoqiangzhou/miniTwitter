import React, { useEffect, useState } from "react";
import { FaHeart, FaCommentAlt, FaMoneyBillWaveAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import axios from "axios";

//if user id == postuser id -> nothing
const TwitterBox = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user, updateUser } = useAuth();
  const userId = user?._id;
  const SUBAPI = "http://localhost:3000/subscribe";

  const subscribe = () => {
    axios
      .post(SUBAPI, { followId: props.userId, followerId: userId })
      .then((res) => {
        if (res.data.status === "FAILED") throw new Error(res.data.message);
        //update user state and localstorage after succefully sub
        const newUserState = {
          ...user,
          following: [...user.following, props.userId],
        };
        localStorage.setItem("user", JSON.stringify(newUserState));
        updateUser(newUserState);
      })
      .catch((err) => console.log(err));
  };
  const unSubscribe = () => {
    axios
      .put(SUBAPI, { followId: props.userId, followerId: userId })
      .then((res) => {
        if (res.data.status === "FAILED") throw new Error(res.data.message);
        //update user state and localstorage after succefully unsub
        const newUserState = {
          ...user,
          following: user.following.filter((e) => e !== props.userId),
        };
        localStorage.setItem("user", JSON.stringify(newUserState));
        updateUser(newUserState);
      })
      .catch((err) => console.log(err));
  };
  function contains(a, obj) {
    var i = a.length;
    while (i--) {
      if (a[i] === obj) {
        return true;
      }
    }
    return false;
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    //update the comment to DB
    const API_URL = `http://localhost:3000/post/${props.postId}/comments`;
    axios
      .post(API_URL, { content: newComment, user: userId })
      .then((resp) => {
        console.log(resp);
        parent.location.reload(); // refresh the page
      })
      .catch((err) => {
        console.log("erro when post a comment");
      });
  };

  // list the comments
  useEffect(() => {
    if (showComments) {
      const commentAPI = `http://localhost:3000/post/${props.postId}/comments`;

      axios
        .get(commentAPI)
        .then((comments) => {
          setComments(comments.data);
          console.log(comments.data);
        })
        .catch((err) => {
          console.log("Failed to get comments", err);
        });
    }
  }, []); // Dependency array ensures it runs when showComments changes

  return (
    <div
      className="bg-white rounded-lg shadow p-4 mb-4"
      postid={props.postId}
      userid={props.userId}
    >
      <div className="flex items-start">
        <span className="text-blue-600">{props.displayName}</span>
        {!user ? (
          <button
            onClick={subscribe}
            className="mr-2 text-blue-500 hover:text-blue-700"
          >
            <SlUserFollow />
          </button>
        ) : (
          userId !== props.userId &&
          (contains(user.following, props.userId) ? (
            <button
              onClick={unSubscribe}
              className="mr-2 text-blue-500 hover:text-blue-700"
            >
              <SlUserFollowing />
            </button>
          ) : (
            <button
              onClick={subscribe}
              className="mr-2 text-blue-500 hover:text-blue-700"
            >
              <SlUserFollow />
            </button>
          ))
        )}
      </div>
      <div className="mt-2">{props.content}</div>

      <div className="mt-4 flex">
        <button className="mr-2 text-blue-500 hover:text-blue-700">
          <FaHeart /> Like
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="mr-2 text-blue-500 hover:text-blue-700 "
        >
          <FaCommentAlt /> Comment
        </button>

        {showComments && (
          <div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Comments:</h4>
              {comments.map((comment) => (
                <div key={comment._id} className="mb-2">
                  <span className="text-blue-600">{comment.user}</span>:{" "}
                  {comment.content}
                </div>
              ))}
            </div>
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment..."
                className="border border-gray-300"
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}

        <button className="text-blue-500 hover:text-blue-700">
          <FaMoneyBillWaveAlt /> Tip
        </button>
      </div>
    </div>
  );
};

export default TwitterBox;
