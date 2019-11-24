import Vue from 'vue'
import VueRouter from "vue-router";
import routes from "./routes.js"
import store from "@/store/index.js"
Vue.use(VueRouter)
// 系统默认路由（主要包含没有任何权限的页面）
const router = new VueRouter({
    routes: routes
})
// 添加前置路由
router.beforeEach((to, from, next) => {
    // 当跳转登录页面时不执行判断是否登录
    if (to.path !== '/login') {
        /**
         * sessionStorage 是浏览器存储session信息，当窗口关闭时则被认为会话结束
         */
        if (!sessionStorage.getItem("user")) {
            // 未登录转发到登录页面去登录
            next({
                path: '/login'
            })
            return
        }
    }
    // 已经登录则放行
    next()
})
export default router