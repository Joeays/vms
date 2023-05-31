const sysRouter = {
    path: '/sys',
    meta: {
        title: 'SYSTEM',
        icon: 'system',
        show: true,
    },
    component: (resolve) => require(['@/views/Home.vue'], resolve),
    redirect: '/sys/http',
    children: [
        {
            path: 'http',
            meta: {
                title: 'HTTP',
                icon: 'Laptop',
                show: true,
            },
            component: (resolve) => require(['@/views/http/index.vue'], resolve)
        },
        {
            path: 'arp',
            meta: {
                title: 'ARP',
                icon: 'random',
                show: true,
            },
            component: (resolve) => require(['@/views/arp/index.vue'], resolve)
        },
        {
            path: 'dns',
            meta: {
                title: 'DNS',
                icon: 'database',
                show: true,
            },
            component: (resolve) => require(['@/views/dns/index.vue'], resolve)
        }
    ]
}
export default sysRouter
