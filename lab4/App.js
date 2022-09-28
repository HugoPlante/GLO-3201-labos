const URL = 'https://glo3102lab4.herokuapp.com/';

let todoList = document.getElementById('todo-list');
let addBtn = document.getElementById('add-button');
addBtn.addEventListener('click', addTask);

document.getElementsByClassName('body')[0].addEventListener('load', getTasks());

async function getTasks() {
    // const response = await fetch(url, {
    // method: 'POST', 
    // });
}

function createTodoElement(task) {
    let todo = document.createElement('li');
    todo.className = 'todo-item';
    todo.innerHTML = task;

    todo.addEventListener('click', (event) => editTask(event));
    todo.addEventListener('blur', (event) => saveEditedTask(event));

    return todo;
}

function addTask() {
    let text = document.getElementById('new-todo-text').value;
    let todo = createTodoElement(text);
    todoList.appendChild(todo);
}

function removeTask(event) {
    let todo = event.target.parentElement;
    todoList.removeChild(todo);
}

function editTask(event) {
    console.log('double click :)');
    let todo = event.target;
    todo.contentEditable = true;
}

function saveEditedTask(event) {
    console.log('blur :)');
    let todo = event.target;
    todo.contentEditable = false;
}