module.exports = {
  checkPam: checkPamUtil,
  isEmptyObject
}

function checkPamUtil(data) {
  let flag
  if (data !== null &&  data !== undefined &&  data !== '') {
    return flag = true
  }else {
    return flag = false
  }
}

//校验json、obj 是否存在
function isEmptyObject(obj) {
  for (let key in obj){
    return true;//返回false，不为空对象
  }
  return false;//返回true，为空对象
}


