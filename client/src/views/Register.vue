<template>
  <div id="register">
  <div class="row">
    <div class="mainBody col-12">
      <div class="col-4"></div>
      <div class="login col-4">
        <h4 class="headerLogin"><strong>Register</strong></h4>
				<label>First Name:</label>
        <input class="form-control" type="text" placeholder="Tom" v-model="firstname">
				<label>Last Name:</label>
        <input class="form-control" type="text" placeholder="Tommy" v-model="lastname">
        <label>Username:</label>
        <input class="form-control" type="text" placeholder="email@mail.com" v-model="username">
        <label>Password:</label>
        <input class="form-control" type="password" placeholder="6 characters alphanumeric"  v-model="password">
        <label>Confirm Password:</label>
        <input class="form-control" type="password" placeholder="Password" v-model="confirm">
        <div class="col-12">
					<button class="btn btn-primary" @click="doRegister">Register</button>
					<router-link class="btn btn-danger" to="/">Cancel</router-link>
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
			let regisData = {
				username: this.username,
				password: this.password,
				firstname: this.firstname,
				lastname: this.lastname,
				confirm: this.confirm
			}
			this.$store.dispatch('registerUser', regisData)
		}
	},
}
</script>

<style scoped>
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
