import "./NewsCard.css";
import saveBtn from "../../assets/images/saveButton.svg";
import saveComplete from "../../assets/images/colorSaved.svg";
import trashBtn from "../../assets/images/trashButton.png";
import trashBlackBtn from "../../assets/images/colorTrashButton.png";
import { useState } from "react";

function NewsCard({
  article,
  isLoggedIn,
  isSavedPage = false,
  isSaved = false,
  onSave,
  onDelete,
}) {
  const { image, date, title, text, source } = article;
  const [showTooltip, setShowTooltip] = useState(false);
  const [trashHover, setTrashHover] = useState(false);

  const handleClick = () => {
    if (isSavedPage && onDelete) {
      onDelete(article);
      return;
    }

    if (!isLoggedIn) {
      return;
    }

    if (onSave) onSave(article, article.keyword || "");
  };
  return (
    <li className="news-card">
      <div className="news-card__image-wrapper">
        {isSavedPage && article.keyword && (
          <div className="news-card__note-tag">{article.keyword}</div>
        )}

        {!isLoggedIn && !isSavedPage && showTooltip && (
          <div className="news-card__tooltip">Sign in to save articles</div>
        )}

        <button
          className="news-card__save-button"
          type="button"
          aria-label={isSavedPage ? "Remove article" : "Save article"}
          onClick={handleClick}
          onMouseEnter={() => {
            if (!isLoggedIn && !isSavedPage) setShowTooltip(true);
            if (isSavedPage) setTrashHover(true);
          }}
          onMouseLeave={() => {
            if (!isLoggedIn && !isSavedPage) setShowTooltip(false);
            if (isSavedPage) setTrashHover(false);
          }}
        >
          <img
            src={
              isSavedPage
                ? trashHover
                  ? trashBlackBtn
                  : trashBtn
                : isSaved
                  ? saveComplete
                  : saveBtn
            }
            alt="Article action icon"
            className="save-icon"
          />
        </button>

        {isSavedPage && (
          <div className="news-card__tooltip news-card__tooltip_type_remove">
            Remove from saved
          </div>
        )}

        <img src={image} alt={title} className="news-card__image" />
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{date}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{text}</p>
        <p className="news-card__source">{source}</p>
      </div>
    </li>
  );
}

export default NewsCard;
