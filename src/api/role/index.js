import request from '@/axios/index.js'
// 查询角色列表
export function queryPage(params) {
  return request({
    url: '/role/page',
    method: 'get',
    params: params
  })
}
// 添加角色
export function saveRole(data) {
  return request({
    url: '/role/save',
    method: 'post',
    data: data
  })
}
// 查看角色详情
export function queryById(id) {
  return request({
    url: '/role/queryById?id=' + id,
    method: 'get'
  })
}
// 修改角色信息
export function update(data) {
  return request({
    url: '/role/update',
    method: 'put',
    data: data
  })
}
// 删除角色
export function delRole(data) {
  return request({
    url: '/role/delete',
    method: 'delete',
    data: data
  })
}