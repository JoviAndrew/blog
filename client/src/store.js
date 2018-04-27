import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
    }
  }
})
