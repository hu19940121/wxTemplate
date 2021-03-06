import { login, logout, getInfo } from '@/api/login'
import { addUser } from '@/api/user'
import { setLoginStatus, getLoginStatus } from '@/utils/auth'

// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    // token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userInfo: {},
    isLogin: getLoginStatus()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_LOGIN_STATUS: (state, status) => {
      state.isLogin = status
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          commit('SET_LOGIN_STATUS', true)
          setLoginStatus(true)
          // const data = response.data
          // setToken('mockToken')
          // commit('SET_TOKEN', data.token)
          // console.log(response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       const data = response.data
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          commit('SET_USER_INFO', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addUser({ commit }, params) {
      return new Promise((resolve, reject) => {
        addUser(params).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       // removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          resolve()
          commit('SET_USER_INFO', {})
          commit('SET_LOGIN_STATUS', false)
          setLoginStatus(false)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        // commit('SET_TOKEN', '')
        commit('SET_USER_INFO', {})
        commit('SET_LOGIN_STATUS', false)
        setLoginStatus(false)
        // removeToken()
        resolve()
      })
    }
  }
}

export default user
