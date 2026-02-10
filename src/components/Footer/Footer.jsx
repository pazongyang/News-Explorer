import "./Footer.css";
import gitlogo from "../../assets/icons/gitlogo.svg";
import linkedin from "../../assets/icons/linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <h1 className="footer__copyright">
          &copy; 2024 Supersite, Powered by News API
        </h1>
        <div className="footer__right">
          <nav className="footer__nav">
            <p className="footer__main-link">Home</p>
            <p className="footer__main-link">TripleTen</p>{" "}
          </nav>
          <div className="footer__logo">
            <img src={gitlogo} alt="Github logo" className="footer__git-logo" />
            <img
              src={linkedin}
              alt="Linkedin logo"
              className="footer__linkedin-logo"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
