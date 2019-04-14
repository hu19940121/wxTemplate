import request from '@/utils/request'
//  新增机构
export function addUser(params) {
  return request({
    url: '/company/api/user/addUser',
    method: 'post',
    data: {
      ...params
    }
  })
}
