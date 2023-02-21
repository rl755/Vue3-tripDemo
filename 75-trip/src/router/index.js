import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    // 映射关系: path路径 与 component组件之间的映射关系
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: () => import('@/views/home/Home.vue')
        },
        {
            path: '/favor',
            component: () => import('@/views/favor/Favor.vue')
        },
        {
            path: '/order',
            component: () => import('@/views/order/Order.vue')
        },
        {
            path: '/message',
            component: () => import('@/views/message/Message.vue'),
            meta: {
                hideTabBar: true
            }
        },
        {
            path: '/city',
            component: () => import('@/views/city/city.vue'),
            /* meta: {
                hideTabBar: true
            } */
        },
        {
            path: '/search',
            component: () => import('@/views/search/search.vue'),
            meta: {
                hideTabBar: true
            }
        },
        {
            path: '/detail/:id',
            component: () => import('@/views/detail/detail.vue'),

        }
    ]
})

export default router;