import request from '@/axios/index.js'
// 图书分页列表
export function getPage (data) {
  return request({
    url: '/books/page',
    method: 'get',
    params: data
  })
}

// 添加图书
export function saveBooks(data) {
  return request({
    url: '/books/save',
    method: 'post',
    data: data
  })
}
// 修改图书信息
export function update(data) {
  return request({
    url: '/books/update',
    method: 'put',
    data: data
  })
}
// 删除图书
export function delBooks(data) {
  return request({
    url: '/books/delete',
    method: 'delete',
    data: data
  })
}