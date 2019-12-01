import axios from 'axios'
import router from '@/router/index.js'
import { serialize } from "@/utils/util";

axios.defaults.timeout = 30000
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8'
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config => {
    // headers中配置serialize为true开启序列化
    if (config.methods === "post") {
      config.data = serialize(config.data);
      delete config.data.serialize;
    }
    return config;
  }
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应成功数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response.status === 403) {
    // 需要登录 清空浏览器sessionStorage并跳转到登录页面
    sessionStorage.clear()
    router.push({
      path: '/login'
    })
  }
  this.$Message.error('系统错误！');
  return Promise.reject(error);
});
export default axios 