import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    users: [],
    author: ''
  },
  mutations: {
    changeStatusTrue (state) {
      state.isLogin = true
    },
    changeStatusFalse (state) {
      state.isLogin = false
    },
    renewUsers (state, userData) {
      state.users = userData.data.data
    },
    storeUserId (state, userData) {
      state.author = userData
    }
  },
  actions: {
    getAllUsers({commit}){
      axios.get('http://localhost:3000/index/users')
      .then(function(userData){
        commit('renewUsers', userData)
      })
      .catch(function(err){
        alert(err)
      })
    },
    loginUser ({commit}, loginData) {
      axios.post('http://localhost:3000/index/login',
      {
        username: loginData.username, 
        password: loginData.password
      })
        .then(function (response) {
          let message = response.data.message
          if (message !== 'Success login') {
            swal(message, {icon: 'warning'})
          } else {
            swal(message, {icon: 'success'})
            router.push('/home')
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('firstname', response.data.firstname)
            localStorage.setItem('lastname', response.data.lastname)
            commit('changeStatusTrue')
          }
        })
        .catch(function (err) {
          swal(err.response.data.message, {icon: 'warning'})
          console.log(err)
        })
    },
    registerUser ({commit}, regisData) {
      if(regisData.password != regisData.confirm){
				alert('Password is not the same with Confirm Password')
			}else{
				let username = regisData.username
				let password = regisData.password
				let firstname = regisData.firstname
				let lastname = regisData.lastname

				axios.post('http://localhost:3000/index/register', 
				{
					username: username,
					password: password,
					firstname: firstname,
					lastname: lastname
				})
				.then(function(response){
          let message = response.data.message
          if (message !== 'Success login') {
            swal(message, {icon: 'warning'})
          } else {
            swal(message, {icon: 'success'})
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('firstname', response.data.firstname)
            localStorage.setItem('lastname', response.data.lastname)
            router.push('/home')
            commit('changeStatusTrue')
          }
				})
				.catch(function(err){
					alert(err)
        })
      }
    }
  }
})
