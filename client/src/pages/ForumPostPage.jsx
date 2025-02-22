// ForumPostPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ForumPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    const { data } = await axios.get(`/api/forum/${postId}`);
    setPost(data);
  };

  const addReply = async (e) => {
    e.preventDefault();
    await axios.post(`/api/forum/${postId}/replies`, { content: replyContent });
    setReplyContent("");
    loadPost();
  };

  if (!post) return <div>Yuklanmoqda...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-700 mb-4">{post.content}</p>
        <div className="text-sm text-gray-500">
          {post.author.name} tomonidan •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {post.replies.length} Javoblar
        </h2>

        {/* Reply Form */}
        <form onSubmit={addReply} className="bg-white p-4 rounded-lg shadow-md">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Javobingizni yozing..."
            className="w-full mb-2 p-2 border rounded h-32"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Postga Javob
          </button>
        </form>

        {/* Replies List */}
        {post.replies.map((reply, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-700 mb-2">{reply.content}</p>
            <div className="text-sm text-gray-500">
              {reply.author.name} tomonidan •{" "}
              {new Date(reply.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPostPage;
