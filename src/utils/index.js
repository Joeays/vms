/**
 * index.js
 * 引入文件
 * @author Joe
 * @date 2023/5/15 17:14
 **/
import api from './api'

export default {
    ajax: require('./ajax.js').default,
    storage: require('./storage.js').default,
    common: require('@/../server/common').default,
    validate: require('./validate.js'),
    api,
}
