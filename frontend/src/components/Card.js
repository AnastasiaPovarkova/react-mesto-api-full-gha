import React from "react";
import { UserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onDeleteClick, onCardLike }) {
  const currentUser = React.useContext(UserContext);

  const isOwn = card.owner._id === currentUser._id; //наша карточка или нет
  const isLiked = card.likes.some((i) => i._id === currentUser._id); //поставлен ли лайк

  const cardLikeButtonClassName = `element__like ${ //`className` для кнопки лайка
    isLiked && "element__like_liked"
  }`; 

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="element">
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          className="element__trash"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__group">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__likes">
          <button
            type="button"
            aria-label="Нравится"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <div className="element__count">{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
