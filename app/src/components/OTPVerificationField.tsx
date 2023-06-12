import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
import { handleInputChange, handleBackspace, handlePaste } from "../uitls";

interface OTPVerificationFieldProps {
  numDigits: number;
}

const OTPVerificationField: React.FC<OTPVerificationFieldProps> = ({
  numDigits,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [inputValues, setInputValues] = useState<any[]>(
    Array(numDigits).fill("")
  );

  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  const handleSubmit = async () => {
    console.log(inputValues);
    await axios
      .post("http://localhost:9000/verify", {
        otp: inputValues,
      })
      .then((res) => {
        navigate("/success");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("Verification Error");
        } else {
          setErrorMessage("An error occurred");
        }
      });
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < numDigits; i++) {
      inputs.push(
        <input
          key={i}
          type="number"
          maxLength={1}
          pattern="\d*"
          onChange={(event) =>
            handleInputChange(
              i,
              event,
              inputRefs.current,
              numDigits,
              setInputValues
            )
          }
          onKeyDown={(event) =>
            handleBackspace(i, event, inputRefs.current, setInputValues)
          }
          ref={(ref) => (inputRefs.current[i] = ref)}
        />
      );
    }
    return inputs;
  };

  return (
    <div className="form-container">
      {errorMessage ? (
        <ErrorModal
          errorMessage={errorMessage}
          closePopUp={() => setErrorMessage("")}
        />
      ) : null}
      <form
        onPaste={(event) => {
          handlePaste(event, inputRefs.current, numDigits, setInputValues);
        }}
      >
        <div className="form-container">
          <form onSubmit={handleSubmit}>{renderInputs()}</form>
        </div>
      </form>
      <button className="active" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default OTPVerificationField;
