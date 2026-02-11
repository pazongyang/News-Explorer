import "./Main.css";
import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";
import { getNews } from "../../utils/api";
import errorIcon from "../../assets/icons/notFoundIcon.png";
import homePage from "../../assets/images/homePage.jpg";
import Header from "../Header/Header";

function Main({
  isLoggedIn,
  userName,
  currentPage,
  onSignInClick,
  onLogout,
  onHomeClick,
  onSavedClick,
  articles,
  setArticles,
  savedArticles,
  onSaveArticle,
  onDeleteArticle,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(3);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearchKeyword, setCurrentSearchKeyword] = useState("");

  const handleSearch = (keyword) => {
    setCurrentSearchKeyword(keyword);

    if (!keyword) {
      setError("Please enter a keyword");
      setArticles([]);
      setHasSearched(true);
      return;
    }

    setHasSearched(true);
    setLoading(true);
    setError("");
    setArticles([]);
    setVisibleCount(3);

    getNews(keyword)
      .then((data) => {
        if (!data.articles || data.articles.length === 0) {
          setArticles([]);
        } else {
          const formatted = data.articles.map((a) => ({
            image: a.urlToImage,
            date: new Date(a.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            title: a.title,
            text: a.description,
            source: a.source.name,
          }));

          setArticles(formatted);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <main className="main">
      <section className="main__hero">
        <Header
          isLoggedIn={isLoggedIn}
          userName={userName}
          currentPage={currentPage}
          onSignInClick={onSignInClick}
          onLogout={onLogout}
          onHomeClick={onHomeClick}
          onSavedClick={onSavedClick}
        />
        <img
          className="main__hero-image"
          src={homePage}
          alt="Home page background"
        />

        <div className="main__hero-overlay"></div>

        <div className="main__hero-content">
          <h2 className="main__title">What's going on in the world?</h2>
          <p className="main__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {hasSearched && (
        <>
          {loading && <Preloader />}

          {!loading && error && (
            <section className="search-results__error-message">
              <p className="search-results__error-text">{error}</p>
            </section>
          )}

          {!loading && !error && articles.length === 0 && (
            <section className="search-results__error">
              <img
                className="search-results__error-icon"
                src={errorIcon}
                alt="Not Found Icon"
              />
              <h2 className="search-results__error-title">Nothing found</h2>
              <p className="search-results__error-caption">
                Sorry, but nothing matched your search terms.
              </p>
            </section>
          )}

          {!loading && articles.length > 0 && (
            <>
              <SearchResults
                articles={articles.slice(0, visibleCount)}
                isLoggedIn={isLoggedIn}
                savedArticles={savedArticles}
                onSave={onSaveArticle}
                onDelete={onDeleteArticle}
                canShowMore={visibleCount < articles.length}
                onShowMore={() => setVisibleCount((prev) => prev + 3)}
                searchKeyword={currentSearchKeyword}
              />
            </>
          )}
        </>
      )}

      <About />
    </main>
  );
}

export default Main;
