module.exports = {
    writeJson,
    writeComplexJson,
    deleteJson,
    findJson,
    pagination,
    c_pagination
}

const fs = require('fs')

//新增和修改
function writeJson(filePath, params, id) {
    return new Promise((resolve, reject) => {
        // fs模块读取json文件  对fs、path模块不熟悉的可以去查下官方文档
        fs.readFile(filePath, function (err, data) {
            if (err) {
                // 报错返回
                resolve({code: -1, msg: '新增失败' + err})
                return console.error(err);
            }
            let jsonData = data.toString();//将二进制的数据转换为字符串
            jsonData = JSON.parse(jsonData);//将字符串转换为json对象
            // 有id值=>修改 无id值=>新增
            if (id) {
                jsonData.splice(jsonData.findIndex(item => item.id === id), 1, params)
            } else {
                // 有重复 => 返回-1  无重复 => 将params加到json数组末尾
                let hasRepeat = jsonData.filter((item) => item.id === params.id);
                hasRepeat.length > 0 ? resolve({code: -1, msg: '新增失败，数据id重复'}) : jsonData.push(params)
            }
            //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            let str = JSON.stringify(jsonData,null,"\t")
            fs.writeFile(filePath, str, function (err) {
                if (err) {
                    resolve({code: -1, msg: '新增失败' + err})
                }
                resolve({code: 0, msg: '新增成功'})
            })
        })
    })
}

//删除
function deleteJson(filePath, id) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                resolve({code: -1, msg: '删除失败' + err})
                return console.error(err);
            }
            let jsonData = data.toString();//将二进制的数据转换为字符串
            jsonData = JSON.parse(jsonData);//将字符串转换为json对象
            // 过滤出所存item的id和前端传来id不等的 item ，下面提供了两种方法filter和splice
            jsonData = jsonData.filter((item) => item.id !== id);
            // jsonData.splice(jsonData.findIndex(item => item.id === id), 1)
            let str = JSON.stringify(jsonData,null,"\t");
            fs.writeFile(filePath, str, function (err) {
                if (err) {
                    resolve({code: -1, msg: '删除失败' + err})
                }
                resolve({code: 0, msg: '删除成功'})
            })
        })
    })
}

//单个查询
function findJson(filePath, id) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, function (err, data) {
            if (err) {
                resolve({code: -1, msg: '查询失败' + err})
                return console.error(err);
            }
            let jsonData = data.toString();//将二进制的数据转换为字符串
            jsonData = JSON.parse(jsonData);//将字符串转换为json对象
            // 有id值=>单个 无id值=>全部
            if (id) {
                jsonData = jsonData.filter((item) => item.id === id);
                resolve({code: 0, data: jsonData})
            } else {
                resolve({code: 0, data: jsonData})
            }

        })
    })
}

//分页
function pagination(filePath, p, s) {
    return new Promise((resolve, reject) => {
        //p为页数，比如第一页传0，第二页传1,s为每页多少条数据
        let pageData = {}
        fs.readFile(filePath, function (err, data) {
            if (err) {
                console.error(err);
            }
            let jsonList = data.toString();
            console.log(jsonList)
            jsonList = JSON.parse(jsonList);
            //把数据读出来
            //console.log(person.data);
            pageData.page = jsonList.slice(s * p, (p + 1) * s);
            pageData.count = jsonList.length;
            resolve(pageData)
        })
    })
}


//json复杂结构的增加 ---- 其实核心就是增加了一级结构
//exq:{"data":[{"id":2,"label":"123"},{"id":3,"label":"123"},{"id":1,"label":"13"}]}
function writeComplexJson(filePath, params, id) {
    //现将json文件读出来
    return new Promise((resolve, reject) => {

        fs.readFile(filePath, function (err, data) {
            if (err) {
                return console.error(err);
            }
            let jsonData = data.toString();//将二进制的数据转换为字符串
            jsonData = JSON.parse(jsonData);//将字符串转换为json对象
            if (id) {
                jsonData.data.splice(jsonData.findIndex(item => item.id === id), 1, params)
            } else {
                // 有重复 => 返回-1  无重复 => 将params加到json数组末尾
                let hasRepeat = jsonData.data.filter((item) => item.id === params.id);
                hasRepeat.length > 0 ? resolve({code: -1, msg: '新增失败，数据id重复'}) : jsonData.data.push(params)
            }
            let str = JSON.stringify(jsonData,null,"\t");//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            fs.writeFile(filePath, str, function (err) {
                if (err) {
                    resolve({code: -1, msg: '新增失败' + err})
                }
                resolve({code: 0, msg: '新增成功'})
            })
        })
    })
}

//复杂结构分页
//例子{"data":[{"id":2,"label":"123"},{"id":3,"label":"123"},{"id":1,"label":"13"}]}
function c_pagination(filePath, p, s) {
    let pageData = {}
    return new Promise((resolve, reject) => {
        //p为页数，比如第一页传0，第二页传1,s为每页多少条数据
        fs.readFile(filePath, function (err, data) {
            if (err) {
                console.error(err);
            }
            let jsonList = data.toString();
            console.log(jsonList)
            jsonList = JSON.parse(jsonList);
            //把数据读出来
            //console.log(person.data);
            pageData.page = jsonList.slice(s * p, (p + 1) * s);
            pageData.count = jsonList.length;
            resolve(pageData)
        })
    })
}
