import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSendEmail = () => {
    if (!email) {
      alert('Please enter your email!');
      return;
    }

    // Dummy OTP code — you can generate a random 4-digit code if you want
    const dummyOTP = '1234';
    // Store the OTP in localStorage
    localStorage.setItem('dummyOTP', dummyOTP);

    alert(`Reset instructions sent! (Your OTP is ${dummyOTP})`);
    navigate('/input-otp');
  };

  return (
    <div
      className="flex items-center justify-center bg-white rounded-[30px]"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#F8F9FA',
      }}
    >
      <div
        className="flex flex-col items-center justify-center bg-white rounded-[30px] p-8"
        style={{
          width: '730px',
          height: '515px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Title & Description */}
        <h2 className="text-[#030406] font-lato font-bold text-2xl">
          Forgot password?
        </h2>
        <p className="text-[#89868D] font-lato font-normal text-center mt-2">
          No worries, we’ll send you reset instruction.
        </p>

        {/* Email Form */}
        <div className="flex flex-col space-y-2 mt-6">
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

        {/* Send Email Button */}
        <button
          className="w-[330px] h-[46px] bg-[#DB4444] text-white rounded-[8px] font-lato font-bold mt-6"
          onClick={handleSendEmail}
        >
          Send Email
        </button>

        {/* Back to Login */}
        <a
          className="text-[#DB4444] font-lato font-normal mt-4 cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Back to login
        </a>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
