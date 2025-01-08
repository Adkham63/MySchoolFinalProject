import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function registerUser(ev) {
    ev.preventDefault();

    // Reset error message if any
    setError(null);

    // Basic validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });
      toast.success("Registration successful. Now you can log in."); // Success notification
    } catch (e) {
      toast.error("Registration failed. Please try again later."); // Error notification
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      {" "}
      {/* Center content */}
      <div className="mb-16">
        {" "}
        {/* Add bottom margin */}
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            disabled={loading}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            disabled={loading}
          />
          <button className="primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer /> {/* Add Toast notification container */}
    </div>
  );
}
