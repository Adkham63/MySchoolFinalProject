// ForumPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "General",
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data } = await axios.get("/api/forum");
    setPosts(data);
  };

  const createPost = async (e) => {
    e.preventDefault();
    await axios.post("/api/forum", newPost);
    setNewPost({ title: "", content: "", category: "General" });
    loadPosts();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Community Forum</h1>

      {/* Create Post Form */}
      <form
        onSubmit={createPost}
        className="bg-white p-4 rounded-lg shadow-md mb-8"
      >
        <input
          type="text"
          placeholder="Message header"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          placeholder="What do you want to discuss?"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="w-full mb-2 p-2 border rounded h-32"
          required
        />
        <select
          value={newPost.category}
          onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
          className="mb-2 p-2 border rounded"
        >
          <option value="General">General</option>
          <option value="Lessons">Lessons</option>
          <option value="Resources">Sources</option>
          <option value="Q&A">Q&A</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-3"
        >
          Create A Post
        </button>
      </form>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                {post.category}
              </span>
              <span className="text-gray-600 text-sm">
                Posted by {post.author.name}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              <Link to={`/forum/${post._id}`} className="hover:text-blue-500">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{post.replies.length} answers</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
