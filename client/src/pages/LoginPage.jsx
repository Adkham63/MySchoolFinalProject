import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/api/login", { email, password });
      setUser(data);
      toast.success("Login successful"); // Show success notification
      setTimeout(() => setRedirect(true), 1000); // Delay redirection by 2 seconds
    } catch (e) {
      toast.error("Login failed"); // Show error notification
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="mb-16">
        <h1 className="text-4xl text-center mb-4">Login Page</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer /> {/* Container for toast notifications */}
    </div>
  );
};

export default LoginPage;
