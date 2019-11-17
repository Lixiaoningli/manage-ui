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
// 添加用户
export function saveUser(data) {
  return request({
    url: '/user/save',
    method: 'post',
    data: data
  })
}
// 查看用户详情
export function queryById(id) {
  return request({
    url: '/user/queryById?id=' + id,
    method: 'get'
  })
}
// 修改用户信息
export function update(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data: data
  })
}
// 删除用户
export function delUser(data) {
  return request({
    url: '/user/delete',
    method: 'delete',
    data: data
  })
}