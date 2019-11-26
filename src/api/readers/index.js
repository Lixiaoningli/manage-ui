import request from '@/axios/index.js'
// 分页查询读者列表
export function queryPage (data) {
  return request({
    url: '/readers/page',
    method: 'get',
    params: data
  })
}
// 添加读者
export function saveReaders(data) {
  return request({
    url: '/readers/save',
    method: 'post',
    data: data
  })
}
// 修改读者信息
export function update(data) {
  return request({
    url: '/readers/update',
    method: 'put',
    data: data
  })
}
// 删除读者
export function delRole(data) {
  return request({
    url: '/readers/delete',
    method: 'delete',
    data: data
  })
}