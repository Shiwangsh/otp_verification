import React, { useState } from "react";
import Modal from "react-modal";

interface ErrorModalProps {
  errorMessage: string;
  closePopUp: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  errorMessage,
  closePopUp,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const closeModal = () => {
    setIsModalOpen(false);
    closePopUp();
  };

  return (
    <div>
      {errorMessage !== "" ? (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
        >
          <h2>{errorMessage}</h2>
          <p>Invalid OTP❗</p>
          <button onClick={closeModal}>Try again!</button>
        </Modal>
      ) : null}
    </div>
  );
};

export default ErrorModal;
