const P = require('../public')
const check = require('./checkPamUtil')
const getTokenInfo = require('../user/getTokenInfo')
const SqliteDB = require('../utils/sqliteDB.js').SqliteDB


module.exports = getPagerSql


async function getPagerSql(page_size,current_page,db,table,condSql) {

    var pagerJson = {}
    let pageSize = Math.abs(page_size >> 0) || 20// 分页率
    let currentPage = Math.abs(current_page >> 0) || 1// 当前页码
    let countSql

    let sqliteDB = new SqliteDB(db)
    //是否存在条件
    if (check.checkPam(condSql)){
         countSql = `select count(*) total from ${table} where 1=1 ${condSql}`
    }else {
         countSql = `select count(*) total from ${table} where 1=1`
    }
    const [rows] = await sqliteDB.queryData(countSql)
    await sqliteDB.close()
    let total = rows.total
    const pages = Math.ceil(total / pageSize)
    if (currentPage > pages) {
        currentPage = Math.max(1, pages)// 以防没数据
    }
    //偏移量
    const offset = (currentPage - 1) * pageSize
    pagerJson.pagerSql = ` LIMIT ${offset}, ${pageSize}`
    pagerJson.currentPage = currentPage
    pagerJson.total = total

    return pagerJson
}
