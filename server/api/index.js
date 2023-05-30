let fs = require('fs')
let files = fs.readdirSync('./server/api/');
let obj = {}
let exclude = ['index.js', 'public.js'] // 排除文件
/*readDir.forEach(function (file) {
  if (file.endsWith('.js') && !exclude.includes(file)) {
    obj[file.replace('.js', '')] = require('./' + file)
  }
})*/
files.forEach(file =>
  {
    if (file.endsWith('.js') && !exclude.includes(file)) {
      obj[file.replace('.js', '')] = require('./' + file)
      //console.log("server目录下"+ obj)
    }
    else if(!file.endsWith('.js') && !exclude.includes(file) && file != 'utils') {
      //console.log("api目录下"+ file)
      var filePath = './server/api/'+file
      var fileList = fs.readdirSync(filePath);
      /*console.log(fileList)*/
      fileList.forEach(files => {
        if (files.endsWith('.js') && !exclude.includes(files)) {
          obj[files.replace('.js', '')] = require('./'+ file +'/'+ files)
          /*console.log(obj)*/
        }
        if (!files.endsWith('.js') && !exclude.includes(files)) {
            //console.log("当前目录下"+ files)
            var filePath1 = filePath +'/' +files
            var fileList1 = fs.readdirSync(filePath1);
            fileList1.forEach(files1 => {
                if (files1.endsWith('.js') && !exclude.includes(files1)) {
                    obj[files1.replace('.js', '')] = require('./'+ file +'/'+ files +'/'+ files1)
                    /*console.log(obj)*/
                }
            })
        }
      })
    }
  })

module.exports = obj
