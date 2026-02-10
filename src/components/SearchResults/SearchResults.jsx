import "./SearchResults.css";
import NewsCard from "../NewsCard/NewsCard";

function SearchResults({
  articles,
  isLoggedIn,
  savedArticles,
  onSave,
  onDelete,
  canShowMore,
  onShowMore,
  searchKeyword,
}) {
  return (
    <section className="search-results">
      <h2 className="search-results__title">Search results</h2>

      <ul className="search-results__cards">
        {articles.map((article, index) => (
          <NewsCard
            key={index}
            article={article}
            isLoggedIn={isLoggedIn}
            isSaved={savedArticles.some((a) => a.title === article.title)}
            onSave={(art) => onSave(art, searchKeyword)}
            onDelete={onDelete}
          />
        ))}
      </ul>

      {canShowMore && (
        <button
          className="search-results__button"
          type="button"
          onClick={onShowMore}
        >
          Show more
        </button>
      )}
    </section>
  );
}

export default SearchResults;
