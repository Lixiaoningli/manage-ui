import request from '@/axios/index.js'
// 分页查询借书列表
export function queryPage (data) {
  return request({
    url: '/boorowbooks/page',
    method: 'get',
    params: data
  })
}