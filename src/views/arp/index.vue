<template>
    <div>
        <breadcrumb/>
        <el-card class="arp-box">
            <el-card class="arp-toolbar">
                <div class="toolbar-content">
                    <div class="item-toolbar" v-for="(item,index) in toolbarData" :key="index">
                        <span>{{ item.label }}</span>
                        <toggle-switch :show="item.show" :value="item.value" @change="clickSwitch(item)"/>
                    </div>
                    <div class="item-toolbar">
                        <el-button round size="mini" v-print="printObj">
                            <svg-icon icon-class="print" style="color: rgba(0,0,0,.85)"/>
                            Print
                        </el-button>
                    </div>
                    <div class="item-toolbar toolbar__button fr">
                        <span>
                            <svg-icon icon-class="exchange-alt" style="color: red"/>
                            Router
                        </span>
                        <span>
                            <svg-icon icon-class="broadcast-tower" style="color: #8b008b"/>
                            Broadcast
                        </span>
                    </div>
                </div>
            </el-card>
            <div class="arp-graph" id="printGraph" ref="printGraph">
                <graph/>
            </div>
        </el-card>
    </div>
</template>

<script>
import print from 'vue-print-nb'

export default {
    name: "ARP",
    directives: {
        print
    },
    data() {
        return {
            arpData: [],
            toolbarData: [
                {label: 'Request', value: 5, show: true},
                {label: 'Reply', value: 3, show: true},
                {label: 'Gratuitous', value: 1, show: true},
            ],
            printObj: {
                id: '#printGraph',
            }
        }
    },
    mounted() {
        this.getArpData()
    },
    methods: {
        getArpData() {
        },
        clickSwitch(val) {
            console.log(val)
        }
    }
}
</script>

<style scoped lang="scss">
.arp-toolbar {
    box-shadow: 0 0.2rem 0.25rem 0 rgba(0, 0, 0, .1);

    ::v-deep .el-card__body {
        background: #eee;
        padding: 5px 10px;
        overflow: hidden;
    }

    .toolbar-content {
        .item-toolbar {
            float: left;
            margin-right: 10px;
            height: 28px;
            line-height: 28px;

            ::v-deep .el-switch__core {
                min-width: 40px;
            }

            span {
                color: rgba(0, 0, 0, .85);
                font-size: 12px;
                margin-right: 5px;

                &:last-child {
                    margin-right: 0
                }
            }

            &:last-child {
                margin-right: 0
            }
        }

        .toolbar__button {
            box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, .1);
            background-color: #fff;
            border-radius: 8px;
            padding: 0 5px;

            span {
                font-size: 14px;
            }
        }
    }
}

.arp-graph {
    width: 100%;
    height: 100%;
}
</style>
