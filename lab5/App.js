import {
    createUser,
    getTasks,
    addTask,
    removeTask,
    updateTask,
} from './api.js';

const { createApp } = Vue;

createApp({
    data() {
        return {
            tasks: [],
            inputValue: '',
        };
    },
    methods: {
        async createTask() {
            await addTask(this.inputValue);
            this.inputValue = '';
            this.tasks = await getTasks();
        },
        async updateTask(task) {
            await updateTask(task);
            this.tasks = await getTasks();
        },
        async removeTask(task) {
            await removeTask(task.id);
            this.tasks = await getTasks();
        },
    },
    async mounted() {
        await createUser();
        this.tasks = await getTasks();
    },
}).mount('#parent');