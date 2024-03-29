/**
 * storage.js -- Start
 * @author Joe
 * @date 2020/6/9 9:26
 **/

// 本地存储
class Storage {
    constructor() {
        this.storage = window.localStorage
        this.prefix = 'vms_'
    }

    set(key, value, fun) {
        if (typeof value !== 'string') {
            try {
                value = JSON.stringify(value)
            } catch (e) {
            }
        }
        this.storage.setItem(this.prefix + key, value)
        typeof fun === 'function' && fun()
    }

    get(key, fun) {
        let value = this.storage.getItem(this.prefix + key)
        try {
            value = JSON.parse(value)
            if (value === null) value = {}
        } catch (e) {
            value = {}
        }
        return typeof fun === 'function' ? fun.call(this, value) : value
    }

    remove(key) {
        this.storage.removeItem(this.prefix + key)
    }
}

export default new Storage()
