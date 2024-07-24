const container = document.querySelector(".container")
const qrCodeBtn = document.querySelector(".qr-form button")

const qrCodeInput = document.querySelector(".qr-form input")

const qrCodeImg = document.querySelector(".qr-code img")

//Funcoes
function generateQrCode() {

    const qrCodeInputValue = qrCodeInput.value;

    if(!qrCodeInputValue) return;

    qrCodeBtn.innerText = "Gerando código...";

    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`
    
    qrCodeImg.addEventListener("load", () => {
        container.classlist.add("active");
    })
    qrCodeBtn.innerText = "Código gerado!";
}

//Eventos
qrCodeBtn.addEventListener("click", () => {
generateQrCode()
})


qrCodeInput.addEventListener("keydown", (e) => {
    if(e.code === 'Enter'){
        generateQrCode()
    }
})

// Limpar área do código
qrCodeInput.addEventListener("keyup", () => {
    if (!qrCodeInput.value) {
      container.classList.remove("active");
      qrCodeBtn.innerText = "Gerar QR Code";
    }
  });