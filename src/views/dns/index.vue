<template>
    <div> {{ temp.count }}---
        {{ $store.state.temp.count }}
        <el-progress :percentage="temp.count"></el-progress>
        <el-progress type="circle" :percentage="$store.state.temp.count"></el-progress>
        <el-button @click="addCount1" icon="el-icon-plus"></el-button>
        <el-button @click="removeCount" icon="el-icon-minus"></el-button>
        <el-button @click="btn" icon="el-icon-s-promotion"></el-button>
        <el-button @click="btn2" icon="el-icon-s-promotion"></el-button>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
    name: "dns",
    data() {
        return {
            obj: {user: 'joe', age: 17}
        }
    },
    computed: {
        ...mapState(['temp', 'cities'])
    },
    mounted() {
        console.log(this.obj)
        var a = {}
        Object.defineProperty(a, "b", {
            set: function (newValue) {
                console.log("赋值是:" + newValue)
            },
            get: function () {
                console.log("取值:")
                return 22 //注意这里，我硬编码返回2
            }
        });
        a.b = 1; //赋值是: 1
        console.log(a.b);   //取值  2
    },
    methods: {
        ...mapMutations(['addCount', 'reduce', 'SET_USER_KEY_VALUE', 'SET_USER_INFO', 'cities/cityFun']),
        btn() {
            // console.log(this.$store.state["cities/cityName"])
            console.log(this.$store.state.cities.cityName)
            console.log(this.cities.cityName)
            // this['cities/cityFun']()
            this.$store.commit('cities/cityFun')
        },
        btn2() {
            let p1 = {}
            console.log(p1)
            Object.defineProperty(p1, 'name', {
                writable: true,
                enumerable: false,
                value: 10
            })
            p1.name = 1999
            console.log(p1)
        },
        addCount1() {
            this.$store.commit('addCount', 1)
            this.addCount(10)
        },
        removeCount() {
            // this.$store.commit('reduce')
            // this.reduce()
            this.$store.dispatch('asyncAdd')
        },
    }
}
</script>

<style scoped>

</style>
