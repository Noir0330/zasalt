const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");

// stroage
class Storage {
  static addToStorage(todoArray) {
    let storage = localStorage.setItem("todo", JSON.stringify(todoArray));
    return storage;
  }

  static getStorage() {
    let storage =
      localStorage.getItem("todo") === null
        ? []
        : JSON.parse(localStorage.getItem("todo"));
    return storage;
  }
}
// 0 array
let todoArray = Storage.getStorage();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = Math.random() * 1000000;
  console.log(id);
  const todo = new Todo(id, input.value);
  todoArray = [...todoArray, todo];
  UI.displayData();
  UI.clearInput();
  UI.removeTodo();
  UI.editTodo();
  Storage.addToStorage(todoArray);
});

// display the todo in the DOM
class UI {
  static displayData() {
    let displayData = todoArray.map(
      (item) =>
        ` <div class="todo">
            <input class= "newInput" readonly value = "${item.todo}" />
            <span><span class="edit" data-id = ${item.id}>edit</span><span class="remove" data-id = ${item.id}>delete</span>
          </span>
          </div>`
    );

    lists.innerHTML = displayData.join(" ");
  }
  static clearInput() {
    input.value = "";
  }

  static removeTodo() {
    lists.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        e.target.parentNode.parentElement.remove();
      }
      let btnId = e.target.dataset.id;
      UI.removeArrayTodo(btnId);
    });
  }
  static removeArrayTodo(id) {
    todoArray = todoArray.filter((item) => item.id !== +id);
    Storage.addToStorage(todoArray);
  }
  static editTodo() {
    lists.addEventListener("click", (e) => {
      if (e.target.classList.contains("edit")) {
        let newInput = e.target.parentNode.previousElementSibling;
        if (e.target.innerHTML == "edit") {
          newInput.removeAttribute("readonly");
          newInput.focus();
          newInput.style.color = "green";
          e.target.textContent = "save";
        } else {
          newInput.setAttribute("readonly", "readonly");
          e.target.textContent = "edit";
          // newInput.style.color = "#000";
        }
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  UI.displayData();
  UI.removeTodo();
});

// make object instance
class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}
