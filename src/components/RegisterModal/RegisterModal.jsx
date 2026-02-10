import { useEffect } from "react";
import "./RegisterModal.css";
import closeModal from "../../assets/images/closeModal.svg";

function RegisterModal({ isOpen, onClose, onSignIn }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal modal_open" onClick={onClose}>
      <div
        className="success-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close-button" onClick={onClose}>
          <img src={closeModal} alt="close button" />
        </button>

        <h2 className="success-modal__title">
          Registration successfully completed!
        </h2>

        <button
          className="success-modal__signin"
          type="button"
          onClick={onSignIn}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegisterModal;
