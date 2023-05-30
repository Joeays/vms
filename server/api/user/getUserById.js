const P = require('../public')
const SqliteDB = require('../utils/sqliteDB.js').SqliteDB
const getTokenInfo = require('../user/getTokenInfo')


module.exports = getUserById

// 获取用户info
async function getUserById(ctx) {
    const data = ctx.request.body
    let userInfo = await getTokenInfo(ctx)
    let userId = data.id
    let suc = false
    let meg = '您无此权限!'

    const sqliteDB = new SqliteDB("vms.db")
    const result = await sqliteDB.queryData('select id,user_name,user_type,create_time,login_time,out_time from t_user WHERE id = ? ', [userId])
    suc = result.length === 1 ? true : false
    meg = result.length === 1 ? '查询成功' : '查询失败'
    await sqliteDB.close()

    ctx.body = {
        success: suc,
        message: meg,
        data: {result}
    }

}
