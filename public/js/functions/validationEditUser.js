const inputName = document.querySelector("#name");
const inputPicture = document.querySelector("#userPicture");
const inputLocality = document.querySelector("#locality");
const inputPostal = document.querySelector("#postal"); //ERROR
const inputStreet= document.querySelector("#street");
const inputStreetNumber = document.querySelector("#streetNumber");
const inputFloor = document.querySelector("#floor");
const inputBetweenSt1 = document.querySelector("#betweenSt1");
const inputBetweenSt2 = document.querySelector("#betweenSt2");
const inputPhoneNumber = document.querySelector("#phoneNumber");
//const inputIndications = document.querySelector("#indications");
const exRegLettersOnly = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

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

  /* validation input name*/
  const errName = document.querySelector(".error-name");
  inputName.addEventListener("blur", function () {
    const value = this.value.trim(); 
  switch (true) {
    case !value.length:
      statusInvalid(errName, `El nombre es requerido`, this);
      break;
    case !exRegLettersOnly.test(value):
      statusInvalid(errName, "El nombre solo debe contener letras y espacios", this);
      break;
    case value.length < 5 || value.length > 100:
      statusInvalid(
        errName,
        "El nombre debe tener entre 5 y 100 caracteres",
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
  /*end validation input name */

  /* validation input picture */
  const errPicture = document.querySelector(".err-userPicture");
  inputPicture.addEventListener("change", function () {
    const regExpFiles = /.png|.jpg|.jpeg/i;
    const files = Array.from(this.files);
    switch (true) {
      case !files.length:
        statusInvalid(
          errPicture,
          "Debes ingresar una imagen del avatar",
          this
        );
        break;

      case files.length > 1:
        statusInvalid(
          errPicture,
          "No puedes ingresar mas de 1 archivo",
          this
        );
        break;

      case files.some(
        (file) => !regExpFiles.test(file.name)
      ) /* file (1).rar */:
        statusInvalid(
          errPicture,
          "El formato de la imagen principal es invalido",
          this
        );
        break;

      default:
        statusValid(errPicture, this);
        break;
    }
  });
  /* end validation input principal image */

 /* validation input locality*/
const errLocality = document.querySelector(".error-locality");
inputLocality.addEventListener("blur", function () {
  const value = this.value.trim(); 
  switch (true) {
    case !value.length:
      statusInvalid(errLocality, `La localidad es requerida`, this);
      break;
    case !exRegLettersOnly.test(value):
      statusInvalid(errLocality, "La localidad solo debe contener letras y espacios", this);
      break;
    case value.length < 3 || value.length > 50:
      statusInvalid(
        errLocality,
        "La localidad debe tener entre 3 y 50 caracteres",
        this
      );
      break;
    default:
      statusValid(errLocality, this);
      break;
  }
});

inputLocality.addEventListener("focus", function () {
  errLocality.innerHTML = null;
  this.classList.remove("is-valid");
  this.classList.remove("is-invalid");
});



/* validation input street*/
const errStreet = document.querySelector(".error-street");
inputStreet.addEventListener("blur", function () {
  const value = this.value.trim();
switch (true) {
  case !value.length:
    statusInvalid(errStreet, `El nombre de la calle es requerido`, this);
    break;
  case !exRegLettersOnly.test(value):
    statusInvalid(errStreet, "El nombre de la calle solo debe contener letras y espacios", this);
    break;
  case value.length < 5 || value.length > 100:
    statusInvalid(
      errStreet,
      "El nombre de la calle debe tener entre 5 y 100 caracteres",
      this
    );
    break;
  default:
    statusValid(errStreet, this);
    break;
  }
});
inputStreet.addEventListener("focus", function () {
  errStreet.innerHTML = null;
  this.classList.remove("is-valid");
  this.classList.remove("is-invalid");
});

/* validation input streetnumber*/
const errStreetNumber = document.querySelector(".error-streetNumber");
inputStreetNumber.addEventListener("blur", function () {
  const value = this.value.trim();
  const numberValue = Number(value);
  switch (true) {
    case !value.length:
      statusInvalid(errStreetNumber, "El numero de la calle es requerido", this);
      break;
    case isNaN(numberValue):
      statusInvalid(errStreetNumber, "El numero de la calle debe ser numérico", this);
      break;
    case numberValue <= 0 || !Number.isInteger(numberValue):
      statusInvalid(
        errStreetNumber,
        "El numero de la calle debe ser un número entero positivo",
        this
      );
      break;
    default:
      statusValid(errStreetNumber, this);
      break;
  }
});
inputStreetNumber.addEventListener("focus", function () {
  this.classList.remove("is-valid");
  this.classList.remove("is-invalid");
  errStreetNumber.innerHTML = null;
});

/* validation input floor*/
const errFloor = document.querySelector(".error-floor");
inputFloor.addEventListener("blur", function () {
  const value = this.value.trim();
  const numberValue = Number(value);
  switch (true) {
    case !value.length:
      statusInvalid(errFloor, "El numero del piso es requerido", this);
      break;
    case isNaN(numberValue):
      statusInvalid(errFloor, "El numero del piso debe ser numérico", this);
      break;
    case numberValue <= 0 || !Number.isInteger(numberValue):
      statusInvalid(
        errFloor,
        "El numero del piso debe ser un número entero positivo",
        this
      );
      break;
    default:
      statusValid(errFloor, this);
      break;
  }
});
inputFloor.addEventListener("focus", function () {
  this.classList.remove("is-valid");
  this.classList.remove("is-invalid");
  errFloor.innerHTML = null;
});

  /* validation input beetween1*/
  const errBetweenSt1 = document.querySelector(".error-betweenSt1");
  inputBetweenSt1.addEventListener("blur", function () {
    const value = this.value.trim(); 
  switch (true) {
    case !value.length:
      statusInvalid(errBetweenSt1, `El nombre de la calle 1 es requerido`, this);
      break;
    case !exRegLettersOnly.test(value):
      statusInvalid(errBetweenSt1, "El nombre solo debe contener letras y espacios", this);
      break;
    case value.length < 5 || value.length > 50:
      statusInvalid(
        errBetweenSt1,
        "El nombre debe tener entre 5 y 50 caracteres",
        this
      );
      break;
    default:
      statusValid(errBetweenSt1, this);
      break;
    }
  });
  errBetweenSt1.addEventListener("focus", function () {
    errBetweenSt1.innerHTML = null;
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
  });

  /* validation input beetween1*/
  const errBetweenSt2 = document.querySelector(".error-betweenSt2");
  inputBetweenSt2.addEventListener("blur", function () {
    const value = this.value.trim(); 
  switch (true) {
    case !value.length:
      statusInvalid(errBetweenSt2, `El nombre de la calle 2 es requerido`, this);
      break;
    case !exRegLettersOnly.test(value):
      statusInvalid(errBetweenSt2, "El nombre solo debe contener letras y espacios", this);
      break;
    case value.length < 5 || value.length > 50:
      statusInvalid(
        errBetweenSt2,
        "El nombre debe tener entre 5 y 50 caracteres",
        this
      );
      break;
    default:
      statusValid(errBetweenSt2, this);
      break;
    }
  });
  errBetweenSt2.addEventListener("focus", function () {
    errBetweenSt2.innerHTML = null;
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
  });


/* validation input streetnumber*/
const errPhoneNumber = document.querySelector(".error-phoneNumber");
inputPhoneNumber.addEventListener("blur", function () {
  const value = this.value.trim();
  const numberValue = Number(value);
  switch (true) {
    case !value.length:
      statusInvalid(errPhoneNumber, "El numero de telefono es requerido", this);
      break;
    case isNaN(numberValue):
      statusInvalid(errPhoneNumber, "El numero de telefono debe ser numérico", this);
      break;
    case numberValue <= 0 || !Number.isInteger(numberValue):
      statusInvalid(
        errPhoneNumber,
        "El numero de telefono debe ser un número entero positivo",
        this
      );
      break;
    default:
      statusValid(errPhoneNumber, this);
      break;
  }
});
inputPhoneNumber.addEventListener("focus", function () {
  this.classList.remove("is-valid");
  this.classList.remove("is-invalid");
  errPhoneNumber.innerHTML = null;
});

  /* FORMULARIO */
  const formUpdate = document.querySelector("#form-update-user");
  const errFormGeneral = document.querySelector(".err-form-general");
  const fieldsRequired = document.querySelectorAll(".field-required");

  formUpdate.addEventListener("submit", function (event) {
    const isName = inputName.value?.trim();
    const isPicture = inputPicture.value?.trim();
    const isLocality = inputLocality.value?.trim();
    //const isPostal = inputPostal.value?.trim();
    const isStreet= inputStreet.value?.trim();
    const isStreetNumber = inputStreetNumber.value?.trim();
    const isFloor= inputFloor.value?.trim();
    const isPhoneNumber= inputPhoneNumber.value?.trim();
    const isBetweenSt1= inputBetweenSt1.value?.trim();
    const isBetweenSt2= inputBetweenSt2.value?.trim();
    inputBetweenSt2
       event.preventDefault();
    if (this.id === "form-update-user") {
      switch (true) {
        case !isName:
        case !isPicture:
        //case !isPostal: 
        case !isLocality:
        case !isStreet: 
        case !isStreetNumber: 
        case !isFloor: 
        case !isBetweenSt1: 
        case !isBetweenSt2: 
        case !isPhoneNumber: 
          existError = true;
          errFormGeneral.innerHTML = "Todos los campos son requeridos";
          errFormGeneral.classList.add("alert", "alert-danger");
          fieldsRequired.forEach((field) => (field.innerHTML = "*"));
          break;
      }
    } else {
      switch (true) {
        case !isName:
        case !isPicture:
        //case !isPostal: 
        case !isLocality:
        case !isStreet: 
        case !isStreetNumber: 
        case !isFloor: 
        case !isBetweenSt1: 
        case !isBetweenSt2: 
        case !isPhoneNumber: 
          existError = true;
          errFormGeneral.innerHTML = "Todos los campos son requeridos";
          errFormGeneral.classList.add("alert", "alert-danger");
          fieldsRequired.forEach((field) => (field.innerHTML = "*"));
          break;
      }
    }
    if (!existError) {
      this.submit();
    }
  });

});







