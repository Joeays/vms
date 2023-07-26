// 前后台共用变量
const CryptoJS = require('crypto-js')

export default {
    web_name: '旅服监测系统',
    web_domain: 'http://localhost:3001', // 附件地址
    static_web_domain: 'http://localhost:8080', //附件访问地址：'http://10.250.101.30:8081'
    static_server_port: 8080,
    static_server_ip: 'localhost',  //'10.250.101.30',
    static_server_path: 'D:/test',//开发环境 -- 本地自定义附件路径
    //static_server_path: 'file',//测试环境 -- 本地自定义附件路径
    name_reg: '',
    pass_reg: '',
    name_txt: '用户名3至10个字符', // 帐号规则
    server_name_reg: /^[a-zA-Z][a-zA-Z0-9]{3,10}$/,  /*验证可输入字母,数字,且不能数字开头*/
    server_pass_reg: /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,18}/,//-->必须含有数字、字母、特殊字符，三个缺一不可

    pass_txt: '密码必须含有数字、字母、特殊字符，三种缺一不可', // 密码规则
    pic_reg: /^(https?:\/\/|\/upFile\/)/i,
    pic_txt: '文件地址不正确！',
    upFile_maxSize: 1024 * 1024 * 10, // 上传文件大小限制
    upFile_accept: '', // 上传文件格式限制/^image\// /^csv\//
    user_type: {
        1: '开发者',
        2: '管理员',
        3: '操作员',
        4: '审计员'
    },
    // 页面权限设置  1:操作员 2:审计员 3:管理员 4:开发者
    page_grade: {
        /*  界面 -- Start  */
    },
    deal_results: {
        lack: '#失败：参数错误！',
        nobody: '#失败：查无此用户！',
        errCode: '#失败：激活码错误！',
        failed: '#失败：更新数据异常！',
        success: '恭喜您#成功！可以登录了。'
    },
    mixin: {
        methods: {
            dealUserInfo: function (o) {
                if (this.hasOwnProperty('userInfo')) {
                    this.userInfo = o
                }
                const g = this.grade
                if (g) {
                    const p = this.page_grade
                    for (let k in g) {
                        if (g.hasOwnProperty(k)) {
                            g[k] = o.user_type > p[k]
                        }
                    }
                }
            }
        },
        created: function () {
            this.dealUserInfo(this.$store.state.data)
        },
        watch: {
            '$store.state.data': 'dealUserInfo'
        }
    },
    cryptoJS: {
        methods: {
            encrypt: function encrypt(data, secretkey) {
                let encryptData = CryptoJS.AES.encrypt(data, secretkey).toString()
                return encryptData
            },
            decrypt: function decrypt(data, secretkey) {
                let decryptData = CryptoJS.AES.decrypt(data, secretkey)
                const str = decryptData.toString(CryptoJS.enc.Utf8)
                return str
            },
            randomString: function randomString(len) {
                len = len || 32
                let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
                /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
                let maxPos = $chars.length
                let randomStr = ''
                for (let i = 0; i < len; i++) {
                    randomStr += $chars.charAt(Math.floor(Math.random() * maxPos))
                }
                return randomStr
            }
        }
    }
}
