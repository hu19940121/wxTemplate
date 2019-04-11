import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import push from './modules/push'

import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    push
  },
  getters,
  plugins: [createPersistedState({
    reducer(val) {
      // console.log('createPersistedState', val)
      return {
      // 只储存state中的userInfo
        'user': val.user
      }
    }
  })]
})

export default store
