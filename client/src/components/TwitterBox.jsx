import React, { useState , useEffect} from "react";
import {
  FaCommentAlt,
  FaMoneyBillWaveAlt,
  
} from "react-icons/fa";
import {FcLike, FcDislike} from "react-icons/fc"
import { useAuth } from "../contexts/AuthContext";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import axios from "axios";

//if user id == postuser id -> nothing
const TwitterBox = (props) => {
  const { user, updateUser } = useAuth();
  const userId = user?._id;
  const SUBAPI = "http://localhost:3000/subscribe";
  const LIKAPI = `http://localhost:3000/post/${props.postId}/like`;
  const DISLIKAPI = `http://localhost:3000/post/${props.postId}/dislike`;

  

  const [likes, setLikes] = useState([]);
  const [dislikes, setDisLikes] = useState([]);

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
      })
      .catch((err) => console.log(err));
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
          onClick={handlelike}
          className={"mr-2 text-blue-500 hover:text-blue-700"}
        >
          <FcLike /> Like <span className="badge">{likes.length}</span>
        </button>
        <button
          onClick={handledislike}
          className={"mr-2 text-blue-500 hover:text-blue-700"}
        >
          <FcDislike /> Dislike <span className="badge">{dislikes.length}</span>
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
