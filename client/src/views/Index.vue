<template>
<div id="index">
  <div class="row">
    <div class="mainBody col-12">
      <div class="col-xs-12 col-sm-12 col-lg-4"></div>
      <div class="login col-xs-12 col-sm-12 col-lg-4">
        <h4 class="headerLogin"><strong>Login</strong></h4>
        <label>Username</label>
        <input class="form-control" type="text" placeholder="email@mail.com" v-model="username">
        <label>Password</label>
        <input class="form-control" type="password" placeholder="Password"  v-model="password">
        <button class="btn btn-primary" @click="doLogin">Login</button>
        <router-link class="btn btn-link" to="/register">Don't have an account? Register</router-link>
      </div>
      <div class="col-xs-12 col-sm-12 col-lg-4">
      </div>
    </div>
  </div>
  <div class="row">
    <div class="listOfBlogs">
      <h3>See their work!</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="(user, index) in users" :key="index">
          <router-link :to="{ name: 'blog', params: { userId: user._id }}">
            {{user.firstname}} {{user.lastname}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'index',
  computed: {
    ...mapState([
      'users'
    ])  
  },
  created () {
    this.$store.dispatch('getAllUsers')
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    doLogin () {
      let loginData = {
        username: this.username,
        password: this.password
      }
      let username = this.username
      let password = this.password
      this.$store.dispatch('loginUser', loginData)
    },
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

.listOfBlogs {
  margin-top: 3%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%
}
</style>
