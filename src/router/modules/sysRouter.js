const sysRouter = {
    path: '/sys',
    meta: {
        title: 'system',
        icon: 'system',
        show: true,
    },
    component: (resolve) => require(['@/views/home.vue'], resolve),
    redirect: '/sys/http',
    children: [
        {
            path: 'http',
            meta: {
                title: 'http',
                icon: 'Laptop',
                show: true,
            },
            component: (resolve) => require(['@/views/http/index.vue'], resolve)
        },
        {
            path: 'arp',
            meta: {
                title: 'arp',
                icon: 'random',
                show: true,
            },
            component: (resolve) => require(['@/views/arp/index.vue'], resolve)
        },
        {
            path: 'dns',
            meta: {
                title: 'dns',
                icon: 'database',
                show: true,
            },
            component: (resolve) => require(['@/views/dns/index.vue'], resolve)
        }
    ]
}
export default sysRouter
