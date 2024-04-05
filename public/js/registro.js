const toggle = document.querySelector(".toggle")
const toggle2 = document.querySelector(".toggle2")
const form1 = document.querySelector(".naregdes")
const form2 = document.querySelector(".form")


toggle.addEventListener("click", () => {
    form1.classList.toggle("f1")
    form2.classList.toggle("f2")
})
toggle2.addEventListener("click", () => {
    form1.classList.toggle("f1")
    form2.classList.toggle("f2")
})
