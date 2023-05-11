import React from "react";
import logo from "../images/logo__image.svg";
import { Link, Routes, Route } from 'react-router-dom';

function Header({email, handleEmailReset}) {

  function signOut() {
    localStorage.removeItem('jwt');
    handleEmailReset();
  }

  return (
    <header className="header">
      <img className="header__image" src={logo} alt="Место Россия" />
      <div className="header__info">
        <h2 className="header__email">{email}</h2>
        <Routes>
          <Route path="/" element={<Link onClick={signOut} to="/signin" className="header__link">Выйти</Link>} />
          <Route path="/mesto-react" element={<Link onClick={signOut} to="/signin" className="header__link">Выйти</Link>} />
          <Route path="/signin" element={<Link to="/signup" className="header__link">Регистрация</Link>} />
          <Route path="/signup" element={<Link to="/signin" className="header__link">Войти</Link>} />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
