const P = require('../public')
const jwt = require('jsonwebtoken')
const check = require('../utils/checkPamUtil')

module.exports = checkToken

// 获取token中的用户信息
async function checkToken(ctx) {
    let data = ctx.request.body
    let token = ctx.request.header.authorization
    let msg
    let error = true

    jwt.verify(token, P.config.JWTs.secret, function (err, data) {
        if (check.checkPam(data)) {
            msg = 'token正常'
        }else {
            error = false
            msg = '登录过期，请重新登录'
        }
    })

    ctx.body = {
        success:true,
        message: msg,
        data: {error}
    }
}


