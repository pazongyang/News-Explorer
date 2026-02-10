import { useEffect, useState } from "react";
import "./LoginModal.css";
import closeModal from "../../assets/images/closeModal.svg";

function LoginModal({ isOpen, onClose, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isFormValid = isValidEmail(email) && password.length > 0;

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setEmailError(false);
    }
  }, [isOpen]);

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
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close-button" onClick={onClose}>
          <img src={closeModal} alt="close button" />
        </button>
        <form className="login-form">
          <div className="login-form__content">
            <h2 className="login-form__title">Sign in</h2>

            <div className="login-form__field">
              <label htmlFor="email" className="login-form__label">
                Email
              </label>
              <input
                type="email"
                className="login-form__input"
                id="email"
                name="email"
                placeholder="Enter Email"
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  setEmailError(value !== "" && !isValidEmail(value));
                }}
              />
              {emailError && (
                <span className="login-form__error">Invalid email address</span>
              )}
            </div>

            <div className="login-form__field">
              <label htmlFor="password" className="login-form__label">
                Password
              </label>
              <input
                type="password"
                className="login-form__input"
                id="password"
                name="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-form__buttons">
              <button
                className={`login-form__submit ${
                  isFormValid ? "login-form__submit_active" : ""
                }`}
                disabled={!isFormValid}
                onClick={onSwitchToSignup}
              >
                Sign in
              </button>

              <button
                className="login-form__secondary"
                type="button"
                onClick={onSwitchToSignup}
              >
                or <span className="login-form__secondary-link">Sign up</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
