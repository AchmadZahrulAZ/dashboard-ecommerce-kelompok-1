import React from 'react';
import LoginComponent from '../components/Auth/LoginComponent';
import SignUpComponent from '../components/Auth/SignUpComponent';
import ForgotPasswordComponent from '../components/Auth/ForgotPasswordComponent';
import InputOTP from '../components/Auth/InputOTP';

const LoginPage = () => {
  return (
    <div>
        {/* <LoginComponent /> */}
        {/* <SignUpComponent /> */}
        {/* <ForgotPasswordComponent /> */}
        <InputOTP />
    </div>
  );
};

export default LoginPage;