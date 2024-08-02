import { useState, React } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggingIn } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const googleAuth = () => {
    window.open("http://localhost:5001/api/v1/auth/google", "_self");
  };

  const githubAuth = () => {
    window.open("http://localhost:5001/api/v1/auth/github", "_self");
  };

  return (
    <>
      <div className="h-screen w-full hero-bg">
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to={"/"}>
            <img className="w-52" src="./netflix-logo.png" alt="logo" />
          </Link>
        </header>

        <div className="flex justify-center items-center mt-29 mx-3">
          <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
            <h1 className="text-center text-white text-2xl font-bold mb-4">
              Login
            </h1>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="johndoe@gmail.com"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 block"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                  placeholder="••••••••"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={googleAuth}
              >
                <FcGoogle size={30} />
              </div>
              <div
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={githubAuth}
              >
                <FaGithub size={30} />
              </div>
            </div>
            <div className="text-center text-gray-400">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-red-500 hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
