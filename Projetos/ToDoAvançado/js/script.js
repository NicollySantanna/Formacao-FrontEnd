const formNewTask = document.querySelector(".formNewTask")
const inputTask = document.querySelector("#inputTask")
const btnTask = document.querySelector("#btnTask")

const containerList = document.querySelector(".containerList")

const btnAll = document.querySelector("#all")
const btnTodo = document.querySelector("#todo")
const btncompleted = document.querySelector("#completed")
const btnClear= document.querySelector("#clear")
const footer = document.querySelector(".footer")

const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const editForm = document.querySelector(".editForm")
const editInput = document.querySelector("#edit-input")

let oldInputValue; // Esta variável armazena o valor anterior do input no modo de edição

//funcoes
const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("ul")
    todo.classList.add("listItems")

    const todoLi = document.createElement("li")
    todoLi.classList.add("item")

    todo.appendChild(todoLi)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("btnCheck")
    doneBtn.innerHTML = '<i class="far fa-check-circle"></i>'
    todoLi.appendChild(doneBtn)

    const todoText = document.createElement("p")
    todoText.innerText = text
    todoLi.appendChild(todoText)

    const btnCancel = document.createElement("button")
    btnCancel.classList.add("btnCancel")
    btnCancel.innerHTML = '<i class="fas fa-trash"></i>'
    todoLi.appendChild(btnCancel)

    const btnEdit = document.createElement("button")
    btnEdit.classList.add("btnEdit")
    btnEdit.innerHTML = '<i class="fas fa-pen"></i>'
    todoLi.appendChild(btnEdit)

    //Utilizando dados da localStorage
    if(done) {
        todo.classList.add("done")
    }

    if(save) {
        saveTodoLocalStorage({text, done })
    }

    containerList.appendChild(todo)

   inputTask.value = "";
   inputTask.focus();
}

//Alterna entre o formulário de edição e o formulário de criação de novas tarefas
const toggleForms = () => {
editForm.classList.toggle("hide")
formNewTask.classList.toggle("hide")
containerList.classList.toggle("hide")
footer.classList.toggle("hide")
}

//Atualiza o texto de uma tarefa existente que está sendo editada.
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".item")
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("p")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text

            updateTodoLocalStorage(oldInputValue, text)
        }
    })
} 

//eventos

//Adicionar uma nova tarefa
formNewTask.addEventListener("submit", (e) => {
    e.preventDefault() 

    const taskValue = inputTask.value;
 
    if(taskValue) {
        saveTodo(taskValue)
    }
})

document.addEventListener("click",(e) => {
    const targetEl = e.target //Identifica qual elemento foi clicado
    const parentEl = targetEl.closest("li") //encontra o elemento li mais próximo, que é o contêiner da tarefa.

    let todoTitle;
    if(parentEl && parentEl.querySelector("p")){
        todoTitle = parentEl.querySelector("p").innerText;
    }


    if(targetEl.classList.contains("fa-check-circle")){
        parentEl.classList.toggle("done")
        updateTodoStatusLocalStorage(todoTitle)
    }

    if(targetEl.classList.contains("fa-trash")){
        parentEl.remove()
        removeTodoLocalStorage(todoTitle)
    }

    if(targetEl.classList.contains("fa-pen")){
       toggleForms()

       editInput.value = todoTitle
       oldInputValue = todoTitle
    }
});

cancelEditBtn.addEventListener("click", (e) =>{
    e.preventDefault()

    toggleForms();
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value
    if(editInputValue){
        updateTodo(editInputValue)
    }

    toggleForms()
})

//Filtros
btnTodo.addEventListener("click", () => {
    const todos = document.querySelectorAll(".listItems")
    todos.forEach((todo) => {
        if(!todo.querySelector(".item").classList.contains("done")){
            todo.style.display = ("block")
        } else{
            todo.style.display = ("none")
        }
    })
})

btncompleted.addEventListener("click", () => {
    const todos = document.querySelectorAll(".listItems")
    todos.forEach((todo) => {
        if(todo.querySelector(".item").classList.contains("done")){
            todo.style.display = ("block")
        } else{
            todo.style.display = ("none")
        }
    })
})

btnAll.addEventListener("click", () => {
    const todos = document.querySelectorAll(".listItems")
    todos.forEach((todo) => {
        todo.style.display = "block"
    })
})

btnClear.addEventListener("click", () => {
    const todos = document.querySelectorAll(".listItems")
    todos.forEach((todo) => {
        todo.remove()
    })
})

//LocalStorage

// Pega o array de tarefas existente
const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage()

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0)
    })
}

 const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage()

    todos.push(todo)

    localStorage.setItem("todos", JSON.stringify(todos))
 };

 const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();
    const filteredTodos = todos.filter((todo) => todo.text !== todoText)

    localStorage.setItem("todos", JSON.stringify(filteredTodos))
 }

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage()

 todos.map((todo) => todo.text === todoText ? (todo.done = !todo.done) : null)

    localStorage.setItem("todos", JSON.stringify(todos))
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage()

 todos.map((todo) => todo.text === todoOldText ? (todo.text = todoNewText) : null)

    localStorage.setItem("todos", JSON.stringify(todos))
};

 loadTodos()