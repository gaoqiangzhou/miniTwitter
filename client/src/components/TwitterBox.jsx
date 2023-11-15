import React from 'react';
import { FaHeart, FaCommentAlt, FaMoneyBillWaveAlt } from 'react-icons/fa';

const TwitterBox = (props) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-start">
        <div>
          <span className="text-blue-600">{props.displayName}</span>
        </div>
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
