import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__logo">NewsExplorer</h1>

        <nav className="header__nav">
          <span className="header__link header__link_active">Home</span>
          <button className="header__signin-button" type="button">
            Sign In
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
