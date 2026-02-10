import { useEffect, useState } from "react";
import "./SignupModal.css";
import closeModal from "../../assets/images/closeModal.svg";

function SignupModal({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isFormValid =
    isValidEmail(email) && password.length > 0 && username.length > 0;

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
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
      <div
        className="signup-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close-button" onClick={onClose}>
          <img src={closeModal} alt="close button" />
        </button>

        <form
          className="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isFormValid) return;

            console.log("Signup data:", { email, password, username });
            onRegisterSuccess();
          }}
        >
          <div className="signup-form__content">
            <h2 className="signup-form__title">Sign up</h2>

            <div className="signup-form__field">
              <label htmlFor="signup-email" className="signup-form__label">
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                className="signup-form__input"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  setEmailError(value !== "" && !isValidEmail(value));
                }}
              />
              {emailError && (
                <span className="signup-form__error">
                  This email is not available
                </span>
              )}
            </div>

            <div className="signup-form__field">
              <label htmlFor="signup-password" className="signup-form__label">
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                className="signup-form__input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="signup-form__field">
              <label htmlFor="signup-username" className="signup-form__label">
                Username
              </label>
              <input
                type="text"
                id="signup-username"
                className="signup-form__input"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="signup-form__buttons">
              <button
                type="submit"
                className={`signup-form__submit ${
                  isFormValid ? "signup-form__submit_active" : ""
                }`}
                disabled={!isFormValid}
              >
                Sign up
              </button>

              <button
                type="button"
                className="signup-form__secondary"
                onClick={onSwitchToLogin}
              >
                or <span className="signup-form__secondary-link">Sign in</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupModal;
