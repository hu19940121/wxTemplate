import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import push from './modules/push'
import permissionRouters from './modules/permissionRouters'

import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    push,
    permissionRouters
  },
  getters,
  plugins: [createPersistedState({
    reducer(val) {
      // console.log('createPersistedState', val)
      return {
      // 只储存state中的userInfo
        // 'user': val.user
        // user: val.user
      }
    }
  })]
})

export default store
