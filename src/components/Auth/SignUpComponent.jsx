import React, { useState } from 'react';
import EyeIcon from '../../assets/icons/auth/Eye.svg';
import HiddenEyeIcon from '../../assets/icons/auth/HiddenEye.svg';
import AuthPhoto from '../../assets/images/auth/AuthPhoto.png';
import { useNavigate } from 'react-router-dom';

const SignUpComponent = () => {
  const navigate = useNavigate(); // Uncomment if using react-router
  const [showPassword, setShowPassword] = useState(false);

  // Local state for form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle Sign Up
  const handleSignUp = () => {
    // Simple validation
    if (!fullName || !email || !password) {
      alert('Please fill all fields!');
      return;
    }

    // Store user data in localStorage
    const userData = { fullName, email, password };
    localStorage.setItem('dummyUser', JSON.stringify(userData));
    alert('Account created! You can now login.');

    // Navigate to login page or do something else
    navigate('/login');
  };

  return (
    <div
      className="flex items-center justify-center bg-white rounded-[30px]"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* Left Section: Sign-Up Form */}
      <div className="w-[50vw] flex justify-center items-center">
        <div className="flex flex-col space-y-4">
          {/* Title & Description */}
          <h1 className="text-black font-lato font-bold text-2xl">Sign up</h1>
          <p className="text-[#89868D] font-lato font-normal">
            Start your 30-day free trial
          </p>

          {/* Full Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-[330px] h-[46px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-[8px] px-4"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          {/* Email Address Input */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-[330px] h-[46px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-[8px] px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <div className="relative w-[330px] h-[46px]">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full h-full bg-[#F4F5F9] border border-[#DBDCDE] rounded-[8px] px-4 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? EyeIcon : HiddenEyeIcon}
              alt="Toggle Password Visibility"
              className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer"
              style={{ width: '18px', height: '14.4px' }}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Button */}
          <button
            className="w-[330px] h-[46px] bg-[#DB4444] text-white rounded-[8px] font-lato font-bold"
            onClick={handleSignUp}
          >
            Get Started
          </button>

          {/* Sign-in Link */}
          <div className="flex items-center">
            <p className="text-[#89868D] font-lato">Already a member?</p>
            <a
              href="/login"
              className="text-[#DB4444] font-lato ml-2 underline"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>

      {/* Right Section: Auth Photo */}
      <div
        className="w-[50vw] flex items-center"
        style={{
          justifyContent: 'flex-start',
          paddingLeft: '30px', // Adds some padding to the left for spacing
        }}
      >
        <img
          src={AuthPhoto}
          alt="Sign Up Visual"
          className="rounded-[15px] py-4"
          style={{ width: '619px', height: '784px' }}
        />
      </div>
    </div>
  );
};

export default SignUpComponent;
