import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // Fetch comments from the backend
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/comments")
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Failed to fetch comments:", error));
  }, []);

  // Add a new comment
  const handleAddComment = () => {
    if (comment.trim()) {
      axios
        .post("http://localhost:4000/api/comments", { text: comment })
        .then((response) => {
          setComments((prev) => [...prev, response.data]);
          setComment(""); // Clear the input field
        })
        .catch((error) => console.error("Failed to save comment:", error));
    }
  };

  // Handle like button click
  const handleLike = (commentId) => {
    axios
      .post(`http://localhost:4000/api/comments/${commentId}/like`)
      .then((response) => {
        setComments((prevComments) =>
          prevComments.map((cmt) =>
            cmt._id === commentId ? { ...cmt, likes: response.data.likes } : cmt
          )
        );
      })
      .catch((error) => console.error("Failed to like comment:", error));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-800 mb-5">
        Leave Your Feedback
      </h2>

      <textarea
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-5"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={handleAddComment}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Comments:</h3>
        {comments.length > 0 ? (
          <ul className="space-y-5">
            {comments.map((cmt) => (
              <li
                key={cmt._id}
                className="p-5 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition-all"
              >
                <p className="text-gray-700">{cmt.text}</p>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => handleLike(cmt._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Like
                  </button>
                  <span className="text-sm text-gray-500">
                    {cmt.likes || 0} Likes
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
