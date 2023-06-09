/**
 * index.js -- Start
 * @author Joe
 * @date 2021/3/22 15:51
 **/
import sysRouter from './modules/sysRouter'
import confRouter from "./modules/confRouter"

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
            redirect: '/conf',
            hidden: true,
            component: (resolve) => require(['@/views/home.vue'], resolve),
        },
        {
            path: '/index',
            redirect: '/conf',
            hidden: true,
            component: (resolve) => require(['@/views/home.vue'], resolve),
        },
        {
            path: '/login',
            meta: {
                title: '登录'
            },
            hidden: true,
            component: (resolve) => require(['@/views/login.vue'], resolve)
        },
        sysRouter,
        confRouter
    ]
}
