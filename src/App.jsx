import { useState, useEffect } from "react";
import Main from "./components/Main/Main";
import LoginModal from "./components/LoginModal/LoginModal";
import SignUpModal from "./components/SignUpModal/SignUpModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import Footer from "./components/Footer/Footer";
import SavedArticles from "./components/SavedArticles/SavedArticles";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [savedArticles, setSavedArticles] = useState(() => {
    const stored = localStorage.getItem("savedArticles");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  const [currentPage, setCurrentPage] = useState("main");

  const [articles, setArticles] = useState([]);

  const closeSignup = () => setIsSignupOpen(false);

  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    setIsSuccessOpen(false);
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
    setIsSuccessOpen(false);
  };

  const openSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
    setIsSuccessOpen(false);
  };

  const openSuccess = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(false);
    setIsSuccessOpen(true);
  };

  const openLoginFromSuccess = () => {
    setIsSuccessOpen(false);
    setIsLoginOpen(true);
  };

  const handleSaveArticle = (article, keyword) => {
    if (!savedArticles.find((a) => a.title === article.title)) {
      setSavedArticles((prev) => [...prev, { ...article, keyword }]);
    }
  };

  const handleDeleteArticle = (article) => {
    setSavedArticles((prev) => prev.filter((a) => a.title !== article.title));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("main");
    setArticles([]);
  };

  return (
    <>
      {currentPage === "main" && (
        <Main
          key={isLoggedIn ? "in" : "out"}
          isLoggedIn={isLoggedIn}
          userName="Elise"
          currentPage={currentPage}
          onSignInClick={openLogin}
          onLogout={handleLogout}
          onHomeClick={() => setCurrentPage("main")}
          onSavedClick={() => setCurrentPage("saved")}
          articles={articles}
          setArticles={setArticles}
          savedArticles={savedArticles}
          onSaveArticle={handleSaveArticle}
          onDeleteArticle={handleDeleteArticle}
        />
      )}

      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeAllModals}
        onSwitchToSignup={openSignup}
      />
      <SignUpModal
        isOpen={isSignupOpen}
        onClose={closeAllModals}
        onSwitchToLogin={() => {
          closeSignup();
          openLogin();
        }}
        onRegisterSuccess={openSuccess}
      />
      <RegisterModal
        isOpen={isSuccessOpen}
        onClose={closeAllModals}
        onSignIn={openLoginFromSuccess}
      />
      {currentPage === "saved" && (
        <SavedArticles
          savedArticles={savedArticles}
          onDelete={handleDeleteArticle}
          isLoggedIn={isLoggedIn}
          userName="Elise"
          currentPage={currentPage}
          onSignInClick={openLogin}
          onLogout={handleLogout}
          onHomeClick={() => setCurrentPage("main")}
          onSavedClick={() => setCurrentPage("saved")}
        />
      )}

      <Footer />
    </>
  );
}

export default App;
