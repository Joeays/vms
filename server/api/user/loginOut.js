const P = require('../public')
const SqliteDB = require('../utils/sqliteDB.js').SqliteDB
const jwt = require('jsonwebtoken')
const getTokenInfo = require('../user/getTokenInfo')


module.exports = loginOut

// 用户退出
async function loginOut(ctx) {
    const data = ctx.request.body
    let userInfo = await getTokenInfo(ctx)

    let d = new Date()
    let outDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    const sqliteDB = new SqliteDB("vms.db")
    await sqliteDB.executeSql('UPDATE t_user SET out_time = ? where id = ?', [outDate, userInfo.id])
    await sqliteDB.close()

    ctx.body = {
        success: true,
        message: '',
        data: {}
    }

}
