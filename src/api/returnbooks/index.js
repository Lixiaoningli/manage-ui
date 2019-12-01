import request from '@/axios/index.js'
// 分页查询还书列表
export function queryPage (data) {
  return request({
    url: '/returnbooks/page',
    method: 'get',
    params: data
  })
}
// 添加还书记录
export function save (data) {
  return request({
    url: '/returnbooks/save',
    method: 'post',
    data: data
  })
}