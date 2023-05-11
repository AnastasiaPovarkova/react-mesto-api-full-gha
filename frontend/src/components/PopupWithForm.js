import React from "react";
import Popup from "./Popup"

// function PopupWithForm({isOpen, name, onClose, ...props}) {
//   return (
//     <Popup isOpen={isOpen} name={name} onClose={onClose}>
//         <h2 className='popup__title'>{props.title}</h2>
//     </Popup>
//   )
// }

function PopupWithForm({
  name,
  title,
  onClose,
  isOpen,
  children,
  classs,
  submitText,
  onSubmit,
  isLoading
}) {

  return (
    <div
      className={`popup popup_${classs} ${isOpen && "popup_is-opened"}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close"
          onClick={onClose}
        />
        <form
          name={`popup__${name}`}
          id={`popup__${name}`}
          className="popup__content"
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            className={"popup__submit"}
            name="submit"
            defaultValue={submitText || "Сохранить"}
          >
            {isLoading ? "Сохранение..." : submitText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
