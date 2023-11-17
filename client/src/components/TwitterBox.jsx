import React from 'react';
import { FaHeart, FaCommentAlt, FaMoneyBillWaveAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";

const TwitterBox = (props) => {
  const {user} = useAuth();
  const userId = user?._id;
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4" postid = {props.postId} userid = {props.userId}>
      <div className="flex items-start">
          <span className="text-blue-600">{props.displayName}</span>
          {(!(userId===props.userId)) && <SlUserFollow/>}
      </div>
      <div className="mt-2">
        {props.content}
      </div>
      <div className="mt-4 flex">
        <button className="mr-2 text-blue-500 hover:text-blue-700">
          <FaHeart /> Like
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
