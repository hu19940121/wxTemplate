import request from '@/utils/request'

export function login(phone, password) {
  return request({
    url: '/company/api/user/phoneLogin',
    method: 'post',
    data: {
      phone,
      password
    }
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
export function getInfo() {
  return request({
    url: '/company/api/user/getUserInfo',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
