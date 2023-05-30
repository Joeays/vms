const P = require('../public')
var cp = require('child_process')
const iconv = require('iconv-lite')
//const info = require('../json/errInfo.json')
const check = require('./checkPamUtil')

module.exports = {
    execShellUtil,
    asyncExecShellUtil,
}


//可同步调用脚本命令的方法，只能使用await来取值，会阻塞线程
async function execShellUtil(cmd){
    let str=cmd;
    let result={};
    //let err_info = info.err_info
    let child
    console.log("当前发送的脚本命令: " + cmd)

    if (str.indexOf("dispatcher") == -1)  {
        return new Promise(function(resolve,reject){
            child = cp.exec(str,{encoding: 'utf-8'}, function(err,stdout,stderr){
                if(err){
                    result.code = 500
                    result.message = "请求失败!请重试"
                    result.data = stderr
                    reject(result)
                }else{
                    result.code = 200
                    result.message = "请求成功!"
                    //要处理错误信息stderr.JSON.err_code
                    result.data = stdout
                    console.log(stdout)
                    resolve(result)
                }
            })
            child.on('exit',function (code) {
                console.log("子进程退出，状态码 "+code)
            })
        })
    }else {
        return new Promise(function(resolve,reject){
            child = cp.exec(str,{encoding: 'utf-8'}, function(err,stdout,stderr){
                if(err){
                    result.code = 500
                    result.message = "请求失败!请重试"
                    resolve(result)
                }else if (check.checkPam(stderr) && stderr.code != 0){
                    //console.log('stdout',stdout);//标准输出
                    //let stderr = iconv.decode(stderr,'utf-8'
                    console.log(stderr)
                    let stderrObj = eval("("+ stderr.toString() +")")
                    result.code = 500
                    result.message = "请求成功，返回异常，请查看错误信息!"
                    //要处理错误信息stderr.JSON.err_code
                   /* for (let key in err_info){
                        if (err_info[key].code == stderrObj.code) {
                            stderrObj.desc = err_info[key].desc
                            stderrObj.reason = err_info[key].reason
                        }
                    }*/
                    result.data = stderrObj
                    console.log("-------------请求终端异常-------------")
                    console.log(stderrObj)
                    resolve(result)

                }else {
                    result.code = 200
                    result.message = "请求成功，返回正常!"
                    console.log(stdout)
                    let stdoutObj = eval("("+ stdout.toString() +")")
                    result.data = stdoutObj
                    resolve(result)
                }
            })
            child.on('exit',function (code) {
                console.log("子进程退出，状态码 "+code)
            })
        })
    }
}





//异步调用，callback取值，不阻塞线程
function asyncExecShellUtil(cmd,callback){
    let str=cmd;
    let result={};
    //let err_info = info.err_info
    cp.exec(str, { encoding: 'utf-8' }, function (err, stdout, stderr) {
        if (err) {
            result.code = 500
            result.message = '请求失败!请重试'
            result.data = err
            callback(result)
        } else if (check.checkPam(stderr) && stderr.code != 0) {
            //console.log('stdout',stdout);//标准输出
            //let stderr = iconv.decode(stderr,'utf-8'
            console.log(stderr)
            let stderrObj = eval('(' + stderr.toString() + ')')
            result.code = 500
            result.message = '请求成功，返回异常，请查看错误信息!'
            //要处理错误信息stderr.JSON.err_code
         /* for (let key in err_info) {
                if (err_info[key].code == stderrObj.code) {
                    stderrObj.desc = err_info[key].desc
                    stderrObj.reason = err_info[key].reason
                }
            }*/
            result.data = stderrObj
            callback(result)
        } else {
            result.code = 200
            result.message = '请求成功，返回正常!'
            console.log(stdout)
            result.data = stdout
            callback(result)
        }
    })
}


