/**
 * validate.js
 * 公共方法
 * @author Joe
 * @date 2023/5/15 17:08
 **/

export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
    if (typeof str === 'string' || str instanceof String) {
        return true
    }
    return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
    return Array.isArray(arg)
}

/**
 * 千位分隔符格式
 * @date 2020/12/4 9:49
 * @param {String}  value   数值
 * @returns {Function}
 **/
export function thousandsFormat(value) {
    if (!value) return ''
    let valueStr = value.toString(),
        valueReg = valueStr.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
    return valueStr.replace(valueReg, '$1,')
}

/**
 * JSON格式
 * @date 2020/12/4 9:50
 * @param {Array}  dColumn  列值
 * @param {Array}  dData    数据值
 * @returns {Function}
 **/
export function jsonFormat(dColumn, dData) {
    return dData.map(item => dColumn.map(val => {
        if (val === 'timestamp') {
            return item[val]
        } else {
            return item[val]
        }
    }))
}

/**
 * 通用数字
 * @date 2020/12/4 9:55
 * @param {}    rule        规则
 * @param {}    value        参数值
 * @param {}    callback    回调
 * @returns {Function}
 **/
export function isNumeral(rule, value, callback) {
    if (!(value == null || value === '' || typeof (value) === undefined)) {
        const re = /^\d+$|^\d+[.]?\d+$/
        const rsCheck = re.test(value)
        if (!rsCheck) {
            callback(new Error('请输入数字格式！'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}

/**
 * 高亮关键字
 * @date 2021/9/14 11:11
 * @param {string}    str 传入的字符串
 * @param {string}    key 高亮的字符串
 * @returns {}
 **/
export function heightLight(str, key) {
    const reg = new RegExp(key, 'ig')
    return str.replace(reg, (val) => {
        return `<b style="color: #f56c6c">${val}</b>`
    })
}
