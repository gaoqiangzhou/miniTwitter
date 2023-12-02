import React, { useState, useEffect } from "react";
import { FaHeart, FaCommentAlt, FaMoneyBillWaveAlt } from "react-icons/fa";
import { CiRead } from "react-icons/ci";
import { FcLike, FcDislike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { usePost} from "../contexts/PostContext"
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import axios from "axios";
import CommentList from "./commentlist";

//if user id == postuser id -> nothing
const TwitterBox = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [showTips, setshowtips] = useState(false);
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");
  const [newTip, setNewTip] = useState(0);
  const { user, updateUser } = useAuth();
  const { like, dislike} = usePost();
  const userId = user?._id;
  const SUBAPI = "http://localhost:3000/subscribe";
  const LIKAPI = `http://localhost:3000/post/${props.postId}/like`;
  const DISLIKAPI = `http://localhost:3000/post/${props.postId}/dislike`;
  const READ_API = `http://localhost:3000/post/${props.postId}/reads`;
  const [comments, setcomments] = useState(props.initcomments || []);

  const [likes, setLikes] = useState(props.initialLikes || []);
  const [dislikes, setDisLikes] = useState(props.initialDislikes || []);
  const [reads, setReads] = useState(props.initReads);

  const addReads = () => {
    //will be called when a user comment, like, dislike
    axios.post(READ_API, {userId: user._id})
    .then((res) => {
      if(reads.reduce(
        (acc, cur) => acc && (cur != user._id),
        true
      )) setReads([...reads, user._id])
    })
    .catch(err => console.log(err))
  }

  const subscribe = () => {
    axios
      .post(SUBAPI, { followId: props.userId, followerId: userId })
      .then((res) => {
        if (res.data.status === "FAILED") throw new Error(res.data.message);
        //update user state and localstorage after succefully sub
        const newUserState = {
          ...user,
          following: [
            ...user.following,
            { _id: props.userId, name: props.displayName },
          ],
        };
        localStorage.setItem("user", JSON.stringify(newUserState));
        updateUser(newUserState);
      })
      .catch((err) => console.log(err));
      addReads();
  };
  const unSubscribe = () => {
    axios
      .put(SUBAPI, { followId: props.userId, followerId: userId })
      .then((res) => {
        if (res.data.status === "FAILED") throw new Error(res.data.message);
        //update user state and localstorage after succefully unsub
        const newUserState = {
          ...user,
          following: user.following.filter((e) => e._id !== props.userId),
        };
        localStorage.setItem("user", JSON.stringify(newUserState));
        updateUser(newUserState);
      })
      .catch((err) => console.log(err));
      addReads();
  };

  const handleCommentChange = (e) => {
    addReads();
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    //update the comment to DB
    const API_URL = `http://localhost:3000/post/${props.postId}/comments`;

    axios
      .post(API_URL, { content: newComment, user: userId })
      .then((resp) => {
        // if (resp.data.status === "FAILED") throw new Error(resp.data.message);

        console.log(resp);
        setNewComment("");
        parent.location.reload(); // refresh the page
      })
      .catch((err) => {
        console.log("erro when post a comment");
      });
  };
  const toProfile = () => {
    addReads();
    navigate("/profile/" + props.userId);
  };
  const handleDeleteComment = (commentId) => {
    // Make a DELETE request to your API endpoint
    const DELETE_COMMENT_API = `http://localhost:3000/post/${props.postId}/comments/${commentId}`;
    axios
      .delete(DELETE_COMMENT_API)
      .then((response) => {
        console.log(response.data.message);
        parent.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };
  const handletipsChange = (e) => {
    setNewTip(e.target.value);
  };

  const handleTipSubmit = (e) => {
    addReads();
    e.preventDefault();
    //update the comment to DB
    const parsedTipAmount = parseFloat(newTip);
    const API_URL = `http://localhost:3000/user/send-tip`;

    axios
      .put(API_URL, {
        senderId: userId,
        receiverId: props.userId,
        tipAmount: parsedTipAmount,
      })
      .then((resp) => {
        // if (resp.data.status === "FAILED") throw new Error(resp.data.message);

        console.log(resp);
        setNewTip(0);
        parent.location.reload(); // refresh the page
      })
      .catch((err) => {
        console.log("erro when send a tips");
      });
  };
  return (
    <div
      className="bg-white rounded-lg shadow p-4 mb-4"
      postid={props.postId}
      userid={props.userId}
    >
      <div className="flex items-start">
        <span onClick={toProfile} className="text-blue-600 cursor-pointer">
          {props.displayName}
        </span>
        {!user ? (
          <button
            onClick={subscribe}
            className="mr-2 text-blue-500 hover:text-blue-700"
          >
            <SlUserFollow />
          </button>
        ) : (
          userId !== props.userId &&
          (user.following.reduce(
            (acc, cur) => acc || cur._id === props.userId,
            false
          ) ? (
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
        <button
          onClick={() => like(user._id, props.postId)}
          className={"mr-2 text-blue-500 hover:text-blue-700"}
        >
          <FcLike /> Like <span className="badge">{props.initialLikes.length}</span>
        </button>
        <button
          onClick={() => dislike(user._id, props.postId)}
          className={"mr-2 text-blue-500 hover:text-blue-700"}
        >
          <FcDislike /> Dislike <span className="badge">{props.initialDislikes.length}</span>
        </button>
        <button
          onClick={() => {setShowComments(!showComments); addReads();}}
          className="mr-2 text-blue-500 hover:text-blue-700 "
        >
          <FaCommentAlt /> Comment({comments.length})
        </button>

        {showComments && (
          <div>
            <div className="mt-4">
              <CommentList
                postId={props.postId}
                userId={userId}
                onDeleteComment={handleDeleteComment}
              />
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

        <button
          onClick={() => setshowtips(!showTips)}
          className="mr-2 text-blue-500 hover:text-blue-700 "
        >
          <FaMoneyBillWaveAlt /> Tip
        </button>
        {showTips && (
          <div>
            <div className="mt-4"></div>
            <form onSubmit={handleTipSubmit}>
              <input
                type="number"
                step="any"
                value={newTip}
                onChange={handletipsChange}
                placeholder="Add a amount"
                className="border border-gray-300"
              />
              <button type="submit">send</button>
            </form>
          </div>
        )}
        <div
          className="mr-2 text-blue-500 hover:text-blue-700 "
        >
          <CiRead  /> Reads({reads?.length})
        </div>
      </div>
    </div>
  );
};

export default TwitterBox;
