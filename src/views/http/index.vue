<template>
    <div>
        <breadcrumb/>
        <el-card shadow="never" class="http-chart">
            <div class="chart-content">
                <div class="item-chart">
                    <chart :ecOption="httpMethods" :ecStyle="ecStyle"/>
                </div>
                <div class="item-chart">
                    <chart :ecOption="httpResponses" :ecStyle="ecStyle"/>
                </div>
                <div class="item-chart">
                    <chart :ecOption="httpContentType" :ecStyle="ecStyle"/>
                </div>
            </div>
        </el-card>
        <el-card class="http-toolbar">
            <div class="toolbar-content">
                <div class="item-toolbar" v-for="(item,index) in toolbarData" :key="index">
                    <span>{{ item.label.toUpperCase() }}</span>
                    <toggle-switch :show="item.show" :value="item.value" @change="clickSwitch(item)"/>
                </div>
                <div class="item-toolbar toolbar__input">
                    <el-input size="mini" v-model="search" placeholder="input search text" clearable
                              @clear="searchChange"
                              @keyup.enter.native="searchChange"></el-input>
                    <el-button size="mini" icon="el-icon-search" type="primary"
                               @click="searchChange"></el-button>
                </div>
                <div class="item-toolbar">
                    <el-button round size="mini" @click="clickSwitchAll('Enable')">Enable All</el-button>
                    <el-button round size="mini" @click="clickSwitchAll('Disable')">Disable All</el-button>
                </div>
            </div>
        </el-card>
        <el-card class="http-list">
            <el-collapse class="list-content" v-show="isAllShow" v-model="activeItem">
                <el-collapse-item v-for="(item,index) in httpData.flowsData" :key="index" :name="index"
                                  v-show="item.isShow">
                    <template slot="title">
<!--                        <span class="span-code" v-if="item.FromGeo.Flag">{{ item.FromGeo.Flag }}</span>-->
                        <span>{{ item.srcStr }}</span>
                        <svg-icon icon-class="arrows" class-name="arrows"/>
<!--                        <span class="span-code" v-if="item.ToGeo.Flag">{{ item.ToGeo.Flag }}</span>-->
                        <span>{{ item.dstStr }}
                            <span style="color: rgb(0, 121, 140); font-style: italic;">({{ item.requestMethod }})</span>
                        </span>
                    </template>
                    <div v-for="val in item.chunks">
                        <div class="item-high">
                            <pre v-highlight="val.requestHeaders" v-if="val.requestHeaders !==''"><code></code></pre>
                            <pre v-highlight="val.requestBodyPreview" v-if="val.requestBodyPreview !==''"><code></code></pre>
                            <pre v-highlight="val.responseHeaders" v-if="val.responseHeaders !==''"><code></code></pre>
                            <pre v-highlight="val.responseBodyPreview"
                                 v-if="val.responseBodyPreview !==''"><code></code></pre>
                        </div>
                        <div class="item-download" v-if="val.responseBodyFile !== ''">
                            <svg-icon icon-class="paperclip" class-name="paperclip"/>
                            <el-button type="primary" @click="handleDownload(val)">
                                Download {{ val.responseBodyFile }}
                            </el-button>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <div class="main-footer" v-show="isAllShow">
                <el-pagination small layout="prev, pager, next" :total="total"
                               v-show="total > 0"
                               :page-size="params.pageSize"
                               :current-page="params.currentPage"
                               @current-change="handleCurrentChange"/>
            </div>
        </el-card>
    </div>
</template>

<script>
import utils from '@/utils';
import FileSaver from "file-saver"

export default {
    name: "http",
    data() {
        return {
            httpData: {},
            total: 0,
            params: {
                pageSize: 10,
                currentPage: 1,
            },
            ecStyle: {
                width: '300px',
                height: '240px'
            },
            httpMethods: {
                title: {
                    text: 'HTTP Methods',
                    textStyle: {
                        fontSize: 12,
                        fontWeight: 'bolder'
                    },
                    top: 20,
                    left: 'center'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    top: 'middle',
                    align: 'left',
                    textStyle: {
                        width: 100,
                        overflow: 'truncate',
                        ellipsis: '...'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (param) {
                        return `${param.seriesName}<br/>${param.name} : ${param.value} (${param.percent}%)`
                    },
                },
                series: [
                    {
                        name: 'HTTP Methods',
                        type: 'pie',
                        left: 0,
                        width: 250,
                        radius: ['40%', '60%'],
                        label: {
                            show: false,
                            position: 'center'
                        },
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            }
                        }
                    }
                ]
            },
            httpResponses: {
                title: {
                    text: 'HTTP Responses',
                    textStyle: {
                        fontSize: 12,
                        fontWeight: 'bolder'
                    },
                    top: 20,
                    left: 'center'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    top: 'middle',
                    align: 'left',
                    textStyle: {
                        width: 100,
                        overflow: 'truncate',
                        ellipsis: '...'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (param) {
                        return `${param.seriesName}<br/>${param.name} : ${param.value} (${param.percent}%)`
                    },
                },
                series: [
                    {
                        name: 'HTTP Responses',
                        type: 'pie',
                        left: 0,
                        width: 250,
                        radius: ['40%', '60%'],
                        label: {
                            show: false,
                            position: 'center'
                        },
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            }
                        }
                    }
                ]
            },
            httpContentType: {
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    top: 'middle',
                    align: 'left',
                    textStyle: {
                        width: 100,
                        overflow: 'truncate',
                        ellipsis: '...'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (param) {
                        if (param.seriesName !== '') {
                            return `${param.seriesName}<br/>${param.name} : ${param.value} (${param.percent}%)`
                        } else {
                            return `${param.name} : ${param.value} (${param.percent}%)`
                        }
                    },
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        left: -20,
                        width: 220,
                        radius: ['40%', '60%'],
                        label: {
                            show: false,
                            position: 'center'
                        },
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            }
                        }
                    }
                ]
            },
            toolbarData: [],
            search: '',
            searchData: [],
            isAllShow: true,
            activeItem: 0
        }
    },
    mounted() {
        this.getHttpData()
    },
    methods: {
        getHttpData() {
            utils.ajax.call(this, '/analyzeHttpData', this.params, (data, err) => {
                if (!err) {
                    this.httpData = {
                        flowsData: data.data.pagerJson.paginatedArray,
                        methodCount: data.data.analyzeResult.methodCount,
                        statusCodeCount: data.data.analyzeResult.statusCodeCount,
                        contentTypeCount: data.data.analyzeResult.contentTypeCount,
                    }
                    this.total = data.data.pagerJson.total
                    this.httpData.flowsData.forEach((item) => {
                        item.isShow = true
                        item.search = JSON.stringify(item)
                    })
                    let methods = this.httpData.methodCount
                    this.toolbarData = []
                    for (let k in methods) {
                        let str = {}
                        if (methods[k] !== 0) {
                            let json = {}
                            json.value = methods[k]
                            json.name = k
                            this.httpMethods.series[0].data.push(json)
                            str.show = true
                        }
                        str.label = k
                        str.value = methods[k]
                        this.toolbarData.push(str)
                    }
                    let responses = this.httpData.statusCodeCount
                    for (let k in responses) {
                        if (responses[k] !== 0) {
                            let json = {}
                            json.value = responses[k]
                            json.name = k
                            this.httpResponses.series[0].data.push(json)
                        }
                    }
                    let contentType = this.httpData.contentTypeCount
                    for (let k in contentType) {
                        if (contentType[k] !== 0) {
                            let json = {}
                            json.value = contentType[k]
                            json.name = k
                            this.httpContentType.series[0].data.push(json)
                        }
                    }
                } else {
                    return false
                }
            })
        },
        searchChange() {
            if (this.searchData.length === 0 && this.httpData.flowsData.length !== 0) {
                this.searchData = this.httpData.flowsData
            }
            if (this.search == null || this.search === '') {
                this.httpData.flowsData = this.searchData
                this.searchData = []
            } else {
                let arr = []
                this.searchData.forEach((item) => {
                    if (item.search.indexOf(this.search) !== -1) {
                        arr.push(item)
                    }
                })
                this.httpData.flowsData = arr
            }
        },
        clickSwitch(val) {
            let tempArr = this.httpData.flowsData
            let total = 0
            tempArr.forEach((item, index) => {
                if (item.search.indexOf(val.label.toUpperCase()) !== -1) {
                    item.isShow = !item.isShow
                }
                if (item.isShow) {
                    total = total + 1
                }
            })
            this.httpData.flowsData = tempArr
            this.total = total
            this.$forceUpdate()
        },
        clickSwitchAll(type) {
            this.toolbarData.forEach((item) => {
                if (item.value !== 0) {
                    if (type === 'Enable') {
                        this.isAllShow = true
                        item.show = true
                        this.httpData.flowsData.forEach((item) => {
                            item.isShow = true
                        })
                    } else {
                        this.isAllShow = false
                        item.show = false
                        this.httpData.flowsData.forEach((item) => {
                            item.isShow = false
                        })
                    }
                }
            })
            this.$forceUpdate()
        },
        handleDownload(val) {
            const preview = val.responseBodyPreview
            let file = val.responseBodyFile
            let index = file.lastIndexOf("\.")
            let suffix = file.substring(index + 1, file.length)
            let blob = new Blob([preview], {type: suffix})
            FileSaver.saveAs(blob, `${file}`)
        },
        handleCurrentChange(val) {
            this.params.currentPage = val
            this.getHttpData()
        },
    }
}
</script>

<style scoped lang="scss">
.http-chart {
    .chart-content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 10px;
        justify-content: center;

        .item-chart {
            width: 50%;
            height: 240px;
            min-width: 250px;
            max-width: 300px;
            margin: 10px;
            border-radius: 0.5rem;
            box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, .3);
        }

    }
}

.http-toolbar {
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

        .toolbar__input {
            .el-input {
                width: calc(100% - 44px);
                float: left;

                ::v-deep .el-input__inner {
                    border-radius: 4px 0px 0px 4px;
                }
            }

            .el-button {
                border: none;
                color: #fff;
                height: 28px;
                float: left;
                border-radius: 0px 4px 4px 0px;
            }
        }
    }
}

.http-list {
    .list-content {
        ::v-deep .el-collapse-item__header {
            span {
                color: rgba(0, 0, 0, .85);
                font-size: 14px;

            }

            .span-code {
                margin: 0 5px 0 0;
            }

            .arrows {
                color: #44bd32;
                margin: 0 5px;
                font-size: 14px;
            }
        }

        .item-high {
            color: #abb2bf;
            background: #282c34;
            display: block;
            overflow-x: auto;
        }

        .item-download {
            margin: 10px 0;

            .paperclip {
                width: 16px;
                height: 14px;
                margin-right: 5px;
            }
        }
    }
}
</style>
