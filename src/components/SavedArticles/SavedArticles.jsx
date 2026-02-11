import "./SavedArticles.css";
import NewsCard from "../NewsCard/NewsCard";
import Header from "../Header/Header";

function SavedArticles({
  savedArticles,
  onDelete,
  isLoggedIn,
  userName,
  currentPage,
  onSignInClick,
  onLogout,
  onHomeClick,
  onSavedClick,
}) {
  const keywords = savedArticles.map((a) => a.keyword).filter(Boolean);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        currentPage={currentPage}
        onSignInClick={onSignInClick}
        onLogout={onLogout}
        onHomeClick={onHomeClick}
        onSavedClick={onSavedClick}
        variant="saved"
      />

      <main className="saved-articles">
        <section className="saved-articles__header">
          <h2 className="saved-articles__title">Saved articles</h2>
          {savedArticles.length > 0 ? (
            <p className="saved-articles__subtitle">
              You have {savedArticles.length} saved article
              {savedArticles.length > 1 ? "s" : ""}
            </p>
          ) : (
            <p className="saved-articles__subtitle">
              You have no saved articles
            </p>
          )}

          <p>
            Keywords:{" "}
            <strong>
              {keywords.length > 0 ? keywords.join(", ") : "No keywords yet"}
            </strong>
          </p>
        </section>

        <section
          className={`saved-articles__cards-container ${
            savedArticles.length === 0 ? "saved-articles__empty" : ""
          }`}
        >
          {savedArticles.length === 0 ? (
            <p className="saved-articles__empty-message">
              You have no saved articles
            </p>
          ) : (
            <ul className="saved-articles__cards">
              {savedArticles.map((article, index) => (
                <NewsCard
                  key={index}
                  article={article}
                  isLoggedIn={isLoggedIn}
                  isSavedPage={true}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

export default SavedArticles;
