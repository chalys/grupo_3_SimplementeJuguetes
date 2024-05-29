const inputName = document.querySelector("[name='name']");
const inputManufacturer = document.querySelector("[name='manufacturer']");
const inputMark = document.querySelector("[name='mark']");
const inputSku = document.querySelector("[name='sku']");
const inputAvailable = document.querySelector("[name='available']");
const inputCollection = document.querySelector("[name='collection']");
const inputStock = document.querySelector("[name='stock']");
const inputCategory = document.querySelector("[name='categoryId']");
const inputPrice = document.querySelector("[name='price']");
const inputLine = document.querySelector("[name='line']");
const inputCharacter = document.querySelector("[name='character']");
const inputCharacterVersion = document.querySelector(
  "[name='characterVersion']"
);
const inputMinAge = document.querySelector("[name='minAge']");
const inputHeight = document.querySelector("[name='height']");
const inputDepth = document.querySelector("[name='depth']");
const inputWidth = document.querySelector("[name='width']");
const inputMaterials = document.querySelector("[name='materials']");
const inputScale = document.querySelector("[name='scale']");
const inputArticulatedYes = document.querySelector("#articulated_yes");
const inputArticulatedNo = document.querySelector("#articulated_no");
const inputCollectableYes = document.querySelector("#collectable_yes");
const inputCollectableNo = document.querySelector("#collectable_no");
const inputAccessoriesYes = document.querySelector("#accessories_yes");
const inputAccessoriesNo = document.querySelector("#accessories_no");
const inputBobbleHeadYes = document.querySelector("#bobblehead_yes");
const inputBobbleHeadNo = document.querySelector("#bobblehead_no");
const inputDescription = document.querySelector("[name='description']");
const inputImagePrincipal = document.querySelector("[name='firstImg']");
const inputImageSecondary = document.querySelector("[name='secondImg']");
const exRegAlfanumeric = /^[a-zA-Z0-9\s]*$/;

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
  /* validation input name*/
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
          "El nombre debe tener un minimo de 5 caracteres",
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

  /* validation input price*/
  const errPrice = document.querySelector(".error-price");
  inputPrice.addEventListener("blur", function () {
    const value = this.value.trim();
    switch (true) {
      case !value.length:
        statusInvalid(errPrice, "El precio es requerido", this);
        break;
      case isNaN(value):
        statusInvalid(errPrice, "El precio debe ser numérico", this);
        break;
      case value < 0:
        statusInvalid(errPrice, "El precio debe tener un valor positivo", this);
        break;
      default:
        statusValid(errPrice, this);
        break;
    }
  });
  inputPrice.addEventListener("focus", function () {
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
    errPrice.innerHTML = null;
  });
  /* end validation input price*/

  /* validation input SKU*/
  const errSku = document.querySelector(".error-sku");
  inputSku.addEventListener("blur", function () {
    const value = this.value.trim();
    const numberValue = Number(value);
    switch (true) {
      case !value.length:
        statusInvalid(errSku, "El SKU es requerido", this);
        break;
      case isNaN(numberValue):
        statusInvalid(errSku, "El SKU debe ser numérico", this);
        break;
      case numberValue <= 0 || !Number.isInteger(numberValue):
        statusInvalid(
          errSku,
          "El SKU debe ser un número entero positivo",
          this
        );
        break;
      default:
        statusValid(errSku, this);
        break;
    }
  });
  inputSku.addEventListener("focus", function () {
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
    errSku.innerHTML = null;
  });
  /* end validation input SKU*/

  /* validation select category */
  const errCategory = document.querySelector(".error-category");
  inputCategory.addEventListener("blur", function () {
    if (!this.options[this.selectedIndex].value) {
      statusInvalid(errCategory, "La categoria debe estar especificada", this);
    } else {
      statusValid(errCategory, this);
    }
  });
  /* end validation select category */

  /* validation input Stock*/
  const errStock = document.querySelector(".error-stock");
  inputStock.addEventListener("blur", function () {
    const value = this.value.trim();
    const numberValue = Number(value);
    switch (true) {
      case !value.length:
        statusInvalid(errStock, "El Stock es requerido", this);
        break;
      case isNaN(numberValue):
        statusInvalid(errStock, "El Stock debe ser numérico", this);
        break;
      case numberValue <= 0 || !Number.isInteger(numberValue):
        statusInvalid(
          errStock,
          "El Stock debe ser un número entero positivo",
          this
        );
        break;
      default:
        statusValid(errStock, this);
        break;
    }
  });
  inputStock.addEventListener("focus", function () {
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
    errStock.innerHTML = null;
  });
  /* end validation input Stock*/

  /* validation select available */
  const errAvailable = document.querySelector(".error-available");
  inputAvailable.addEventListener("blur", function () {
    const value = this.value;
    switch (true) {
      case value !== "yes" && value !== "No":
        statusInvalid(
          errAvailable,
          "La disponibilidad debe estar especificada",
          this
        );
        break;
      default:
        statusValid(errAvailable, this);
        break;
    }
  });

  inputAvailable.addEventListener("focus", function () {
    errAvailable.innerHTML = null;
    this.classList.remove("is-valid");
    this.classList.remove("is-invalid");
  });
  /* */

  /* validation input principal image */
  const errImgPrincipal = document.querySelector(".err-img-principal");
  inputImagePrincipal.addEventListener("change", function () {
    const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
    const files = Array.from(this.files);
    switch (true) {
      case !files.length:
        statusInvalid(
          errImgPrincipal,
          "Debes ingresar una imagen principal",
          this
        );
        break;

      case files.length > 1:
        statusInvalid(
          errImgPrincipal,
          "No puedes ingresar mas de 1 archivo",
          this
        );
        break;

      case files.some(
        (file) => !regExpFiles.test(file.name)
      ) /* file (1).rar */:
        statusInvalid(
          errImgPrincipal,
          "El formato de la imagen principal es invalido",
          this
        );
        break;

      default:
        statusValid(errImgPrincipal, this);
        break;
    }
  });
  /* end validation input principal image */

  /* validation input secondary image */
  const errImgSecondary = document.querySelector(".err-img-secondary");
  inputImageSecondary.addEventListener("change", function () {
    const regExpFiles = /.png|.jpg|.jpeg|.webp|.gif/i;
    const files = Array.from(this.files);
    switch (true) {
      case !files.length:
        statusInvalid(
          errImgSecondary,
          "Debes ingresar imágenes secundarias",
          this
        );
        break;
      case files.length > 4:
        statusInvalid(
          errImgSecondary,
          "No puedes ingresar mas de 4 archivos",
          this
        );
        break;
      case files.some((file) => !regExpFiles.test(file.name)):
        statusInvalid(
          errImgSecondary,
          "Uno de los archivos son inválidos. Formatos validos: .png .jpg .jpeg .webp .gif",
          this
        );
        break;
      default:
        statusValid(errImgSecondary, this);
        break;
    }
  });
  /* end validation input secondary image*/

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
          "La descripción debe ser alfanumérico",
          this
        );
        break;

      case value.length < 30 || value.length > 500:
        statusInvalid(
          errDescription,
          "La descripción debe tener un mínimo de 30 y un máximo de 500 caracteres",
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
  const formCreate = document.querySelector("#form-create-product");
  const errFormGeneral = document.querySelector(".err-form-general");
  const fieldsRequired = document.querySelectorAll(".field-required");
  formCreate.addEventListener("submit", function (event) {
    const isName = inputName.value?.trim();
    const isPrice = inputPrice.value?.trim();
    const isSku = inputSku.value?.trim();
    const isCategory =
      inputCategory.options[inputCategory.selectedIndex].value?.trim();
    const isStock = inputStock.value?.trim();
    const isImagePrincipal = inputImagePrincipal.files.length;
    const isImageSecondary = inputImageSecondary.files.length;
    const isDescription = inputDescription.value?.trim();
    event.preventDefault();
    if (this.id === "form-create-product") {
      switch (true) {
        case !isName:
        case !isPrice:
        case !isSku:
        case !isCategory:
        case !isStock:
        case !isImagePrincipal:
        //case !isImageSecondary:
        case !isDescription:
          existError = true;
          errFormGeneral.innerHTML = "Todos los campos son requeridos";
          errFormGeneral.classList.add("alert", "alert-danger");
          fieldsRequired.forEach((field) => (field.innerHTML = "*"));
          break;
      }
    } else {
      switch (true) {
        case !isName:
        case !isPrice:
        case !isSku:
        case !isCategory:
        case !isStock:
        case !isDescription:
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
/* change */
/* submit */
