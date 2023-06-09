const fs = require('fs')
const readFilePath = '../../../assets/images/icons/svg/link.svg'
fs.readFile(readFilePath, 'utf8', function (err, data) {
    if (err) {
        return console.log('读取失败', err.message)
    }
    console.log('读取成功', data)
})
