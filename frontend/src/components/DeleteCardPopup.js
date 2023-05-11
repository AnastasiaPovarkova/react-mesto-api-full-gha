import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ card, isOpen, onClose, onDeleteSubmit, isLoading }) {
  function handleDeleteSubmit(e) {
    e.preventDefault();
    onDeleteSubmit(card);
  }

  return (
    <PopupWithForm
      classs="delete-card"
      name="delete-confirmation"
      title="Вы уверены?"
      submitText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteSubmit}
      isLoading={isLoading}
    />
  );
}

export default DeleteCardPopup;
