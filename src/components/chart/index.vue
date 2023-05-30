<template>
    <div :id="ecId" :style="ecStyle"></div>
</template>

<script>
export default {
    name: 'chart',
    props: {
        ecId: {
            type: String,
            default: function () {
                return 'chartRef' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
            }
        },
        ecOption: {
            type: Object,
            default: function () {
                return {}
            }
        },
        ecStyle: {
            type: Object,
            default: function () {
                return {
                    width: '100%',
                    height: '100%'
                }
            }
        }
    },
    data() {
        return {
            chart: ''
        }
    },
    mounted() {
        this.handleDrawChart()
    },
    methods: {
        /**
         * 处理绘制图表
         * @date 2020/11/30 13:40
         * @returns {Function}
         **/
        handleDrawChart() {
            this.chart = this.echarts.init(document.getElementById(this.ecId));
            this.chart.clear()
            this.chart.setOption(this.ecOption)
            window.addEventListener('resize', this.chart.resize)
        }
    },
    watch: {
        ecOption: {
            handler(newVal, oldVal) {
                if (this.chart) {
                    if (newVal) {
                        this.chart.setOption(newVal, true)
                    } else {
                        this.chart.setOption(oldVal)
                    }
                } else {
                    this.init()
                }
            },
            // 对象内部属性的监听
            deep: true
        }
    },
    destroyed() {
        window.removeEventListener('resize', this.chart.resize)
    }
}
</script>
