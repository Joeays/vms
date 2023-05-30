<template>
    <div id="app">
        <transition name="bounce">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
/**
 * 棱镜分析系统
 * App.vue -- Start
 * @author Joe
 * @date 2020/11/18 13:30
 **/

export default {
    name: 'App',
    watch: {
        $route(to, from) {
            if (!to.matched.length) {
                this.$router.push('/404')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .bounce-enter-active {
    animation: bounce-in .3s;
    -webkit-animation: bounce-in .3s;
}

/deep/ .bounce-leave-active {
    animation: bounce-out .2s;
    -webkit-animation: bounce-out .2s
}

@keyframes bounce-in {
    0% {
        transform: scale(0)
    }
    50% {
        transform: scale(1.05)
    }
    100% {
        transform: scale(1)
    }
}

@keyframes bounce-out {
    0% {
        transform: scale(1)
    }
    50% {
        transform: scale(0.95)
    }
    100% {
        transform: scale(0)
    }
}
</style>
