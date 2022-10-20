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

    if (response.status != 200) console.log('Error whule fetching tasks');

    const data = await response.json();

    return data.tasks;
}


export const addTask = async (text) => {
    const response = await fetch(`${URL}/${USER_ID}/tasks`, {
        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ name: text }),
    });

    if (response.status != 200) console.log('Error while adding task');
}

export const removeTask = async (taskId) => {
    const response = await fetch(`${URL}/${USER_ID}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (response.status != 204) console.log('Error while removing task');
}

export const updateTask = async (task) => {
    const response = await fetch(`${URL}/${USER_ID}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ name: task.name }),
    });
    if (response.status != 200) console.log('Error while updating task');
}