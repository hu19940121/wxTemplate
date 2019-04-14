import request from '@/utils/request'
//  发送推送消息
export function sendMeg(params) {
  return request({
    url: '/company/api/push/sendMeg',
    method: 'post',
    data: {
      ...params
    }
  })
}
export function wxConfig(params) {
  return request({
    url: '/company/api/system/wxConfig',
    method: 'post',
    data: {
      ...params
    }
  })
}
export function getWxConfig() {
  return request({
    url: '/company/api/system/getWxConfig',
    method: 'get'
  })
}
export function updateWxConfig(params) {
  return request({
    url: '/company/api/system/updateWxConfig',
    method: 'post',
    data: {
      ...params
    }
  })
}

