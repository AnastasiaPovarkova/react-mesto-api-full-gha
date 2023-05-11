import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";

function Register({ handleRegister, isAuthLoading }) {
  const {formValue, error, handleChange, resetValidation} = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(formValue);
    resetValidation();
  }

  return (
    <div className="login login__register">
      <form
        name="form__login"
        className="popup__content"
        onSubmit={handleSubmit}
      >
        <h2 className="login__title">Регистрация</h2>
        <input
          type="email"
          id="email-field"
          className="login__field"
          value={formValue.email || ''}
          onChange={handleChange}
          minLength="2"
          maxLength="50"
          required
          placeholder="Email"
          name="email"
        />
        <span className="name-field-error login__span">{error.email || ''}</span>
        <input
          type="text"
          id="password-field"
          className="login__field"
          value={formValue.password || ''}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
          placeholder="Пароль"
          name="password"
        />
        <span className="profession-field-error login__span">{error.password || ''}</span>
        <button
          type="submit"
          className="login__submit"
          name="submit"
          defaultValue="Зарегистрироваться"
        >
          {isAuthLoading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
      <div className="login__enter">
        <Link to="/signin" className="link__reset">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
