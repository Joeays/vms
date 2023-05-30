const P = require('../public')
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

var DB = DB || {};

/*创建数据库文件以及数据库对象*/
DB.SqliteDB = function(DB_name){
    let file
    if (DB_name == 'vms.db') {
       // file = basePath + P.config.sqlite.pas_db
       file = P.config.sqlite.db
    }
    this.db = new sqlite3.Database(file)

   /* DB.exist = fs.existsSync(file);
    if(!DB.exist){
        //'r+','w+' - 以读写模式打开文件。'a+' - 以读取追加模式打开文件  'w','a' - 以读取模式打开文件
        fs.openSync(file, 'w+');
    };*/
};

/*错误日志输出*/
DB.printErrorInfo = function(err){
    console.log("Error Message:" + err.message + " ErrorInfo:" + err.toString());
};

/*创建表*/
DB.SqliteDB.prototype.createTable =  function(sql){
    this.db.serialize(function(){
        this.db.run(sql, function(err){
            if(null != err){
                DB.printErrorInfo(err);
                return;
            }
        });
    });
};

/*insertData
批量新增
param：tilesData format; [[level, column, row, content], [level, column, row, content]]
返回数据影响条数：resolve(this.changes)
返回插入的行ID：resolve(this.lastID)

*/
DB.SqliteDB.prototype.insertData = function(sql, param){
    let result = {}
    this.db.serialize(function(){
        var stmt = this.prepare(sql);
        for(var i = 0; i < param.length; ++i){
            stmt.run(param[i]);
        }
        stmt.finalize();
        result.changes = param.length
    });
    return result
};

/**queryData
 * 查询
 *   条件筛选时，param及占位符赋值，注意顺序；
 *   不需要条件操作时，不要传param,查询的是所有数据
 *
 * 注意：Database.all 首先检索所有结果行并将其存储在内存中。
 *      对于数据量可能很大的查询命令时候，请使用 Database.each 函数或 Database.prepare 代替这个方法。
 */
DB.SqliteDB.prototype.queryData = function(sql,param){
    return new Promise((resolve,reject)=>{
        this.db.all(sql,param, function(err, rows){
            if(null != err){
                DB.printErrorInfo(err);
                reject(err)
            }
            resolve(rows)
        });

    })
};
/*

//查询一条数据，暂不用
DB.SqliteDB.prototype.getData = function(sql,param){
    return new Promise((resolve,reject)=>{
        DB.db.get(sql,param,function(err, rows){
            if(null != err){
                DB.printErrorInfo(err);
                reject(err)
            }
            resolve(rows)
        });

    })
};
*/

/*executeSql
*   可以进行(单条)新增、更新，删除
*   需要条件时，param及占位符赋值，注意顺序；
*   不需要条件操作时，不要传param
*
* 注意：sql 的类型是 DDL 和 DML，DQL 不能使用这个命令
*
* 返回数据影响条数：resolve(this.changes)
* 返回插入的行ID：resolve(this.lastID)

* */
DB.SqliteDB.prototype.executeSql = function(sql,param){
    let result = {}
    return new Promise((resolve,reject)=>{
        this.db.run(sql,param, function(err){
            if(null != err){
                DB.printErrorInfo(err);
                reject(err)
            }
            result.changes = this.changes
            result.lastID = this.lastID
            resolve(result)
        });
    })
};

/*关闭数据库链接*/
DB.SqliteDB.prototype.close = function(){
    this.db.close();
};

/// export SqliteDB.
exports.SqliteDB = DB.SqliteDB;
