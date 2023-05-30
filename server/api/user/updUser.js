const P = require('../public')
const SqliteDB = require('../utils/sqliteDB.js').SqliteDB
const getTokenInfo = require('../user/getTokenInfo')


module.exports = updUser

// 修改用户info
async function updUser(ctx) {
    const data = ctx.request.body
    let userInfo = await getTokenInfo(ctx)
    let userId = data.id
    let userType = data.user_type
    let suc = false
    let meg = '您无此权限!'

    const sqliteDB = new SqliteDB("vms.db")
    if(userInfo.user_type <= 2){
        const result = await sqliteDB.executeSql('update t_user set user_type = ? WHERE id = ? ', [userType,userId])
        suc = result.changes >> 0 ? true : false
        meg = result.changes >> 0 ? '修改成功' : '修改失败'
    }
    await sqliteDB.close()

    ctx.body = {
        success: suc,
        message: meg,
        data: {}
    }

}
