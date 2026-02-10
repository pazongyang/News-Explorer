import "./SearchForm.css";
import { useState } from "react";

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Enter Topic"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
