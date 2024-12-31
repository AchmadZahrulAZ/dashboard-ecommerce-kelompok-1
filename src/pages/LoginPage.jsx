import React from "react";
import LoginComponent from "../components/Auth/LoginComponent";
import SignUpComponent from "../components/Auth/SignUpComponent";
import ForgotPasswordComponent from "../components/Auth/ForgotPasswordComponent";
import InputOTP from "../components/Auth/InputOTP";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const LoginPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
        <Route path="/input-otp" element={<InputOTP />} />
      </Routes>
    </Router>
  );
};

export default LoginPage;
