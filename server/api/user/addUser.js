const P = require('../public')
const SqliteDB = require('../utils/sqliteDB.js').SqliteDB
const getTokenInfo = require('../user/getTokenInfo')


module.exports = addUser

// 添加用户
async function addUser(ctx) {
    const data = ctx.request.body
    let userInfo = await getTokenInfo(ctx)
    let userName = data.user_name
    let passWord = P.bcrypt.hashSync(data.pass_word, P.bcrypt.genSaltSync(10))
    let userType = data.user_type
    let suc = false
    let meg = '您无此权限!'
    let d = new Date()
    let createTime = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    const sqliteDB = new SqliteDB("vms.db")
    if(userInfo.user_type <= 2){
        const result = await sqliteDB.executeSql('INSERT INTO t_user (user_name,pass_word,user_type,login_ip,create_time) VALUES(?,?,?,?,?) ', [userName,passWord,userType,'',createTime])
        suc = result.changes >> 0 ? true : false
        meg = result.changes >> 0 ? '新增成功' : '新增失败'
    }
    await sqliteDB.close()

    ctx.body = {
        success: suc,
        message: meg,
        data: {}
    }

}
