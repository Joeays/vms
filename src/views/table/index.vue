<template>
    <div>
        <el-table :data="tableData" style="width: 100%" size="medium" border>
            <el-table-column type="selection" width="50"/>
            <el-table-column prop="rzid" label="日志ID"/>
            <el-table-column prop="rzsj" label="日志时间" sortable/>
            <el-table-column prop="cc" label="车次" sortable/>
            <el-table-column prop="yhmc" label="用户名称" sortable/>
            <el-table-column prop="ipdz" label="IP地址"/>
            <el-table-column type="expand"
                             :filters="[
                                 {text: '日志内容'},
                                 {text: '车次'},
                                 {text: '车站'},
                                 {text: '日志ID'},
                                 {text: '用户名称'},
                                 {text: 'IP地址'},
                                 {text: '日志时间'},
                                 {text: '更新时间'},
                                 {text: '子系统'},
                                 ]">

                <template slot-scope="props">
                    <el-card shadow="always" style="margin: 10px 20px">
                        <el-form label-position="left" size="mini">
                            <el-form-item label="用户名称：">
                                <span>{{ props.row.yhmc }}</span>
                            </el-form-item>
                            <el-form-item label="车站：">
                                <span>{{ props.row.cz }}</span>
                            </el-form-item>
                            <el-form-item label="日志时间：">
                                <span>{{ props.row.rzsj }}</span>
                            </el-form-item>
                            <el-form-item label="更新时间：">
                                <span>{{ props.row.gxsj }}</span>
                            </el-form-item>
                            <el-form-item label="日志内容：">
                                <span>{{ props.row.nr }}</span>
                            </el-form-item>
                            <el-form-item label="子系统：">
                                <span>{{ props.row.remoteSysType }}</span>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </template>
            </el-table-column>
        </el-table>
        <div style="padding-top: 10px; text-align: right">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="2270">
            </el-pagination>
        </div>
    </div>
</template>


<script>
export default {
    name: "tables",
    data() {
        return {
            tableData:
                [
                    {
                        "id": 3559,
                        rzid: 1336008,
                        cc: "K8203",
                        yhmc: "geli",
                        "systemmodel": 3,
                        cz: "重庆",
                        "logtype": 2,
                        ipdz: "10.107.148.53",
                        nr: "[作业日历]处理日历：始发站变更S_shiFaZhanBianGeng：重庆|K8203|3|府谷",
                        rzsj: "2023-07-12 00:56:13",
                        "logLineNumber": null,
                        "actionName": null,
                        "actionType": null,
                        "actionDataType": null,
                        "remoteSysType": null,
                        "createDate": null,
                        "commPlanId": null,
                        "sendId": null
                    },
                    {
                        "id": 3560,
                        rzid: 1336009,
                        cc: "K8204",
                        yhmc: null,
                        "systemmodel": 3,
                        cz: "重庆",
                        "logtype": 2,
                        ipdz: "10.107.148.53",
                        nr: "[作业日历]处理日历：终到站变更S_zhongDaoZhanBianGeng：广州|K8204|5|府谷",
                        rzsj: "2023-07-12 00:56:13",
                        "logLineNumber": null,
                        "actionName": null,
                        "actionType": null,
                        "actionDataType": null,
                        "remoteSysType": null,
                        "createDate": null,
                        "commPlanId": null,
                        "sendId": null
                    },
                    {
                        "id": 3561,
                        rzid: 1336010,
                        cc: null,
                        yhmc: "xiaoxue",
                        "systemmodel": 5,
                        cz: null,
                        "logtype": 0,
                        ipdz: "10.107.148.53",
                        nr: "清理导向计划：769",
                        rzsj: "2023-07-11 01:06:28",
                        "logLineNumber": null,
                        "actionName": null,
                        "actionType": null,
                        "actionDataType": null,
                        "remoteSysType": null,
                        "createDate": null,
                        "commPlanId": null,
                        "sendId": null
                    },
                    {
                        "id": 3562,
                        rzid: 1336011,
                        cc: "G0003",
                        yhmc: "gdda",
                        "systemmodel": 3,
                        cz: "广州",
                        "logtype": 0,
                        ipdz: "127.0.0.1",
                        nr: "始发切自动:K448,K8204,C200,T42,C238,C163,Z9235,8354,Z94,C198,7008,C236,K1350,K8176,7001,Z9233,8355,C9372,K367,C184,C196,8375,7006,C168,Z9231,8352",
                        rzsj: "2023-07-11 01:22:22",
                        "logLineNumber": null,
                        "actionName": null,
                        "actionType": null,
                        "actionDataType": null,
                        "remoteSysType": null,
                        "createDate": null,
                        "commPlanId": null,
                        "sendId": null
                    },
                    {
                        "id": 3563,
                        rzid: 1336012,
                        cc: "Z123",
                        yhmc: "weize",
                        "systemmodel": 3,
                        cz: "广州",
                        "logtype": 2,
                        ipdz: "12.126.33.147",
                        nr: "[到发管理] “命令触发” (128581) 35 “检票前3分钟通告(预检)”广播触发成功",
                        rzsj: "2023-07-11 01:29:21",
                        "logLineNumber": null,
                        "actionName": null,
                        "actionType": null,
                        "actionDataType": null,
                        "remoteSysType": null,
                        "createDate": null,
                        "commPlanId": 128581,
                        "sendId": "d120e28d4b6948fcb2d29d9edaf6f7f8"
                    },
                    {
                        "id": 3564,
                        rzid: 1336013,
                        cc: "K1555",
                        yhmc: "liming",
                        "systemmodel": 3,
                        cz: "南昌",
                        "logtype": 2,
                        ipdz: "222.126.33.247",
                        nr: "[到发管理] “命令触发” (128581) 35 “闭塞”广播触发成功",
                        rzsj: "2023-06-30 01:29:21",
                        gxsj: "2023-07-14 11:22:48",
                        "logLineNumber": null,
                        "actionName": null,
                        "actionType": null,
                        "actionDataType": null,
                        "remoteSysType": "触发 202  手动模式“准备检票”(128581)",
                        "createDate": null,
                        "commPlanId": 128581,
                        "sendId": "d120e28d4b6948fcb2d29d9edaf6f7f8"
                    },
                    /*        {
                                "id": 3565,
                                rzid: 1336014,
                                cc: "K1555",
                                yhmc: "weize",
                                "systemmodel": 3,
                                cz: "南昌",
                                "logtype": 2,
                                ipdz: "202.206.33.147",
                                nr: "[到发计划] 手动模式“准备检票”(128581)",
                                rzsj: "2023-06-30 01:29:21",
                                "logLineNumber": null,
                                "actionName": null,
                                "actionType": null,
                                "actionDataType": null,
                                "remoteSysType": null,
                                "createDate": null,
                                "commPlanId": 128581,
                                "sendId": "d120e28d4b6948fcb2d29d9edaf6f7f8"
                            },*/
                    /*       {
                               "id": 3566,
                               rzid: 1336015,
                               cc: "Z3333",
                               yhmc: "sanyang",
                               "systemmodel": 3,
                               cz: "上海",
                               "logtype": 0,
                               ipdz: "28.26.133.47",
                               nr: "[手动到发] 统计信息 增加车次 Z3333",
                               rzsj: "2023-06-30 01:29:22",
                               "logLineNumber": null,
                               "actionName": null,
                               "actionType": null,
                               "actionDataType": null,
                               "remoteSysType": null,
                               "createDate": null,
                               "commPlanId": 128581,
                               "sendId": "d120e28d4b6948fcb2d29d9edaf6f7f8"
                           },*/
                    /*      {
                              "id": 3567,
                              rzid: 1336016,
                              cc: "Z17",
                              yhmc: "quange",
                              "systemmodel": 3,
                              cz: "上海",
                              "logtype": 0,
                              ipdz: "111.117.48.1",
                              nr: "[手动到发] 统计信息 修改车次 Z17/yugao/2022/10/26 1:29:21",
                              rzsj: "2023-06-30 01:29:22",
                              "logLineNumber": null,
                              "actionName": null,
                              "actionType": null,
                              "actionDataType": null,
                              "remoteSysType": null,
                              "createDate": null,
                              "commPlanId": 128581,
                              "sendId": "d120e28d4b6948fcb2d29d9edaf6f7f8"
                          },*/
                    /*   {
                           "id": 3568,
                           rzid: 1336017,
                           cc: "上海",
                           yhmc: "quange",
                           "systemmodel": 4,
                           cz: null,
                           "logtype": 2,
                           ipdz: "22.206.33.147",
                           nr: "[人工到发]“执行广播计划”广播计划id：1788811",
                           rzsj: "2023-06-27 01:36:47",
                           "logLineNumber": null,
                           "actionName": null,
                           "actionType": null,
                           "actionDataType": null,
                           "remoteSysType": null,
                           "createDate": null,
                           "commPlanId": null,
                           "sendId": null
                       },*/
                    {
                        "id": 3569,
                        "rzid": 1336018,
                        "cc": "北京",
                        "yhmc": "nnniu",
                        "systemmodel": 4,
                        "cz": null,
                        "logtype": 2,
                        ipdz: "222.26.33.147",
                        "nr": "[人工到发]“执行广播计划”广播计划id：1788810",
                        "rzsj": "2023-06-27 01:36:49",
                        "logLineNumber": null,
                        "actionName": null,
                        "actionType": null,
                        "actionDataType": null,
                        "remoteSysType": null,
                        "createDate": null,
                        "commPlanId": null,
                        "sendId": null
                    },
                    {
                        "id": 3570,
                        "rzid": 1336019,
                        "cc": "C554",
                        "yhmc": "nnniu",
                        "systemmodel": 3,
                        "cz": "北京",
                        "logtype": 2,
                        ipdz: "222.123.33.17",
                        "nr": "[到发计划]“修改到点”现在晚点： 0 修改晚点：5,开检时间基准：0",
                        "rzsj": "2023-06-27 01:43:10",
                        "logLineNumber": null,
                        "actionName": null,
                        "actionType": null,
                        "actionDataType": null,
                        "remoteSysType": null,
                        "createDate": null,
                        "commPlanId": 128581,
                        "sendId": "0cfc3c0b51984401a0fec17ab865b87a"
                    },
                    {
                        "id": 3571,
                        "rzid": 1336020,
                        "cc": "C554",
                        "yhmc": "sunci",
                        "systemmodel": 3,
                        "cz": "西安",
                        "logtype": 2,
                        ipdz: "160.17.148.1",
                        "nr": "[到发计划] “修改离站” 现在晚点：0 修改晚点：5,开检时间基准：0",
                        "rzsj": "2023-06-27 01:43:10",
                        "logLineNumber": null,
                        "actionName": null,
                        "actionType": null,
                        "actionDataType": null,
                        "remoteSysType": null,
                        "createDate": null,
                        "commPlanId": 128581,
                        "sendId": "0cfc3c0b51984401a0fec17ab865b87a"
                    },
                    {
                        "id": 3572,
                        "rzid": 1336021,
                        "cc": "C52",
                        "yhmc": "sunci",
                        "systemmodel": 3,
                        "cz": "郑州",
                        "logtype": 2,
                        ipdz: "21.54.12.222",
                        "nr": "[到发管理] “命令触发” (128581) 10 “第一次检票通告”广播触发成功",
                        "rzsj": "2023-06-27 01:44:46",
                        "logLineNumber": null,
                        "actionName": null,
                        "actionType": null,
                        "actionDataType": null,
                        "remoteSysType": null,
                        "createDate": null,
                        "commPlanId": 128581,
                        "sendId": "7f0a7ea8d08c4a39bf7f917b8dd47c54"
                    },
                    // {
                    //     "id": 3573,
                    //     "rzid": 1336022,
                    //     "cc": "Z123",
                    //     "yhmc": "dasha",
                    //     "systemmodel": 3,
                    //     "cz": "郑州",
                    //     "logtype": 2,
                    //     ipdz: "120.23.148.81",
                    //     "nr": "[到发计划] “立即开检” (128581)",
                    //     "rzsj": "2023-06-27 01:44:46",
                    //     "logLineNumber": null,
                    //     "actionName": null,
                    //     "actionType": null,
                    //     "actionDataType": null,
                    //     "remoteSysType": null,
                    //     "createDate": null,
                    //     "commPlanId": 128581,
                    //     "sendId": "7f0a7ea8d08c4a39bf7f917b8dd47c54"
                    // },
                ]
        }
    },
    mounted() {
        let arrayLike = {
            0: 'tom',
            'age': '65',
            2: '男',
            3: ['jane','john','Mary'],
            'length': 4
        }
        let arr = Array.from(arrayLike)
        console.log(arr)
        console.log(new Set(arr))
    }
}
</script>
<style scoped>
::v-deep .el-table th {
    background: #f5f7fa;
}
</style>
