import useForm from "../hooks/useForm";

function Login({ handleLogin, isAuthLoading }) {
  const {formValue, error, handleChange, resetValidation, isValid} = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValue.password || !formValue.email) {
      return;
    }
    handleLogin(formValue);
    resetValidation();
  };

  return (
    <div className="login">
      <form
        name="form__login"
        className="popup__content"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="login__title">Вход</h2>
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
        <span className="email-field-error login__span">{error.email || ''}</span>
        <input
          type="password"
          id="password-field"
          className="login__field"
          value={formValue.password || ''}
          onChange={handleChange}
          minLength="8"
          maxLength="40"
          required
          placeholder="Пароль"
          name="password"
        />
        <span className="password-field-error login__span">{error.password || ''}</span>
        <button
          type="submit"
          className="login__submit"
          name="submit"
          disabled={!isValid}
          defaultValue="Войти"
        >
          {isAuthLoading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}

export default Login;
