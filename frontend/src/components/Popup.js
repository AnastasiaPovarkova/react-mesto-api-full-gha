import { useEffect } from "react";

// создаем отдельный компонент `Popup` для обертки любых попапов
const Popup = ({ isOpen, name, onClose, children }) => {

  useEffect(() => { //указываем `useEffect` для обработчика `Escape`
    if (!isOpen) return; // если не открыт, то не нужно навешивать обработчик

    const closeByEscape = (e) => { // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape) // обязательно удаляем обработчик в `clean-up` функции
  }, [isOpen, onClose]) // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда

  const handleOverlay = (e) => { // создаем обработчик оверлея
    if (e.target === e.currentTarget) {
        onClose();
    }
  }

// внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_is-opened`. 
  return (
    <div
      className={`popup ${isOpen ? "popup_is-opened" : ""} popup_type_${name}`}
      onClick={handleOverlay} // добавляем обработчик оверлея
    >
    {/* добавляем контейнер для контента попапа с возможностью изменения типа, чтобы ImagePopup можно было сделать с другими размерами */}
     <div className={`popup__container popup__container_type_${name}`}>
        {/* тут может быть любой контент попапа в `children`: хоть для попапа картинки, хоть для `InfoToolTip`, 
        хоть для `PopupWithForm` */}
        {children}
        {/* кнопка крестика есть у любого попапа */}
        <button
          className='popup__close'
          type='button'
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;
