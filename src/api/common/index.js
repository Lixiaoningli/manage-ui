import request from '@/axios/index.js'
// 文件上传
export function upload (data) {
  return request({
    url: '/fileUpload/upload',
    method: 'post',
    data: data
  })
}