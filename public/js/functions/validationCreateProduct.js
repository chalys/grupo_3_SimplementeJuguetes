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
const inputCharacterVersion = document.querySelector("[name='characterVersion']");
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

/*** EVENTOS DE MOUSE ***/

/* mouseover */
inputName.addEventListener("mouseover", function(){
  this.classList.add("border-danger")
})

/* mouseout */
inputName.addEventListener("mouseout", function(){
  this.classList.remove("border-danger")
})

/*** EVENTOS DEL TELCLADO ***/

const showLengthName = document.querySelector(".showLength-name")
//showLengthName.value = 0

/* keydown */
inputName.addEventListener("keydown", function(){
  showLengthName.innerHTML = this.value.length+1
})

/* keyup */
inputName.addEventListener("keyup", function(){
  const minLength = 5;
  const maxLength = 100;
  
  showLengthName.innerHTML = getMessage(this.value.length, maxLength)
})

const getMessage = (length, limitInput)=>`${length} de ${limitInput}`

/* keypress */
const showLengthDescription = document.querySelector(".showLength-description");

inputDescription.addEventListener("keypress",function(){
  const minLength = 30;
  const maxLength = 100;
  showLengthDescription.innerHTML = getMessage(this.value.length+1, maxLength)
})

/* EVENTOS DE FORMULARIO */
/* focus */
/* blur */
/* change */
/* submit */