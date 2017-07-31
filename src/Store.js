import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let state = {
    username: '',
    id: '',
    // task = Object => {name: String, id: String}
    tasks: [],
    authenticated: false
  }

const mutations = {
  setProfile (state, profile) {
    state.username = profile.username
    state.id = profile.id
    profile.tasks.forEach(el => {
      state.tasks.push({name: el.name, id: el._id})
    })
  },
  addTask (state, task) {
    state.tasks.push({name: task.name, id: task.id})
  },
  removeTask (state, taskname) {
    state.tasks.forEach((el, index) => {
      if (el.name === taskname) {
        state.tasks.splice(index, 1)
      }
    })
  },
  editTask (state, task) {
    state.tasks.forEach((el, index) => {
      if (el.id === task.id) {
         state.tasks[index].name = task.newTaskName
      }
    })
  },
  logout (state) {
    state.username = ''
    state.id = ''
    state.tasks = [],
    state.authenticated = false
  },
  login (state) {
    state.authenticated = true
  }
}

const actions = {
  setProfile (context, profile) {
    context.commit('setProfile', profile)
  },
  addTask (context, task) {
    context.commit('addTask', task)
  },
  removeTask (context, taskname) {
    context.commit('removeTask', taskname)
  },
  editTask (context, task) {
    context.commit('editTask', task)
  },
  logout (context) {
    context.commit('logout')
  },
  login (context) {
    context.commit('login')
  }
}

export default new Vuex.Store({state, mutations, actions})