import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_open-card ${
        Object.entries(card).length > 0 && "popup_is-opened"
      }`}
      onClick={onClose}
    >
      <div
        className="popup__element"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img className="popup__image" src={card.link} alt={card.name} />
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close"
          onClick={onClose}
        />
        <h2 className="popup__text">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
