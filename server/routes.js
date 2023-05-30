// 后台路由配置
const jwt = require('jsonwebtoken')
const config = require('./config.js')
const api = require('./api/index')
const common = require('./common').default
const koaRouter = require('koa-router')
const multer = require('koa-multer')
const fs = require('fs')

const routes = koaRouter()

// userType:需要的用户权限  1:开发者 2:管理员 3:操作员 4:审计员
const urls = {
    'analyzeHttpData': {userType: 0},
    'queryHttpInfo': {userType: 0},

    'upFile': {userType: 0},
    'login': {userType: 0},
    'checkToken': {userType: 0},

    /** 用户相关 */
    'getUserList': {userType: 0},
    'delUser': {userType: 0},
    'getUserById': {userType: 0},
    'addUser': {userType: 0},
    'checkUserName': {userType: 0},
    'updUser': {userType: 0},
    'loginOut': {userType: 0},
}

Object.getOwnPropertyNames(urls).forEach(key => {
    if (common.page_grade.hasOwnProperty(key)) {
        urls[key].userType = common.page_grade[key]// 覆盖访问权限
    }
    if (key !== 'upFile') {
        let obj = urls[key]
        let url = '/' + key + (obj.url || '')
        routes[obj.method ? obj.method : 'post'](url, api[key])
    }

})

// 文件上传配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let path = ''
        config.upPath.split('/').forEach(p => {
            if (p && !fs.existsSync(path += p + '/')) {
                fs.mkdirSync(path)
            }
        })
        cb(null, config.upPath)
    },
    filename: function (req, file, cb) {
        let path = file.originalname //file.originalname.match(/\.\w+$/)[0]
        cb(null, path)
    }
})

// 上传文件
//这个需要再定义一个参数来标识用户导入的文件，调用那个接口
routes.post('/upFile', multer({storage}).single('file'), async ctx => {
    const {originalname, mimetype, filename, path, size} = ctx.req.file
    let msg
    let fullPath = common.web_domain + config.upPath.replace('dist/', '/') + originalname
    /* if (size > common.upFile_maxSize || !common.upFile_accept.test(mimetype)) {
         msg = size > common.upFile_maxSize ? '上传文件大小超出' : '非法上传文件格式'
         isDel = 1
         fs.unlinkSync(path)// 同步删除文件
     }*/

    ctx.body = {
        success: !msg,
        message: msg,
        data: {
            filename: fullPath,
            filePath: path
        }
    }
})


// 验证权限函数
async function verify(ctx) {
    return new Promise((resolve, reject) => {
        if (ctx.url.substring(0, 5) !== '/api/') {
            resolve({})// 非后端接口请求
        }
        let arr = /\/api\/([a-zA-Z_]+)/.exec(ctx.url)
        let key = arr ? arr[1] : ''
        let obj = urls[key]
        if (!urls.hasOwnProperty(key)) {
            resolve('非法请求链接：' + ctx.url)
        } else if (ctx.method !== (obj.method ? obj.method : 'post').toUpperCase()) {
            resolve('非法请求方式：' + ctx.method)
        }
        // 异步验证token
        const userType = obj.userType
        if (userType === 0) {
            resolve({}) // 不需要验证token
        }
        jwt.verify(ctx.request.header.authorization, config.JWTs.secret, (err, decoded) => {
            if (err) {
                resolve('token验证错误！')
            } else {
                if (config.getClientIP(ctx) !== decoded.ip || !Number.isInteger(decoded.id)) {
                    resolve('token无效！')
                } else if (decoded.user_type > userType) {
                    resolve('对不起您无权操作！')
                }
            }
            resolve(decoded)// 把用户信息带上
        })
    })
}

module.exports = {
    verify,
    routes
}
