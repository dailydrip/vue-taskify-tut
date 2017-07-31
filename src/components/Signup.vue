<template lang="pug">
md-layout(md-gutter)
  md-layout(md-column, md-gutter)
    h1 Signup
    form(novalidate, @submit.stop.prevent="submit")
      md-input-container(md-inline)
        label Username
        md-input(v-model="username")
      md-input-container(md-inline, md-has-password=true)
        label Password
        md-input(v-model="password", type="password")
      md-input-container(md-inline, md-has-password=true)
        label Confirm Password
        md-input(v-model="confirm", type="password")
      md-button(@click="signup", class="md-accent md-raised") Sign Up
  md-layout(md-column)
</template>

<script >
import Store from '../Store'
export default{
  store: Store,
  data () {
    return {
      username: '',
      password: '',
      confirm: ''
    }
  },
  methods: {
    signup () {
      const self = this
      const jwtHeader = {'Authorization': 'Bearer ' + localStorage.getItem('idToken')}
      if (self.password !== self.confirm) {
        console.log('error')
      } else {
         self.$http.post('http://localhost:3000/user/new',{
          username: self.username,
          password: self.password
         })
         .then(result => {
           if (result.data.data !== 'success') {throw new Error('fail')}
           return self.$http.post('http://localhost:3000/token', {
             username: self.username,
             password: self.password,
             client_id: "my-awesome-clientid",
             client_secret: "my-awesome-clientSecret",
             grant_type: "password"
           })
         })
         .then(jwt => {
           const data = JSON.parse(jwt.data.data)
           localStorage.setItem('idToken', data.access_token)
           const jwtHeader = {'Authorization': 'Bearer ' + localStorage.getItem('idToken')}
           return self.$http.get('http://localhost:3000/user/' + this.username, {headers: jwtHeader})
         })
         .then(user => {
           this.$store.dispatch('login')
           this.$store.dispatch('setProfile', user.data.data)
           self.$router.push('/')
         })
         .catch(err => {
           console.log(err)
         })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
form
  margin-left 1em
h1
  margin-left 0.5em
</style>