import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Moment from 'moment'
import * as ECharts from 'echarts'
import 'default-passive-events'
import 'babel-polyfill'
import utils from './utils'
import store from './store'
import routes from './router'
import './assets/images/icons'
import Highlight from './components/highlight'

Vue.use(Highlight)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI, {size: 'small'})
Vue.prototype.moment = Moment
Vue.prototype.echarts = ECharts
Object.keys(utils.validate).forEach(key => {
    Vue.prototype[key] = utils.validate[key]
})
Vue.config.productionTip = false
const router = new VueRouter(routes)
router.beforeEach((to, from, next) => {
    window.scroll(0, 0)
    utils.storage.get('userInfo', obj => {
        console.log(to.meta, 1111111111)
        console.log(router.options.routes[3].path, 2222)
        if (to.meta.show && !obj.token) {
            Vue.prototype.$message({
                'type': 'warning', 'message': '无权访问此页面，请先登录！',
            })
            next({path: '/login', query: {url: to.fullPath}})
        } else {
            next()
        }
    })
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
