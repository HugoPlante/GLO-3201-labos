<template>
  <div>
    <textarea v-model="task.name" v-on:blur="updateTask"></textarea>
    <button v-on:click="$emit('deleteTask', task.id)">Delete</button>
  </div>
</template>

<script>
import * as api from '@/api'

export default {
  props: ['deleteTask', 'task'],

  methods: {
    updateTask() {
      const {id, name} = this.task
      api.updateTask(id, name)
    }
  }
}
</script>
