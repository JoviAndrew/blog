<template>
<div id="index">
  <div class="row">
    <div class="mainBody col-12">
      <div class="col-xs-12 col-sm-12 col-lg-4"></div>
      <div class="login col-xs-12 col-sm-12 col-lg-4">
        <h4 class="headerLogin"><strong>Login</strong></h4>
        <label>Username:</label>
        <input type="text" placeholder="email@mail.com" v-model="username">
        <label>Password:</label>
        <input type="password" placeholder="Password"  v-model="password">
        <button class="btn btn-primary" @click="doLogin">Login</button>
        <button class="btn btn-link" @click="goToRegister">Don't have an account? Register</button>
      </div>
      <div class="col-xs-12 col-sm-12 col-lg-4 mt-5">
        <h3>See their work!</h3>
        <ul class="list-group">
          <li class="list-group-item" v-for="(user, index) in users" :key="index" @click="goToBlog(user)">{{user.firstname}} {{user.lastname}}</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'index',
  computed: mapState([
    'users'
  ]),
  created () {
    this.getAllUsers()
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    doLogin () {
      let username = this.username
      let password = this.password
      let self = this

      axios.post('http://35.187.230.112/index/login', {username: username, password: password})
        .then(function (response) {
          alert(response.data.message)
          console.log(response.data)
          self.$router.push('/home')
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('firstname', response.data.firstname)
          localStorage.setItem('lastname', response.data.lastname)
        })
        .catch(function (err) {
          alert('Username or password is incorrect')
          console.log(err)
        })
    },
    goToRegister () {
      this.$router.push('/register')
    },
    getAllUsers() {
      this.$store.dispatch('getAllUsers')
    },
    goToBlog(user){
      let userData = {
        userId: user._id,
        firstname: user.firstname,
        lastname: user.lastname
      }
      this.$router.push(`/blog/${userData.userId}`)
    }
  }
}
</script>

<style>

.headerLogin{
  margin: 3%;
  margin-bottom: 5%
}

.login{
  display: flex;
  flex-direction: column;
  border: 2px solid rgb(71, 71, 71);
  border-radius: 25px;
  margin: 3%
}

.mainBody{
  display: flex;
  justify-content: center
}

.btn{
  margin: 2%
}
</style>
