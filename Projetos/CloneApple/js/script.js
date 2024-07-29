const buttons = document.querySelectorAll(".imagePicker li")
const image = document.querySelector("#product-image")

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        console.log("Funcionou!!")
    

    buttons.forEach((btn) => 
        btn.querySelector(".color").classList.remove("selected")
    );

    const button = e.target;
    
    const id = button.getAttribute("id");

    button.querySelector(".color").classList.add("selected");

    image.classList.toggle("changing");
    image.setAttribute("src", `img/iphone_${id}_.jpg`)

    setTimeout(() => {
        image.classList.toggle("changing");
    }, 200)
  })
})