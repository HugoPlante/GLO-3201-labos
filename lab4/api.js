const URL = 'https://glo3102lab4.herokuapp.com';
let USER_ID;

export const createUser = async () => {
    const response = await fetch(`${URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    USER_ID = data.id;
    console.log(USER_ID);
}

export const getTasks = async () => {
    const response = await fetch(`${URL}/${USER_ID}/tasks`, {
        method: 'GET',
    });

    const data = await response.json();

    for (let i = 0; i < data.tasks.length; i++) {
        let todo = createTodoElement(data.tasks[i].name, data.tasks[i].id);
        todoList.appendChild(todo);
    }
}


export const addTask = async (text) => {
    const response = await fetch(`${URL}/${USER_ID}/tasks`, {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ name: text }),
    });

    if (response.status != 200) console.log('Error while adding task');
    // const data = await response.json();

}

export const removeTask = async (id) => {
    const response = await fetch(`${URL}/${USER_ID}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (response.status != 200) console.log('Error while removing task');
}

export const updateTask = async (taskId, text) => {
    const response = await fetch(`${URL}/${USER_ID}/tasks/${taskId}`, {
        method: 'PUT',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ name: text }),
    });
    if (response.status != 200) console.log('Error while updating task');
}