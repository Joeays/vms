<template>
    <div> {{ temp.count }}---
        {{ $store.state.temp.count }}
        <el-progress :percentage="temp.count"></el-progress>
        <el-progress type="circle" :percentage="$store.state.temp.count"></el-progress>
        <el-button @click="addCount1" icon="el-icon-plus"></el-button>
        <el-button @click="removeCount" icon="el-icon-minus"></el-button>
        <el-button @click="btn" icon="el-icon-s-promotion"></el-button>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
    name: "DNS",
    computed: {
        ...mapState(['temp','cities'])
    },
    methods: {
        ...mapMutations(['addCount', 'reduce', 'SET_USER_KEY_VALUE', 'SET_USER_INFO','cities/cityFun']),
        btn(){
            // console.log(this.$store.state["cities/cityName"])
            console.log(this.$store.state.cities.cityName)
            console.log(this.cities.cityName)
            // this['cities/cityFun']()
            this.$store.commit('cities/cityFun')
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
