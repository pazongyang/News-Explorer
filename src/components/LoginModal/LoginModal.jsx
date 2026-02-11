import { useEffect, useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

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

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      containerClassName="modal__container"
    >
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
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-form__buttons">
            <button
              type="submit"
              className={`login-form__submit ${
                isFormValid ? "login-form__submit_active" : ""
              }`}
              disabled={!isFormValid}
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
    </ModalWithForm>
  );
}

export default LoginModal;
