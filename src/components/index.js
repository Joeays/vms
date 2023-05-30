/**
 * index.js
 * 组件自动化导入
 * @author Joe
 * @date 2023/5/15 15:53
 **/

import Vue from 'vue'

let array = ['./index.js', './highlight.js']
const requireComponent = require.context('@/', true, /\.vue$/)
requireComponent.keys().forEach(fileName => {
    if (!array.includes(fileName)) {
        const componentConfig = requireComponent(fileName)

        const componentName = fileName.replace(/.+?(\w)(\w+)\.vue/i, (s, a, b) => {
            return a.toUpperCase() + b
        })
        if (componentConfig.default) {
            Vue.component(componentConfig.default.name || componentName, componentConfig.default || componentConfig)
        }
    }
})
