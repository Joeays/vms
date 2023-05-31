const confRouter = {
    path: '/conf',
    meta: {
        title: 'CONFIG',
        icon: 'config',
        show: true,
    },
    component: (resolve) => require(['@/views/Home.vue'], resolve),
    redirect: '/conf/http',
    children: []
}
export default confRouter
