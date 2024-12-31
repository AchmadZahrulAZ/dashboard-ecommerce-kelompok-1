import React, { useState } from "react";
import AuthPhoto from "../../assets/images/auth/AuthPhoto.png";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to generate a random token
  const generateRandomToken = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 32; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  };

  // Handle Sign In
  const handleSignIn = () => {
    // Retrieve user data from localStorage
    const savedUser = localStorage.getItem("dummyUser");
    if (!savedUser) {
      alert("No user found. Please sign up first.");
      return;
    }

    const { email: savedEmail, password: savedPassword } =
      JSON.parse(savedUser);

    // Check credentials
    if (email === savedEmail && password === savedPassword) {
      // Generate a random token
      const token = generateRandomToken();

      // Store the token in localStorage
      localStorage.setItem("token", token);

      alert("Login successful!");
      window.location.href = "/dashboard";
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-white rounded-[30px]"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* Left Section: Login Form */}
      <div className="w-[50vw] flex justify-center items-center">
        <div className="flex flex-col space-y-4">
          {/* Title & Description */}
          <h1 className="text-2xl font-bold text-black font-lato">Login</h1>
          <p className="text-[#89868D] font-lato font-normal">
            How do I get started lorem ipsum dolor at?
          </p>

          {/* Email Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-[#030406] font-lato font-normal">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-[330px] h-[46px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-[8px] px-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-[#030406] font-lato font-normal">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-[330px] h-[46px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-[8px] px-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a href="/forgot-password" className="text-[#DB4444] font-lato">
              Forgot password
            </a>
          </div>

          {/* Button */}
          <button
            className="w-[330px] h-[46px] bg-[#DB4444] text-white rounded-[8px] font-lato font-bold"
            onClick={handleSignIn}
          >
            Sign in
          </button>

          {/* Sign-Up Link */}
          <div className="flex items-center justify-center space-x-1">
            <p className="text-[#89868D] font-lato">Don’t have an account?</p>
            <a href="/signup" className="text-[#DB4444] font-lato underline">
              Sign up
            </a>
          </div>
        </div>
      </div>

      {/* Right Section: Auth Photo */}
      <div
        className="w-[50vw] flex items-center"
        style={{
          justifyContent: "flex-start",
          paddingLeft: "30px",
        }}
      >
        <img
          src={AuthPhoto}
          alt="Auth Visual"
          className="rounded-[15px] py-4"
          style={{ width: "619px", height: "784px" }}
        />
      </div>
    </div>
  );
};

export default LoginComponent;
