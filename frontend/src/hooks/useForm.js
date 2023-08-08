import { useState } from "react";

export default function useForm() {
  const [formValue, setFormValue] = useState({});
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    const error = e.target.validationMessage;
    setFormValue({ ...formValue, [name]: value });
    setError({ ...error, [name]: error });
    setIsValid(e.target.closest('form').checkValidity());
  };

  function resetValidation(formValue={}, error = {}) {
    setFormValue(formValue);
    setError(error);
    setIsValid(false);
  }

  return {formValue, error, handleChange, resetValidation, isValid};
}