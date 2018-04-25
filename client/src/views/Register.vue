<template>
  <div id="register">
  <div class="row">
    <div class="col-12">
      <h1>N-Blog</h1>
    </div>
    <div class="mainBody col-12">
      <div class="col-4"></div>
      <div class="login col-4">
        <h4 class="headerLogin"><strong>Register</strong></h4>
        <label>Username:</label>
        <input type="text" placeholder="email@mail.com" v-model="username">
        <label>Password:</label>
        <input type="password" placeholder="6 characters alphanumeric"  v-model="password">
        <label>Confirm Password:</label>
        <input type="password" placeholder="Password" v-model="confirm">
        <div class="col-12">
            <button class="btn btn-primary" @click="doRegister">Register</button>
            <button class="btn btn-danger" @click="goToLogin">Cancel</button>
        </div>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</div>
</template>

<script>

import axios from 'axios'

export default {
name: 'register',
	data () {
		return {
			username: '',
			password: '',
			confirm: ''
		}
	},
	methods: {
		doRegister () {
			if(this.password != this.confirm){
				alert('Password is not the same with Confirm Password')
			}else{
				let username = this.username
				let password = this.password

				axios.post('http://localhost:3000/index/register', 
				{
					username: username,
					password: password
				})
				.then(function(response){
					alert(response.data.message)
					localStorage.setItem('token', response.data.token)
					localStorage.setItem('username', response.data.username)
					this.$router.push('/home')
				})
				.catch(function(err){
					alert('Something went wrong')
					console.log(err)
				})
			}
		},
		goToLogin () {
				this.$router.push('/')
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
  border: 2px solid black;
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
