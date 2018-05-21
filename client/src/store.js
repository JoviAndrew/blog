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
    author: '',
    posts: []
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
    },
    setPosts (state, postData) {
      postData.forEach(data => {
        let date = new Date(data.createdAt)
        data.createdAt = date
      })
      postData.sort(function (a, b) {
        return b.createdAt - a.createdAt
      })
      state.posts = postData
    }
  },
  actions: {
    getAllUsers ({ commit }) {
      axios.get('http://35.198.213.247/index/users')
        .then(function (userData) {
          commit('renewUsers', userData)
        })
        .catch(function (err) {
          swal(err.response.data.message)
        })
    },
    loginUser ({ commit }, loginData) {
      axios.post('http://35.198.213.247/index/login',
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
        })
    },
    registerUser ({ commit }, regisData) {
      if (regisData.password !== regisData.confirm) {
        swal('Password is not the same with Confirm Password', { icon: 'warning' })
      } else {
        let username = regisData.username
        let password = regisData.password
        let firstname = regisData.firstname
        let lastname = regisData.lastname
        axios.post('http://35.198.213.247/index/register',
          {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname
          })
          .then(function (response) {
            let message = response.data.message
            if (message !== 'success register a new user') {
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
          .catch(function (err) {
            alert(err)
          })
      }
    },
    getAllPosts ({ commit }, token) {
      axios.get('http://35.198.213.247/home/show',
        {
          headers: {token: token}
        })
        .then(function (postData) {
          commit('setPosts', postData.data.data)
        })
        .catch(function (err) {
          swal(err.response.data.message, {icon: 'warning'})
        })
    },
    addNewPost ({ dispatch }, postInput) {
      axios.post('http://35.198.213.247/home/post',
        postInput.data,
        {
          headers: { token: postInput.token }
        })
        .then(function (response) {
          swal(response.data.message, {icon: 'success'})
          dispatch('getAllPosts', postInput.token)
        })
        .catch(function (err) {
          swal(err.response.data.message)
        })
    },
    getPostsByAuthor ({ commit }, userId) {
      axios.get(`http://35.198.213.247/home/show/${userId}`)
        .then(function (postData) {
          commit('setPosts', postData.data.data)
        })
        .catch(function (err) {
          swal(err.response.data.message, {icon: 'warning'})
        })
    },
    updatePost ({ dispatch }, updateData) {
      axios.put(`http://35.198.213.247/home/update/${updateData.id}`,
        updateData.data,
        {
          headers: {token: updateData.token}
        })
        .then(function (response) {
          swal(response.data.message, {icon: 'success'})
          dispatch('getAllPosts', updateData.token)
        })
        .catch(function (err) {
          swal(err.response.data.message, {icon: 'warning'})
        })
    },
    deletePost ({ dispatch }, deleteData) {
      axios.delete(`http://35.198.213.247/home/delete/${deleteData.id}`,
        {
          headers: {token: deleteData.token}
        })
        .then(function (response) {
          swal(response.data.message, {icon: 'success'})
          dispatch('getAllPosts', deleteData.token)
        })
        .catch(function (err) {
          swal(err.response.data.message, {icon: 'warning'})
        })
    }
  }
})
