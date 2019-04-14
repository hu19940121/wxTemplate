import { sendMeg, wxConfig, getWxConfig, updateWxConfig } from '@/api/push'
const push = {
  state: {
    wxConfig: null
  },
  mutations: {
    SET_WXCONFIG: (state, wxConfig) => {
      state.wxConfig = wxConfig
    }
  },
  actions: {
    sendMeg({ commit }, params) {
      return new Promise((resolve, reject) => {
        sendMeg(params).then(response => {
          console.log(response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    addWxConfig({ commit }, params) {
      console.log('params', params)
      return new Promise((resolve, reject) => {
        wxConfig(params).then(response => {
          console.log(response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getWxConfig({ commit }) {
      return new Promise((resolve, reject) => {
        getWxConfig().then(response => {
          commit('SET_WXCONFIG', response.data)
          console.log(response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateWxConfig({ commit }, params) {
      return new Promise((resolve, reject) => {
        updateWxConfig(params).then(response => {
          commit('SET_WXCONFIG', response.data)
          console.log(response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default push
