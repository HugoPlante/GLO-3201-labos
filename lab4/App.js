import * as api from './api.js';

await api.createUser();

let todoList = document.getElementById('todo-list');
let addBtn = document.getElementById('add-button');

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

const renderAllTasks = async () => {
    const tasks = await api.getTasks();
    tasks.array.forEach(task => {
        let element = createTodoElement(task.name, task.id);
        todoList.appendChild(element);
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

    api.updateTask(taskId, text);
}

const createTask = async () => {
    let text = document.getElementById('new-todo-text').value;
    await api.addTask(text);
    renderAllTasks();
}

const removeTask = async (event) => {
    let todo = event.target.parentElement;
    todoList.removeChild(todo);

    let taskId = todo.dataset.id;
    api.removeTask(taskId);
    renderAllTasks();
}

addBtn.addEventListener('click', createTask);