<template>
  <div>
    <h1>New Task</h1>
    <textarea v-model="name" placeholder="Enter task"></textarea>
    <button v-on:click="createTask">Save</button>
    <h1>My Tasks</h1>
    <task
      v-for="task of tasks"
      v-bind:key="task.id"
      v-bind:task="task"
      @deleteTask="deleteTask" />
  </div>
</template>

<script>
import * as api from '@/api'

import Task from '@/components/Task'

export default {
  components: {
    Task
  },

  data: () => ({
    name: '',
    tasks: []
  }),

  methods: {
    async createTask() {
      const newTask = await api.createTask(this.name)
      this.name = ''
      this.tasks.push(newTask)
    },

    deleteTask(id) {
      await api.deleteTask(id)
      let index = this.tasks.findIndex((task) => task.id === id)
      this.tasks.splice(index, 1)
    }
  },

  async created() {
    this.tasks = await api.getTasks()
  }
}
</script>
