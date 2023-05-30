import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const routes = [
    {
        path: '*',
        redirect: '/home',
        meta: {
            verify: false,
            title: '404',
        }
    },
    {
        path: '',
        component: (resolve) => require(['@/components/Layout.vue'], resolve),
        redirect: 'home',
        children: [
            {
                path: 'home',
                component: () => import('@/views/Home'),
                name: 'Home',
                meta: {title: '首页', icon: '', affix: true}
            }
        ]
    },
    {
        path: '/datacollection',
        meta: {
            verify: true,
            title: '数据采集',
            icon: '',
        },
        component: (resolve) => require(['@/components/Layout.vue'], resolve),
        children: [
            {
                path: 'dataimport',
                meta: {
                    verify: true,
                    title: '数据导入',
                    icon: 'sjdr',
                },
                component: (resolve) => require(['@/views/dataCollection/DataImport.vue'], resolve),
            },
            {
                path: 'dataaccess',
                meta: {
                    verify: true,
                    title: '数据接入',
                    icon: 'sjjr',
                },
                component: (resolve) => require(['@/views/dataCollection/DataAccess.vue'], resolve),
            },
            {
                path: 'datasourcemanage',
                meta: {
                    verify: true,
                    title: '数据源管理',
                    icon: 'sjygl',
                },
                component: (resolve) => require(['@/views/dataCollection/dataSourceManage.vue'], resolve),
            },
            {
                path: 'accesstaskmanage',
                meta: {
                    verify: true,
                    title: '接入任务管理',
                    icon: 'jrrwgl',
                },
                component: (resolve) => require(['@/views/dataCollection/accessTaskManage.vue'], resolve),
            }
        ]
    }
]
export default new Router({
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({y: 0}),
    base: process.env.BASE_URL,
    routes,
});
