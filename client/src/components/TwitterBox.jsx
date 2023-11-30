import React, { useState, useEffect } from "react";
import { FaCommentAlt, FaMoneyBillWaveAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useAuth } from "../contexts/AuthContext";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import axios from "axios";
import { FcLikePlaceholder } from "react-icons/fc";
import { RiDislikeFill, RiDislikeLine } from "react-icons/ri";

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
  const [isDisliked, setIsDisliked] = useState(
    props.initialDislikes.some((dislike) => dislike.user === userId)
  );
  const [isLiked, setIsLiked] = useState(
    likes.some((like) => like.user === userId)
  );
  useEffect(() => {
    // 在每次 likes 更新后，获取最新的 likes.length
    const likesCount = likes.length;
    console.log("Updated Likes Count:", likesCount);
  }, [likes]);

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
        const newLike = res.data.data;

        // Check if the user has already liked the post
        const userAlreadyLiked = likes.some((like) => like.user === userId);

        // Update the state based on the actual data returned from the server
        if (!userAlreadyLiked) {
          setLikes((prevLikes) => [...prevLikes, newLike]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handledislike = () => {
    axios
      .post(DISLIKAPI, { user: userId })
      .then((res) => {
        console.log(res);
        const newDislike = res.data.data;

        // Check if the user has already disliked the post
        const userAlreadyDisliked = dislikes.some(
          (dislike) => dislike.user === userId
        );

        // Update the state based on the actual data returned from the server
        if (!userAlreadyDisliked) {
          setDisLikes((prevDislikes) => [...prevDislikes, newDislike]);
        }
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
        console.log("New Likes:", likes);

        // Update the state based on the actual data returned from the server
        setLikes((prevLikes) =>
          prevLikes.filter((like) => like._id !== deletedLike._id)
        );
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
        const removedDislike = res.data.data;
        console.log("Removed Dislike:", removedDislike);

        // Update the state based on the actual data returned from the server
        setDisLikes((prevDislikes) =>
          prevDislikes.filter((dislike) => dislike._id !== removedDislike._id)
        );
      })
      .catch((err) => {
        console.log(err);
        // Handle error, show a message, etc.
      });
  };
  const handleLikeToggle = () => {
    if (isLiked) {
      handleUnlike();
    } else {
      handlelike();
    }
    setIsLiked(!isLiked);
  };

  const handleDislikeToggle = () => {
    if (isDisliked) {
      handleUndislike();
    } else {
      handledislike();
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
        {userId !== props.userId && (
          <>
            <button
              onClick={handleLikeToggle}
              className="mr-2 text-blue-500 hover:text-blue-700"
            >
              {isLiked ? (
                <FcLike /> // Unlike icon when the post is liked
              ) : (
                <FcLikePlaceholder /> // Like icon when the post is not liked
              )}
              {isLiked ? " Like" : " Unlike"}
            </button>
            <span className="badge">{likes.length}</span>
          </>
        )}

        {userId !== props.userId && (
          <>
            <button
              onClick={handleDislikeToggle}
              className="mr-2 text-red-500 hover:text-red-700"
            >
              {isDisliked ? (
                <RiDislikeFill /> // Remove dislike icon when the post is disliked
              ) : (
                <RiDislikeLine /> // Add dislike icon when the post is not disliked
              )}
              {isDisliked ? " Dislike" : " Undislike"}
            </button>
            <span className="badge">{dislikes.length}</span>
          </>
        )}

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
