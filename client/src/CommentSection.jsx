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
          setComments((prev) => [...prev, response.data]); // Update comment list
          setComment(""); // Clear the input field
        })
        .catch((error) => console.error("Failed to save comment:", error));
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Leave Your Feedback</h2>
      <textarea
        className="w-full border rounded p-2 mb-4"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleAddComment}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Comments:</h3>
        {comments.length > 0 ? (
          <ul className="list-disc pl-5">
            {comments.map((cmt) => (
              <li key={cmt._id} className="mb-2">
                {cmt.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
