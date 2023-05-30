const P = require('../public')
const jwt = require('jsonwebtoken')

module.exports = getTokenInfo


// 获取token中的用户信息
async function getTokenInfo(ctx) {
    return new Promise((resolve,reject)=>{
        let token = ctx.request.header.authorization
        jwt.verify(token, P.config.JWTs.secret, function (err, data) {
            if (err) {
                reject("登录过期，请重新登录")
            }
            resolve(data);
        })
    })

}


