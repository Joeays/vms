/**
 * index.js -- Start
 * @author Joe
 * @date 2021/3/22 15:51
 **/
import Home from '@/views/Home.vue'
import sysRouter from './modules/sysRouter'

export default {
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            meta: {
                title: '404',
            },
            hidden: true,
            component: (resolve) => require(['@/views/404.vue'], resolve)
        },
        {
            path: '/401',
            meta: {
                title: '401',
            },
            hidden: true,
            component: (resolve) => require(['@/views/401.vue'], resolve)
        },
        {
            path: '',
            redirect: '/sys',
            hidden: true,
            component: Home,
        },
        {
            path: '/index',
            redirect: '/sys',
            hidden: true,
            component: Home,
        },
        {
            path: '/login',
            meta: {
                title: '登录'
            },
            hidden: true,
            component: (resolve) => require(['@/views/Login.vue'], resolve)
        },
        sysRouter
    ]
}
