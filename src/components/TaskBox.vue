<template lang="pug">
md-card#taskbox
  md-layout(md-gutter)
    md-layout(md-row, md-gutter, v-if="taskEditor === false")
      h1 {{taskName}}
      div#buttongroup
        md-button(class='md-fab md-primary md-mini', @click="startEditor")
          md-icon edit
        md-button(class='md-fab md-warn md-mini', @click="deleteTask")
          md-icon delete
    md-layout(md-row, md-gutter, v-else)
      form(novalidate, @submit.stop.prevent="submit")
        md-input-container(md-inline)
          label New Task Name
          md-input(v-model="newTaskName")
        md-button(class="md-primary", @click="editTask") Submit
        md-button(class="md-warn", @click="startEditor") Cancel
</template>

<script>
import Store from '../Store'
export default {
  store: Store,
  data () {
    return {
      taskEditor: false,
      newTaskName: ''
    }
  },
  props: [
    'taskName',
    'username',
    'taskId'
  ],
  methods: {
    startEditor () {
      this.taskEditor === false ? this.taskEditor = true : this.taskEditor = false
    },
    editTask () {
      const jwtHeader = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('idToken')}}
      this.$http.put('http://localhost:3000/task', {
        taskId: this.taskId,
        newTaskName: this.newTaskName
      }, jwtHeader)
      .then(response => {
        this.$store.dispatch('editTask', {id: this.taskId, newTaskName: this.newTaskName})
        this.taskEditor = false
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteTask () {
      const dest = 'http://localhost:3000/task/' + this.username + '/' + this.taskId
      const jwtHeader = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('idToken')}}
      this.$http.delete(dest, jwtHeader)
      .then(response => {
        this.$store.dispatch('removeTask', this.taskName)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#taskbox
  padding 1em 1em 1em 1em
  margin-left 1em
  margin-top 1em
#buttongroup 
  margin-left 3em
</style>