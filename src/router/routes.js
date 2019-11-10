
export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: '登录页面',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/home',
        name: '主页',
        component: () => import('@/views/home/index.vue'),
        redirect: '/home/index',
        children: [
            {
                path: 'index',
                name: '首页',
                component: () => import('@/views/index.vue')
            },
            {
                path: 'user',
                name: '用户管理',
                component: () => import('@/views/user/index.vue')
            },
            {
                path: 'role',
                name: '角色管理',
                component: () => import('@/views/role/index.vue')
            },
            {
                path: 'readers',
                name: '读者管理',
                component: () => import('@/views/readers/index.vue')
            },
            {
                path: 'books',
                name: '图书管理',
                component: () => import('@/views/books/index.vue')
            },
            {
                path: 'boorowbooks',
                name: '借书管理',
                component: () => import('@/views/boorowbooks/index.vue')
            },
            {
                path: 'returnbooks',
                name: '还书管理',
                component: () => import('@/views/returnbooks/index.vue')
            }
        ]
    }
]