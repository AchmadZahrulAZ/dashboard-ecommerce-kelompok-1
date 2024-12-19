import React from 'react';

const InputOTP = () => {
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
          Input OTP
        </h2>
        <p className="text-[#89868D] font-lato font-normal text-center mt-2">
          We sent you a one-time password (OTP) on the email
        </p>

        {/* OTP Form */}
        <div className="flex justify-center space-x-4 mt-6">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-[71px] h-[43px] bg-[#F4F5F9] border border-[#DBDCDE] rounded-[8px] text-center text-xl"
              />
            ))}
        </div>

        {/* Send OTP Button */}
        <button
          className="w-[330px] h-[46px] bg-[#DB4444] text-white rounded-[8px] font-lato font-bold mt-6"
          onClick={() => alert('OTP verified!')}
        >
          Send OTP
        </button>

        {/* Back to Login */}
        <a
          className="text-[#DB4444] font-lato font-normal mt-4 cursor-pointer"
          onClick={() => alert('Navigate to Login')}
        >
          Back to login
        </a>
      </div>
    </div>
  );
};

export default InputOTP;

