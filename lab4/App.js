import * as api from './api.js';

await api.createUser();

let todoList = document.getElementById('todo-list');

const createTaskElement = (text, id) => {
    let todo = document.createElement('li');
    todo.className = 'todo-item';

    todo.dataset.id = id;

    let todoText = document.createElement('input');
    todoText.value = text;
    todo.appendChild(todoText);

    let saveBtn = document.createElement('button');
    saveBtn.innerHTML = 'Save';
    saveBtn.addEventListener('click', () => saveTask(event));
    todo.appendChild(saveBtn);

    let removeBtn = document.createElement('button');
    removeBtn.innerHTML = '🗑️';
    removeBtn.addEventListener('click', () => removeTask(event));
    todo.appendChild(removeBtn);

    return todo;
}

const renderAllTasks = async () => {
    const tasks = await api.getTasks();
    todoList.replaceChildren();
    tasks.forEach(task => {
        let element = createTaskElement(task.name, task.id);
        todoList.appendChild(element);
    });
}

const saveTask = async (event) => {
    let todo = event.target.previousSibling;
    console.log(todo)
    let taskId = todo.parentElement.dataset.id;
    let text = todo.value;
    console.log('task id: ' + taskId);
    console.log('text: ' + text);
    await api.updateTask(taskId, text);
    renderAllTasks();
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
    await api.removeTask(taskId);
    renderAllTasks();
}

let addBtn = document.getElementById('add-button');
addBtn.addEventListener('click', createTask);