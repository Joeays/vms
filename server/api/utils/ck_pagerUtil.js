const P = require('../public')
const {ClickHouse} = require('clickhouse')
const check = require('./checkPamUtil')
const getTokenInfo = require('../user/getTokenInfo')


module.exports = getPagingSql


async function getPagingSql(data,querycondSql) {

    var pagingJson = {}
    let pageSize = Math.abs(data.pageSize >> 0) || 20// 分页率
    let currentPage = Math.abs(data.currentPage >> 0) || 1// 当前页码
    let countSql

    const clickhouse = new ClickHouse(P.config.ClickHouse)
    //是否存在条件
    if (check.checkPam(querycondSql)){
         countSql = `select count(*) total from ${data.queryTable} where 1=1 ${querycondSql}`
    }else {
         countSql = `select count(*) total from ${data.queryTable} where 1=1`
    }
    const [rows] = await clickhouse.query(countSql).toPromise()
    let total = rows.total
    //用来支持用户获取数据数量的功能 -1表示无限制
    if (check.checkPam(data.queryCount) && total >= data.queryCount && data.queryCount != -1 ) {
        total = data.queryCount
    }
    const pages = Math.ceil(total / pageSize)
    if (currentPage > pages) {
        currentPage = Math.max(1, pages)// 以防没数据
    }
    //偏移量
    const offset = (currentPage - 1) * pageSize
    pagingJson.pagingSql = ` LIMIT ${offset}, ${pageSize}`
    pagingJson.currentPage = currentPage
    pagingJson.total = total



    return pagingJson
}
