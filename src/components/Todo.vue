<template lang="pug">
md-layout(md-gutter)
  md-layout(md-column, md-gutter)
    form(novalidate, @submit.stop.prevent="submit")
      md-input-container(md-inline)
        label New Task
        md-input(v-model="task")
      md-button(@click="createTask", class="md-accent md-raised") Create Task
    md-layout(md-flex, class="taskRegion")
      TaskBox(
        v-for="task in tasks",
        :taskName="task.name", 
        :username="username",
        :taskId="task.id",
        :key="task.id")
</template>

<script>
import TaskBox from './Taskbox'
import Store from '../Store'
export default {
  store: Store,
  data () {
    return {
      task: ''
    }
  },
  computed: {
    username () {return this.$store.state.username},
    tasks () {return this.$store.state.tasks}
  },
  components: {
    TaskBox
  },
  methods: {
    createTask () {
      // assemble info for create task request
      const dest = 'http://localhost:3000/task'
      const createTaskInfo = {username: this.username, taskname: this.task}
      const jwtHeader = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('idToken')}}
      // create task
      this.$http.post(dest, createTaskInfo, jwtHeader)
      .then(result => {
        const taskData = result.data.data
        this.$store.dispatch('addTask', {name: taskData.taskname, id: taskData.id})
        this.task = ''
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
} 
</script>

<style lang="stylus">
form
  margin-left 1em
.taskRegion
  margin-top 1em
</style>