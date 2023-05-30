const P = require('../public')
const SqliteDB = require('../utils/sqliteDB.js').SqliteDB
const check = require('../utils/checkPamUtil')

module.exports = checkUserName

//校验用户名
async function checkUserName(ctx) {
    let data = ctx.request.body
    let suc = true
    let msg
    if (check.checkPam(data.user_name)) {
        const sqliteDB = new SqliteDB('vms.db')
        const total = await sqliteDB.queryData('SELECT count(*) total FROM t_user where user_name = ?', [data.user_name])
        suc = total[0].total >> 0 ? false : true
        msg = total[0].total >> 0 ? '该用户名已存在，请您重新录入' : ''
        await sqliteDB.close()
    }

    ctx.body = {
        success: suc,
        message: msg,
        data: {}
    }

}
