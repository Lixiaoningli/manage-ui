
export default [
    {
        path: '/login',
        name: '登录页面',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/home',
        name: '主页',
        component: () => import('@/views/index.vue'),
        children: [
            {
                path: 'user',
                name: '用户管理',
                component: () => import('@/views/user/index.vue')
            }
        ]
    }
]