import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {
  const {formValue, error, handleChange, resetValidation} = useForm();

  useEffect(() => {
    resetValidation()
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault(); 

    onAddCard({
      // Передаём значения управляемых компонентов во внешний обработчик
      name: formValue.cardName,
      link: formValue.link
    });
  }

  return (
    <PopupWithForm
      classs="add-card"
      name="card-content"
      title="Новое место"
      submitText="Создать"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        type="text"
        id="card-field"
        className="popup__field popup__field_input_card"
        onChange={handleChange}
        value={formValue.cardName || ''}
        minLength="2"
        maxLength="30"
        required
        placeholder="Название"
        name="cardName"
      />
      <span className="card-field-error popup__field-error">{error.cardName || ''}</span>
      <input
        type="url"
        id="link-field"
        className="popup__field popup__field_input_link"
        onChange={handleChange}
        value={formValue.link || ''}
        required
        placeholder="Ссылка на картинку"
        name="link"
      />
      <span className="link-field-error popup__field-error">{error.link || ''}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
