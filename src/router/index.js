import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import SignUp from '@/components/Signup'
import Todo from '@/components/Todo'
import Store from '../Store'

Vue.use(Router)
Vue.use(Vuex)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todo',
      component: Todo,
      beforeEnter: (to, from, next) => {
        if (Store.state.authenticated) {
           next()
         } else {
           next('/login')
         } 
      }
    },
    {
      path:'/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignUp
    }
  ]
})
