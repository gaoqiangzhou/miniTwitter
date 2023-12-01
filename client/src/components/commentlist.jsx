import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const commentlist = (props) => {
  const [comments, setComments] = useState([]);

  const commentAPI = `http://localhost:3000/post/${props.postId}/comments`;
  useEffect(() => {
    axios
      .get(commentAPI)
      .then((response) => {
        setComments(response.data.data);
      })
      .catch((err) => {
        console.log("Failed to get comments", err);
      });
  }, []);
  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Comments:</h4>
      {comments.map((comment) => (
        <div key={comment._id} className="mb-2">
          <span className="text-blue-600">{comment.username}</span>:{" "}
          {comment.content}
          {props.userId == comment.user && (
            <button
              onClick={() => props.onDeleteComment(comment._id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <MdDelete /> Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default commentlist;
