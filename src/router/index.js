/**
 * index.js -- Start
 * @author Joe
 * @date 2021/3/22 15:51
 **/
import Home from '@/views/Home.vue'

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
            redirect: '/http',
            hidden: true,
            component: Home,
        },
        {
            path: '/index',
            redirect: '/http',
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
        {
            path: '/http',
            redirect: '/http',
            component: Home,
            children: [
                {
                    path: '/http',
                    meta: {
                        title: 'HTTP',
                        icon: 'Laptop',
                        show: true,
                    },
                    component: (resolve) => require(['@/views/http/index.vue'], resolve)
                },
                {
                    path: '/arp',
                    meta: {
                        title: 'ARP',
                        icon: 'random',
                        show: true,
                    },
                    component: (resolve) => require(['@/views/arp/index.vue'], resolve)
                },
                {
                    path: '/dns',
                    meta: {
                        title: 'DNS',
                        icon: 'random',
                        show: true,
                    },
                    component: (resolve) => require(['@/views/dns/index.vue'], resolve)
                }
            ]
        },
    ]
}
