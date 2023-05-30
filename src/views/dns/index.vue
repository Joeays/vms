<template>
    <div> {{ temp.count }}---
        {{ $store.state.temp.count }}
        <el-progress :percentage="temp.count"></el-progress>
        <el-progress type="circle" :percentage="$store.state.temp.count"></el-progress>
        <el-button @click="addCount1" icon="el-icon-plus"></el-button>
        <el-button @click="removeCount" icon="el-icon-minus"></el-button>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
    name: "DNS",
    computed: {
        ...mapState(['temp'])
    },
    methods: {
        ...mapMutations(['addCount', 'reduce', 'SET_USER_KEY_VALUE', 'SET_USER_INFO']),
        addCount1() {
            this.$store.commit('addCount', 1)
            this.addCount(10)
        },
        removeCount() {
            this.$store.commit('reduce')
            this.reduce()
        },
    }
}
</script>

<style scoped>

</style>
