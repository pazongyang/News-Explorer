import "./Header.css";
import logoutIcon from "../../assets/images/logout.svg";
import { useEffect, useState } from "react";
import menuBar from "../../assets/images/menu-bar.png";
import closeModal from "../../assets/images/closeModal.svg";

function Header({
  isLoggedIn,
  userName,
  currentPage,
  onSignInClick,
  onLogout,
  onHomeClick,
  onSavedClick,
  variant,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`header 
          ${isLoggedIn ? "header_logged-in" : "header_logged-out"}
          ${variant === "saved" ? "header_saved" : "header_home"}
        `}
      >
        <div className="header__content">
          <h1 className="header__logo">NewsExplorer</h1>

          <nav className="header__nav">
            <span
              className={`header__link ${
                currentPage === "main" ? "header__link_active" : ""
              }`}
              onClick={onHomeClick}
            >
              Home
            </span>

            {isLoggedIn ? (
              <>
                <span
                  className={`header__link ${
                    currentPage === "saved" ? "header__link_active" : ""
                  }`}
                  onClick={onSavedClick}
                >
                  Saved articles
                </span>

                <button
                  className="header__user-button"
                  type="button"
                  onClick={onLogout}
                >
                  {userName}
                  <img
                    src={logoutIcon}
                    alt="Log out"
                    className="header__logout-icon"
                  />
                </button>
              </>
            ) : (
              <button
                className="header__signin-button"
                type="button"
                onClick={onSignInClick}
              >
                Sign In
              </button>
            )}
          </nav>

          <button className="menu-bar" type="button" onClick={openMenu}>
            <img src={menuBar} alt="menu" />
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu__overlay" onClick={closeMenu} />

          <div className="mobile-menu__panel">
            <div className="mobile-menu__top">
              <span className="mobile-menu__logo">NewsExplorer</span>

              <button className="closeModal" type="button" onClick={closeMenu}>
                <img src={closeModal} alt="close" />
              </button>
            </div>

            <div className="mobile-menu__content">
              <button
                className="mobile-menu__link"
                type="button"
                onClick={() => {
                  onHomeClick();
                  closeMenu();
                }}
              >
                Home
              </button>

              {isLoggedIn && (
                <button
                  className="mobile-menu__link"
                  type="button"
                  onClick={() => {
                    onSavedClick();
                    closeMenu();
                  }}
                >
                  Saved articles
                </button>
              )}

              {!isLoggedIn ? (
                <button
                  className="mobile-menu__button"
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onSignInClick();
                  }}
                >
                  Sign in
                </button>
              ) : (
                <button
                  className="mobile-menu__button"
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onLogout();
                  }}
                >
                  {userName}
                  <img
                    src={logoutIcon}
                    alt="logout"
                    className="mobile-menu__logout-icon"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
