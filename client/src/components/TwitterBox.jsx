import React, { useState , useEffect} from "react";
import {
  FaCommentAlt,
  FaMoneyBillWaveAlt,
  
} from "react-icons/fa";
import {FcLike, FcDislike} from "react-icons/fc"
import { useAuth } from "../contexts/AuthContext";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import axios from "axios";
import { FcLikePlaceholder } from "react-icons/fc";

//if user id == postuser id -> nothing
const TwitterBox = (props) => {
  const { user, updateUser } = useAuth();
  const userId = user?._id;
  const SUBAPI = "http://localhost:3000/subscribe";
  const LIKAPI = `http://localhost:3000/post/${props.postId}/like`;
  const DISLIKAPI = `http://localhost:3000/post/${props.postId}/dislike`;
  const DELETELIKAPI = `http://localhost:3000/post`;

  

  const [likes, setLikes] = useState(props.initialLikes || []);
  const [dislikes, setDisLikes] = useState(props.initialDislikes || []);
  const [isDisliked, setIsDisliked] = useState(props.initialDislikes.some((dislike) => dislike.user === userId));
  const [isLiked, setIsLiked] = useState(likes.some((like) => like.user === userId));

  

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

  const handlelike = () => {
    axios
      .post(LIKAPI, { user: userId })
      .then((res) => {
        console.log(res);
        setLikes([...likes, userId]);
      })
      .catch((err) => console.log(err));
  };

  const handledislike = () => {
    axios
      .post(DISLIKAPI, { user: userId })
      .then((res) => {
        console.log(res);
        setDisLikes([...dislikes, userId]);
        setIsDisliked(true);
      })
      .catch((err) => console.log(err));
  };
  const handleUnlike = () => {
    axios
      .delete(`${DELETELIKAPI}/${props.postId}/like/${userId}`)
      .then((res) => {
        console.log(res);
        // Assuming the response contains data about the deleted like
        const deletedLike = res.data.data;
  
        // Update the state to remove the unliked user from the likes array
        const updatedLikes = likes.filter((like) => like._id !== deletedLike._id);
        setLikes(updatedLikes);
      })
      .catch((err) => {
        console.log(err);
        // Handle error, show a message, etc.
      });
  };

  const handleUndislike = () => {
    axios
      .delete(`${DELETELIKAPI}/${props.postId}/dislike/${userId}`)
      .then((res) => {
        console.log(res);
        // Assuming the response contains data about the deleted like
        const deletedDisLike = res.data.data;
  
        // Update the state to remove the unliked user from the likes array
        const updatedDisLikes = dislikes.filter((dislike) => dislike._id !== deletedDisLike._id);
        setLikes(updatedDisLikes);
      })
      .catch((err) => {
        console.log(err);
        // Handle error, show a message, etc.
      });
  };
  const handleLikeToggle = () => {
    if (isLiked) {
      handleUnlike(); // 执行取消点赞的逻辑
    } else {
      handlelike(); // 执行点赞的逻辑
    }
    setIsLiked(!isLiked); // 切换 isLiked 的值
  };
  const handleDislikeToggle = () => {
    if (isDisliked) {
      handleUndislike(); // 执行取消踩的逻辑
    } else {
      handledislike(); // 执行踩的逻辑
    }
    setIsDisliked(!isDisliked);
  };

  

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
        <button
          onClick={handleLikeToggle}
          className={"mr-2 text-blue-500 hover:text-blue-700"}
        >
          {isLiked ? (
            <>
              <FcDislike /> Unlike{" "}
            </>
          ) : (
            <>
              <FcLikePlaceholder /> Like{" "}
            </>
          )}
          
        </button>
        <button
          onClick={handleDislikeToggle}
          className={"mr-2 text-blue-500 hover:text-blue-700"}
        >
          {isDisliked ? <FcLikePlaceholder /> : <FcDislike />}{" "}
          {isDisliked ? "Dislike" : "Undislike"}{" "}
          
        </button>
        <button className="mr-2 text-blue-500 hover:text-blue-700">
          <FaCommentAlt /> comment
        </button>
        <button className="text-blue-500 hover:text-blue-700">
          <FaMoneyBillWaveAlt /> Tip
        </button>
      </div>
    </div>
  );
};

export default TwitterBox;
