// IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
  ];

  //selecionar os elementos
  const imcTable = document.querySelector("#imc-table")
  const weightInput = document.querySelector("#weight")
  const heightInput = document.querySelector("#height")

  const calcBtn = document.querySelector("#btnCalc")
  const btnClean = document.querySelector("#btnClean")

  const calcContainer = document.querySelector(".calc-container")
  const resultContainer = document.querySelector("#result-container")

  const imcNumber = document.querySelector("#imc-number span")
  const imcInfo = document.querySelector("#imc-info span")

  const backBtn = document.querySelector("#back-btn")

  //funcoes
  function createTable(data){
    data.forEach((item) => {
      const div = document.createElement("div")
      div.classList.add("table-data")

      const classification = document.createElement("p");
      classification.innerText = item.classification

      const info = document.createElement("p")
      info.innerText = item.info

      const obesity = document.createElement("p")
      obesity.innerText = item.obesity

      div.appendChild(classification)  //incluindo na div
      div.appendChild(info)
      div.appendChild(obesity)

      imcTable.appendChild(div) //incluindo na tabela
    })
  }

  function validDigits(text){
    return text.replace(/[ˆa-z]/g, "")
  }

  //calculo
  function calcImc(height, weight) {
    const imc = (weight / (height * height)).toFixed(2)
    return imc;
  }

  function cleanInputs(){
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.className = "";
    imcInfo.className = "";
  }

  function showOrHideResults(){
    calcContainer.classList.toggle("hide")
    resultContainer.classList.toggle("hide")
  }

  //init
  createTable(data)
  
//Eventos
const updateValue = [heightInput, weightInput]
 updateValue.forEach((input) =>{
  input.addEventListener("input", (e) => {

    const updatedValue = validDigits(e.target.value)
    e.target.value = updatedValue;
  })
})

calcBtn.addEventListener("click", (e) => {
  e.preventDefault()

  const weight = +weightInput.value.replace("," , ".")
  const height = +heightInput.value.replace("," , ".")

  if(!weight || !height) return;

  const imc = calcImc(height, weight)

  let info

  data.forEach((item) =>{
    if(imc >= item.min && imc <= item.max) {
      info = item.info
    }
  })

  if(!info) return;

  imcNumber.innerText = imc
  imcInfo.innerText = info

  //Mudança das cores nas informaçoes
  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults()
})

 btnClean.addEventListener("click", (e) =>{
  e.preventDefault()
  cleanInputs()
 })

 backBtn.addEventListener("click", (e) =>{
  showOrHideResults()
 })

  