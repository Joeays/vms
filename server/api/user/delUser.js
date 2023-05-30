const P = require('../public')
const SqliteDB = require('../utils/sqliteDB.js').SqliteDB
const getTokenInfo = require('../user/getTokenInfo')


module.exports = delUser

// 删除用户
async function delUser(ctx) {
    const data = ctx.request.body
    let userInfo = await getTokenInfo(ctx)
    let userId = data.id
    let suc = false
    let msg = '您无此权限!'

    const sqliteDB = new SqliteDB("vms.db")
    if(userInfo.user_type <= 2){
        const result = await sqliteDB.executeSql('DELETE FROM t_user WHERE id = ? ', [userId])
        suc = result.changes >> 0 ? true : false
        msg = result.changes >> 0 ? '删除成功' : '删除失败'
    }
    await sqliteDB.close()

    ctx.body = {
        success: suc,
        message: msg,
        data: {}
    }

}
