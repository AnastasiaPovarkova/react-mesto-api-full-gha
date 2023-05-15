import { useContext } from "react";
import coursor from "../images/AvatarEditCoursor.svg";
import Card from "./Card";
import { UserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  handleCardClick,
  handleDeleteClick,
  handleCardLike,
}) {
  const currentUser = useContext(UserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image">
          <img
            className="profile__avatar"
            src={currentUser?.avatar}
            alt="аватар"
            onClick={onEditAvatar}
          />
          <img
            className="profile__edit"
            src={coursor}
            alt="кнопка редактирования"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button
              type="button"
              aria-label="Редактировать"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__profession">{currentUser?.about}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить фотокарточку"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards?.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onDeleteClick={handleDeleteClick}
              onCardLike={handleCardLike}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
