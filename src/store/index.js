/**
 * store.js -- Start
 * @author Joe
 * @date 2020/6/8 13:49
 **/

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 全局缓存
export default new Vuex.Store({
    modules: {
        cities: {
            namespaced: true,
            state: {
                cityName: '北京'
            },
            mutations: {
                cityFun(state) {
                    state.cityName = '上海'
                }
            }
        },
    },
    state: {
        data: {},
        temp: {
            name: '张三',
            age: 12,
            count: 0
        }
    },
    mutations: {
        addCount(state, num) {
            state.temp.count = state.temp.count + num
        },
        reduce(state) {
            state.temp.count--
        },
        SET_USER_INFO(state, obj) {
            if (typeof obj === 'object') {
                state.data = obj
            }
        },
        SET_USER_KEY_VALUE(state, obj) {
            if (obj.hasOwnProperty('key') && obj.hasOwnProperty('value')) {
                state.data[obj.key] = obj.value
            }
        }
    },
    actions: {
        set_userInfo: ({commit}, obj) => {
            commit('SET_USER_INFO', obj)
        },
        set_userInfo_keyValue: ({commit}, obj) => {
            commit('SET_USER_KEY_VALUE', obj)
        },
        asyncAdd(num) {
            console.log(num, 'actions num')
            num.commit('reduce')
        }
    }
})
