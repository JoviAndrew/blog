<template>
  <div id="register">
  <div class="row">
    <div class="mainBody col-12">
      <div class="col-4"></div>
      <div class="login col-4">
        <h4 class="headerLogin"><strong>Register</strong></h4>
				<label>First Name:</label>
        <input type="text" placeholder="Tom" v-model="firstname">
				<label>Last name:</label>
        <input type="text" placeholder="Tommy" v-model="lastname">
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
			confirm: '',
			firstname: '',
			lastname: ''
		}
	},
	methods: {
		doRegister () {
			if(this.password != this.confirm){
				alert('Password is not the same with Confirm Password')
			}else{
				let username = this.username
				let password = this.password
				let firstname = this.firstname
				let lastname = this.lastname

				axios.post('http://localhost:3000/index/register', 
				{
					username: username,
					password: password,
					firstname: firstname,
					lastname: lastname
				})
				.then(function(response){
					alert(response.data.message)
					localStorage.setItem('token', response.data.token)
					localStorage.setItem('username', response.data.username)
					localStorage.setItem('firstname', response.data.firstname)
          localStorage.setItem('lastname', response.data.lastname)
					this.$router.push('/home')
				})
				.catch(function(err){
					alert(err)
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
