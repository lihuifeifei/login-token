import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 存储token
    'access-token': localStorage.getItem('access-token') ?localStorage.getItem('access-token') : ''
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state['access-token'] = user['access-token'];
      localStorage.setItem('access-token', user['access-token']);
    }
  },
  actions: {
  },
  modules: {
  }
})
