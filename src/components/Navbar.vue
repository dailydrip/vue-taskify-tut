<template lang="pug">
md-toolbar
  router-link(tag="md-button", to="/", class="md-icon-button")
    md-icon home
  h2(class="md-title", style="flex: 1") Taskify
  md-button(@click="logout", v-if="authenticated") logout
  router-link(tag="md-button", to="/login", v-if="!authenticated") Login
  router-link(tag="md-button", to="/signup", v-if="!authenticated") Sign Up
</template>

<script> 
import router from '../router/index'
import Store from '../Store'
export default {
  store: Store,
  computed: {
    authenticated: () => {
      return Store.state.authenticated
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('idToken')
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus">
  
</style>