import request from '@/utils/request'

export function sendMeg(params) {
  return request({
    url: '/company/api/push/sendMeg',
    method: 'post',
    data: {
      ...params
    }
  })
}

