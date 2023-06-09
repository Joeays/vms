<template>
    <div>
        <p>
            <el-progress :percentage="percentage"></el-progress>
        </p>
        <el-button-group>
            <el-button icon="el-icon-minus" @click="decrease"></el-button>
            <el-button icon="el-icon-plus" @click="increase"></el-button>
        </el-button-group>
        <p>
            <el-button type="danger" round @click="buttonClick('danger')">危险按钮</el-button>
            <el-button type="danger" round @click="del">删除数组的区别</el-button>
        </p>
        <child ref="childRef"/>
        <el-button type="danger" round @click="setPerson">响应式检测</el-button>
        <div v-myDire:foo.a.b="message">1</div>
        <div class="content">
            <input type="text" v-focus/>
        </div>
    </div>
</template>

<script>
// 全局混入
// import { mixins } from "./mixin/index";
// Vue.mixin(mixins);

import mixins from '@/mixins'

export default {
    name: "mixin",
    mixins: [mixins],
    directives: {
        myDire: {
            // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
            bind: function (el, binding, vnode) {
                // console.log(el)
                // console.log(binding)
                var s = JSON.stringify
                el.innerHTML =
                    'name: ' + s(binding.name) + '<br>' +
                    'value: ' + s(binding.value) + '<br>' +
                    'expression: ' + s(binding.expression) + '<br>' +
                    'argument: ' + s(binding.arg) + '<br>' +
                    'modifiers: ' + s(binding.modifiers) + '<br>' +
                    'vnode keys: ' + Object.keys(vnode).join(', ')
            },
            // // 被绑定元素插入父节点时调用(仅保证父节点存在，但不一定已被插入文档中)。
            // inserted: function () {
            // },
            // // 所在组件的vNode更新时调用，但是可能发生在其子vNode更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。
            // update: function () {
            // },
            // // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
            // componentUpdated: function () {
            // },
            // // 只调用一次，指令与元素解绑时调用。
            // unbind: function () {
            // },
        },
        focus: {
            // 当绑定元素插入到 DOM 中
            inserted: function (el) {
                el.focus();
            }
        }
    },
    data() {
        return {
            percentage: 20,
            person: {
                name: 'zs',
                happy: ['学习', '吃饭']
            },
            message: ''
        }
    },
    mounted() {
        // console.log(mixins)
        // this.$refs.childRef.ruleForm.name = 'google'
        // console.log(this.$refs.childRef)



    },
    methods: {
        setPerson() {
            this.person.sex = "女"
            this.person.happy[0] = "逛街"
            // console.log(this.person, 'person')
        },
        del() {
            let a = [1, 2, 3, 4]
            let b = [1, 2, 3, 4]
            let IpInfo = [
                {
                    "ip": "172.18.95.137",
                    "port": "50963",
                    "domain": "analytics.ietf.org.cdn.cloudflare.net",
                    "country": "China",
                    "code": "CN",
                    "alpha3": "CHN",
                    "flag": "🇨🇳"
                },
                {
                    "ip": "39.106.142.20",
                    "port": "80",
                    "domain": "new-sentry.gitlab.net",
                    "country": "",
                    "code": "",
                    "alpha3": "",
                    "flag": ""
                },
                {
                    "ip": "61.54.7.136",
                    "port": "80",
                    "domain": "kv801.prod.do.dsp.mp.microsoft.com",
                    "country": "China",
                    "code": "CN",
                    "alpha3": "CHN",
                    "flag": "🇨🇳"
                },
                {
                    "ip": "96.6.229.162",
                    "port": "80",
                    "domain": "evento.peugeot-anzures.com",
                    "country": "China",
                    "code": "CN",
                    "alpha3": "CHN",
                    "flag": "🇨🇳"
                }
            ];
            delete IpInfo[0]
            console.log(IpInfo, IpInfo.length)
            delete a[1]
            console.log(a)
            this.$delete(b, 1)
            console.log(b, b.length)
        },
        increase() {
            this.percentage += 10;
        },
        decrease() {
            this.percentage -= 10;
        }
    }
}
</script>

<style scoped>

</style>
