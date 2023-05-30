// 后台配置文件
module.exports = {

    /*development --- 开发环境*/
    sqlite:{
        db: "db/vms.db"
    },

    /*json文件枚举类型*/
    json_file:{
    },

    //静态目录文件密钥
    crypto_secret:'antiy.cn',

    //文件类型
    file_type:{
        'cap': '.cap',
        'txt': '.txt',
        'json': '.json'
    },

    //定时器开关 1是打开 0是关闭
    timer_switch: 0,

    // 上传路径
    upPath: 'dist/upfile/',

    // token 配置
    JWTs: {
        secret: 'antiy@3621', // 指定密钥
        expiresIn: '1d' // 超时设置 m分钟 h小时 d天数
    },

    //缓存最大时长
    timeout: 86398000,

    // 公用：获取客户端IP
    getClientIP: function (ctx) {
        let req = ctx.request
        let ip = ctx.ip ||
            req.headers['x-forwarded-for'] ||
            req.ip ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress || ''
        let arr = ip.match(/(\d{1,3}\.){3}\d{1,3}/)
        return arr ? arr[0] : ''
    }
}
