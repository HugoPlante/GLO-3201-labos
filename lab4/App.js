const URL = 'https://glo3102lab4.herokuapp.com';
const USER_ID = '86cfd5f4-e547-4bac-b3ef-7436bf60250a'

let todoList = document.getElementById('todo-list');
let addBtn = document.getElementById('add-button');

const getTasks = async () => {
    const response = await fetch(`${URL}/${USER_ID}/tasks`, {
        method: 'GET',
    });

    const data = await response.json();

    for (let i = 0; i < data.tasks.length; i++) {
        let todo = createTodoElement(data.tasks[i].name, data.tasks[i].id);
        todoList.appendChild(todo);
    }
}

const createTodoElement = (text, id) => {
    let todo = document.createElement('li');
    todo.className = 'todo-item';

    todo.dataset.id = id;

    let todoText = document.createElement('p');
    todoText.innerHTML = text;
    todo.appendChild(todoText);

    let removeBtn = document.createElement('button');
    removeBtn.innerHTML = '🗑️';
    removeBtn.addEventListener('click', () => removeTask(event));
    todo.appendChild(removeBtn);

    todoText.addEventListener('click', (event) => editTask(event));
    todoText.addEventListener('blur', (event) => saveEditedTask(event));

    return todo;
}

const addTask = async () => {
    let text = document.getElementById('new-todo-text').value;
    const response = await fetch(`${URL}/${USER_ID}/tasks`, {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ name: text }),
    });

    const data = await response.json();

    let todo = createTodoElement(text, data.id);
    todoList.appendChild(todo);
}

const removeTask = async (event) => {
    let todo = event.target.parentElement;
    todoList.removeChild(todo);

    let taskId = todo.dataset.id;

    fetch(`${URL}/${USER_ID}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
}

const editTask = (event) => {
    let todo = event.target;
    todo.contentEditable = true;
}

const saveEditedTask = async (event) => {
    let todo = event.target;
    todo.contentEditable = false;

    let taskId = todo.parentElement.dataset.id;
    let text = todo.innerHTML;

    const response = await fetch(`${URL}/${USER_ID}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ name: text }),
    });
}

document.getElementsByTagName('body')[0].addEventListener('load', getTasks());
addBtn.addEventListener('click', addTask);