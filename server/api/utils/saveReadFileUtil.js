const P = require('../public')
const fs = require('fs')
const iconv = require('iconv-lite')
const csvParser = require('csv-parse/lib/sync')
const SqliteDB = require('../utils/sqliteDB.js').SqliteDB


module.exports = saveReadFileUtil

// 读取csv文件
async function saveReadFileUtil(filePath,tabName) {
    let dataList
    let result = {}
    let count
    let insertTileSql
    const str = fs.readFileSync(filePath)
    let input = iconv.decode(str,'utf-8')
    dataList = csvParser(input,{
        skip_empty_lines:true
    })

    let querySql = "PRAGMA table_info([" +tabName + "])"
    let sqliteDB = new SqliteDB("vms.db")
    let colList = await sqliteDB.queryData(querySql)

    let colListStr =''
    for (let i=0; i<colList.length;i++) {
        colListStr += colList[i].name + ','
    }
    colListStr = colListStr.substring(0, colListStr.length - 1)
    insertTileSql = 'INSERT INTO '+ tabName +' ('+colListStr+') VALUES (null,?,?,?,?) '
    /*   if (tabName == 't_project_assets') {
           insertTileSql = 'INSERT INTO '+ tabName +' ('+colListStr+') VALUES (null,?,?,?,?) '
       }
       if (tabName == 't_imported_file') {
           insertTileSql = 'INSERT INTO '+ tabName +' ('+colListStr+') VALUES (?,?,?,?,?,?,?,?,?) '
       }
       if (tabName == 't_importing_file') {
           insertTileSql = 'INSERT INTO '+ tabName +' ('+colListStr+') VALUES (?,?,?,?,?) '
       }*/
    count = dataList.length
    let arr = []
    for (let i = 0; i < dataList.length; i++) {
        arr.push(dataList[i])
    }
    let restInfo = await sqliteDB.insertData(insertTileSql, arr)
    await sqliteDB.close()

    result.msg = restInfo.changes >>> 0 ? '已成功导入'+ restInfo.changes +'条数据' : '导入失败'
    result.err = restInfo.changes >>> 0 ? true : false
    result.total = restInfo.changes
    return result
}
