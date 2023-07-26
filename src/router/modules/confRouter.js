const confRouter = {
    path: '/conf',
    meta: {
        title: 'config',
        icon: 'config',
        show: true,
    },
    component: (resolve) => require(['@/views/home.vue'], resolve),
    redirect: '/conf/event',
    children: [
        {
            path: 'mixin',
            meta: {
                title: 'mixin',
                icon: 'Laptop',
                show: true,
            },
            component: (resolve) => require(['@/views/mixin/index.vue'], resolve)
        },
        {
            path: 'event',
            meta: {
                title: 'event',
                icon: 'Laptop',
                show: true,
            },
            component: (resolve) => require(['@/views/event/index.vue'], resolve)
        },
        {
            path: 'table',
            meta: {
                title: 'table',
                icon: 'Laptop',
                show: true,
            },
            component: (resolve) => require(['@/views/table/index.vue'], resolve)
        },
    ]
}
export default confRouter
