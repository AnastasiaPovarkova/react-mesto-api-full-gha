import { useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const {formValue, error, handleChange, resetValidation} = useForm();

  useEffect(() => {
    resetValidation()
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: formValue.avatar
    });
  }

  return (
    <PopupWithForm
      classs="edit-avatar"
      name="avatar-content"
      title="Обновить аватар"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        type="url"
        id="avatar-field"
        onChange={handleChange}
        value={formValue.avatar || ''}
        className="popup__field popup__field_input_avatar"
        required
        placeholder="Ссылка на аватар"
        name="avatar"
      />
      <span className="avatar-field-error popup__field-error">{error.avatar || ''}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
