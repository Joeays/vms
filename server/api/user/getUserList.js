const P = require('../public')
const SqliteDB = require('../utils/sqliteDB.js').SqliteDB
const getTokenInfo = require('../user/getTokenInfo')


module.exports = getUserList

// 用户列表
async function getUserList(ctx) {
    const data = ctx.request.body
    let userInfo = await getTokenInfo(ctx)
    let user_list
    const sqliteDB = new SqliteDB("vms.db")
    if(userInfo.user_type == 1){
        user_list = await sqliteDB.queryData('select id,user_name,user_type,create_time,login_time,out_time from t_user')
    }
    else if(userInfo.user_type == 2){
        user_list = await sqliteDB.queryData('select id,user_name,user_type,create_time,login_time,out_time from t_user where user_type in (2,3,4)')
    }
    else if(userInfo.user_type == 3 || userInfo.user_type == 4){
        user_list = await sqliteDB.queryData('select id,user_name,user_type,create_time,login_time,out_time from t_user where user_type in (3,4)')
    }
    await sqliteDB.close()

    ctx.body = {
        success: true,
        message: '',
        data: {user_list}
    }

}
