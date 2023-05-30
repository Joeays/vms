import axios from 'axios'
import storage from './storage'

// 配置axios
axios.defaults.timeout = 3000
axios.defaults.baseURL = '/api'
axios.interceptors.request.use(config => {
    config.headers.authorization = storage.get('userInfo').token || ''
    return config
}, error => {
    console.error(error)
    return Promise.reject(error)
})
axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

/**
 * 封装通用ajax方法
 * @date 2020/11/23 15:18
 * @param {String}      url         请求的接口URL
 * @param {Object}      data        传的参数，没有则传空对象
 * @param {Function}    fn          回调函数 fn(返回的数据,错误信息)
 * @param {Function}    progress    上传进度函数 progress(返回的数据)
 * @returns {Function}
 **/
function ajax(url, data, fn, progress = function () {
}) {
    let head = 'application/json; charset=UTF-8'
    axios({
        method: 'POST', url, data: data, onUploadProgress: event => {
            progress.call(this, Math.round((event.loaded * 100) / event.total))
        }, headers: {
            'Content-Type': head
        }
    }).then((res) => {
        res = res || {status: 404, statusText: '服务器出错'}
        if (res.status === 200 || res.status === 304 || res.status === 400) {
            return res
        } else {
            return {
                status: res.status, data: {
                    success: false, data: {}, message: res.statusText
                }
            }
        }
    }).then((res) => {
        let msg
        if (res.data && !res.data.success) {
            msg = res.data.message
            if (msg) {
                this.$message.error(msg)
                if (msg.includes('authorization')) {
                    storage.remove('userInfo')
                    location.href = '/login'
                }
            } else {
                console.error('系统错误')
            }
        }
        if (!msg && typeof res.data.data !== 'object' && typeof res.data.data !== 'number') {
            this.$message.error('返回对象不能为空')
        }
        fn.call(this, msg ? null : res.data, msg)
    }).catch(msg => {
        if (msg !== undefined) {
            console.error(msg)
        } else {
            storage.remove('userInfo')
            location.href = '/login'
        }
    })
}

export default ajax
