import { useEffect } from "react";
import closeModal from "../../assets/images/closeModal.svg";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  onClose,
  containerClassName = "modal__container",
  children,
}) {
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
      <div className={containerClassName} onClick={(e) => e.stopPropagation()}>
        <button className="modal__close-button" type="button" onClick={onClose}>
          <img src={closeModal} alt="close button" />
        </button>

        {children}
      </div>
    </div>
  );
}

export default ModalWithForm;
