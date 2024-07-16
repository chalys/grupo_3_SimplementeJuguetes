const inputName = document.querySelector("[name='name']");
const inputDescription = document.querySelector("[name='description']");
const allInputs = document.querySelectorAll("input, textarea"); // Asumiendo que también podrías tener textarea

const exRegAlfanumeric = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,]*$/;

/* EVENTOS DE FORMULARIO */
/* focus */
window.addEventListener("load", () => {
  let existError = true;

  const statusInvalid = (elementErr, msgErr, elementInput) => {
    elementErr.innerHTML = msgErr;
    elementInput.classList.add("is-invalid");
    existError = true;
  };

  const statusValid = (elementErr, elementInput) => {
    elementErr.innerHTML = null;
    elementInput.classList.add("is-valid");
    elementInput.classList.remove("is-invalid");
    existError = false;
  };

  /* blur */
  /* validation input name */
  const errName = document.querySelector(".error-name");
  inputName.addEventListener("blur", function () {
    const value = this.value.trim(); //quita espacios
    switch (true) {
      case !value.length:
        statusInvalid(errName, `El nombre es requerido`, this);
        break;
      case !exRegAlfanumeric.test(value):
        statusInvalid(errName, "El nombre debe ser alfanumérico", this);
        break;
      case value.length < 5 || value.length > 100:
        statusInvalid(
          errName,
          "El nombre debe tener un mínimo de 5 caracteres",
          this
        );
        break;
      default:
        statusValid(errName, this);
        break;
    }
  });
  inputName.addEventListener("focus", function () {
    errName.innerHTML = null;
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
  });
  /* end validation input name */

  /* validation input description */
  const errDescription = document.querySelector(".error-description");
  inputDescription.addEventListener("blur", function () {
    const value = this.value.trim();
    switch (true) {
      case !value.length:
        statusInvalid(errDescription, "La descripción es requerida", this);
        break;

      case !exRegAlfanumeric.test(value):
        statusInvalid(
          errDescription,
          "La descripción debe ser alfanumérica",
          this
        );
        break;

      case value.length < 20 || value.length > 500:
        statusInvalid(
          errDescription,
          "La descripción debe tener un mínimo de 20 y un máximo de 500 caracteres",
          this
        );
        break;

      default:
        statusValid(errDescription, this);
        break;
    }
  });
  inputDescription.addEventListener("focus", function () {
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
    errDescription.innerHTML = null;
  });
  /* end validation input description */

  /* FORMULARIO */
  const formCreate = document.querySelector("#form-create-category");
  const errFormGeneral = document.querySelector(".err-form-general");
  const fieldsRequired = document.querySelectorAll(".field-required");
  formCreate.addEventListener("submit", function (event) {
    const isName = inputName.value?.trim();
    const isDescription = inputDescription.value?.trim();
    event.preventDefault();
    switch (true) {
      case !isName:
      case !isDescription:
        existError = true;
        errFormGeneral.innerHTML = "Todos los campos son requeridos";
        errFormGeneral.classList.add("alert", "alert-danger");
        fieldsRequired.forEach((field) => (field.innerHTML = "*"));
        break;
    }
    if (!existError) {
      this.submit();
    }
  });

  // Ocultar alerta al enfocar cualquier input
  allInputs.forEach(input => {
    input.addEventListener("focus", () => {
      errFormGeneral.innerHTML = null;
      errFormGeneral.classList.remove("alert", "alert-danger");
      fieldsRequired.forEach((field) => (field.innerHTML = ""));
    });
  });
});