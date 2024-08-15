const btnPassword = document.querySelector(".linkPassword")
const containerPassword = document.querySelector(".container-password")
const password = document.querySelector("#password")
const copy = document.querySelector("#copy")
const slider = document.querySelector("#slider")
const valor = document.querySelector("#valor")
const gerarSenha = document.querySelector(".gerarSenha")

let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%&*"
let novaSenha = "";

valor.innerHTML = slider.value
slider.oninput = function () { //função para aparecer a quantidade de caracter no slide
    valor.innerHTML = slider.value
}

gerarSenha.addEventListener("click", (e) =>{
    e.preventDefault()

    let pass = "";
    for(let i = 0, n = charset.length; i < slider.value; i++ ) {
        pass+= charset.charAt(Math.floor(Math.random() * n))
    }

    password.innerHTML = pass
    novaSenha = pass
})

btnPassword.addEventListener("click", (e) => {
    e.preventDefault()
    containerPassword.classList.toggle("hide")
})

    password.addEventListener("click", (e) => {

        alert("Senha copiada com sucesso ")
        navigator.clipboard.writeText(novaSenha)
    })

