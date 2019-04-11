import { sendMeg } from '@/api/push'
const push = {
  state: {
  },
  mutations: {

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
    }
  }
}

export default push
