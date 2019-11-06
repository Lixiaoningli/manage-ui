import Vue from 'vue'
import VueRouter from "vue-router";
import routes from "./routes.js"
Vue.use(VueRouter)
// 系统默认路由（主要包含没有任何权限的页面）
const router = new VueRouter({
    routes: routes
})
export default router