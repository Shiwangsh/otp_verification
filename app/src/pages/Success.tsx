import React from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>OTP VERIFIED✅✅</h1>
      <button onClick={() => navigate("/")}>Go Back</button>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={900}
        recycle={false}
        gravity={0.1}
        colors={["#ff0000", "#00ff00", "#0000ff"]}
      />
    </div>
  );
};

export default Success;
