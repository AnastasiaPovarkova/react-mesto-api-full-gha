import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import PageNotFound from "./PageNotFound";

import api from "../utils/api";
import { UserContext } from "../contexts/CurrentUserContext";
import { Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import auth from "../utils/auth.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedForDeleteCard, setSelectedForDeleteCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const navigate = useNavigate();

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isDeleteCardPopupOpen ||
    selectedCard.link;

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setSelectedCard({});
    setSelectedForDeleteCard({});
    setErrorMessage("");
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    //Проверка наличия токена в localStorage
    if (localStorage.getItem("jwt")) {
      auth
        .checkToken(localStorage.getItem("jwt"))
        .then((res) => {
          console.log(res);
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  function handleRegister(formValue) {
    setIsAuthLoading(true);
    auth
      .register(formValue.email, formValue.password)
      .then((res) => {
        if (res) {
          handleNotification(true);
          navigate("/signin", { replace: true });
        }
      })
      .catch((err) => {
        handleNotification(false);
        console.log(err);
        handleErrorMessageNotification(err);
      })
      .finally(() => setIsAuthLoading(false));
  }

  function handleLogin(formValue) {
    setIsAuthLoading(true);
    Promise.all([
      auth.checkToken(localStorage.getItem("jwt")),
      auth.authorize(formValue.password, formValue.email)
    ])
      .then(([data, res]) => {
        if (data) {
          setUserEmail(data.data.email);
        }
        if (res.token) {
          console.log(res);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        handleNotification(false);
        console.log(err);
        handleErrorMessageNotification(err);
      })
      .finally(() => setIsAuthLoading(false));
  }

  function handleEmailReset() {
    setUserEmail("");
  }

  function handleNotification(successed) {
    setIsSuccessPopupOpen(true);
    setIsSuccess(successed);
  }

  function handleErrorMessageNotification(err) {
    setErrorMessage(err);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id); //поставлен ли лайк
    if (isLiked) {
      api
        .unlikeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleDeleteCard(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id != card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function changeUserInfo(data) {
    setIsLoading(true);
    api
      .changeUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .editAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddCard(card) {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((data) => {
        console.log(data);
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleDeletePopupOpen(card) {
    setSelectedForDeleteCard(card);
    setIsDeleteCardPopupOpen(true);
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} handleEmailReset={handleEmailReset} />
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/mesto-react" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          <Route
            path="/mesto-react"
            element={
              <ProtectedRoute
                element={Main}
                cards={cards}
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                handleCardClick={setSelectedCard}
                handleDeleteClick={handleDeletePopupOpen}
                handleCardLike={handleCardLike}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                handleRegister={handleRegister}
                isAuthLoading={isAuthLoading}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login handleLogin={handleLogin} isAuthLoading={isAuthLoading} />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={changeUserInfo}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
          isLoading={isLoading}
        />
        <DeleteCardPopup
          card={selectedForDeleteCard}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteSubmit={handleDeleteCard}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          errorMessage={errorMessage}
        />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
