import request from '@/axios/index.js'
// 图书分页列表
export function getPage (data) {
  return request({
    url: '/books/page',
    method: 'get',
    params: data
  })
}