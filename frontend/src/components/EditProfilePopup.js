import { useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { UserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const {formValue, error, handleChange, resetValidation, isValid} = useForm();
  const currentUser = useContext(UserContext);

  useEffect(() => {
    resetValidation({ name: currentUser.name, about: currentUser.about}, {})
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: formValue.name,
      about: formValue.about
    });
  }

  return (
    <PopupWithForm
      classs="edit-profile"
      name="profile-content"
      title="Редактировать профиль"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValid={isValid}
    >
      <input
        type="text"
        id="name-field"
        className="popup__field popup__field_input_name"
        value={formValue.name || ''}
        onChange={handleChange}
        minLength="2"
        maxLength="40"
        required
        placeholder="Ваше имя"
        name="name"
      />
      <span className="name-field-error popup__field-error">{error.name || ''}</span>
      <input
        type="text"
        id="profession-field"
        className="popup__field popup__field_input_profession"
        value={formValue.about || ''}
        onChange={handleChange}
        minLength="2"
        maxLength="200"
        required
        placeholder="Ваша профессия"
        name="about"
      />
      <span className="profession-field-error popup__field-error">{error.about || ''}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
