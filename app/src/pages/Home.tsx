import React from "react";
import OTPVerificationField from "../components/OTPVerificationField";

const Home = () => {
  return (
    <div className="container">
      <h1>OTP Verification</h1>
      <OTPVerificationField numDigits={6} />
    </div>
  );
};

export default Home;
