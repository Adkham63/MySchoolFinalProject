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
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border border-indigo-100 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-4xl font-bold text-indigo-800 mb-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        Talabalar Fikri
      </h2>

      <textarea
        className="w-full p-4 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 mb-6 placeholder-indigo-300 resize-none transition-all duration-200"
        placeholder="Share your thoughts..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="4"
      />

      <button
        onClick={handleAddComment}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5 font-semibold flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          />
        </svg>
        Fikr qoldirish
      </button>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-indigo-700 mb-6 border-b-2 border-indigo-100 pb-3">
          Hamjamiyatning fikr-mulohazalari ({comments.length})
        </h3>
        {comments.length > 0 ? (
          <ul className="space-y-6">
            {comments.map((cmt) => (
              <li
                key={cmt._id}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  {cmt.text}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => handleLike(cmt._id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        cmt.likes > 0 ? "text-red-500" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">{cmt.likes || 0}</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-indigo-300 text-lg font-medium">
              🌟 Tajribangizni birinchi bo'lib baham ko'ring!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
