import request from '@/axios/index.js'
// 用户登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}
// 查询用户列表
export function queryPage(params) {
  return request({
    url: '/user/page',
    method: 'get',
    params: params
  })
}