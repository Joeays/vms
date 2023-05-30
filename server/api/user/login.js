const P = require('../public')
const SqliteDB = require('../utils/sqliteDB.js').SqliteDB
const jwt = require('jsonwebtoken')



module.exports = login

// 用户登录
async function login(ctx) {
    const data = ctx.request.body
    const decrypt_pass_word = P.common.cryptoJS.methods.decrypt(data.pass_word, data.secretkey);
    data.pass_word = decrypt_pass_word
    let msg
    if (!P.common.server_name_reg.test(data.user_name)) {
        msg = P.common.name_txt
    } else if (!P.common.server_pass_reg.test(data.pass_word)) {
        msg = P.common.pass_txt
    } else {
        // 初步验证通过，开始查询数据库
        const sqliteDB = new SqliteDB("vms.db")
        const rows = await sqliteDB.queryData('SELECT id, user_name, pass_word, user_type FROM t_user where user_name = ?', [data.user_name])
        await sqliteDB.close()
        msg = '用户名或密码错误！'// 不应该具体透露是密码还是帐户出错！
        if (rows.length > 0) {
            const userInfo = rows[0]
            if (P.bcrypt.compareSync(data.pass_word, userInfo.pass_word)) {
				let ip = P.config.getClientIP(ctx)
				let d = new Date()
				let updDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
				const sqliteDB1 = new SqliteDB("vms.db")
				await sqliteDB1.executeSql('UPDATE t_user SET login_ip = ?, login_time = ? where id = ?', [ip, updDate, userInfo.id])
				await sqliteDB1.close()
				delete userInfo.pass_word
			  ctx.body = {
					success: true,
					data: {
						userInfo,
						token: jwt.sign(Object.assign({ip}, userInfo),
							P.config.JWTs.secret, {expiresIn: P.config.JWTs.expiresIn})
					}
				}
				return
            }
        }
    }

    ctx.body = {
        success: false,
        message: msg,
        data: {}
    }
}
