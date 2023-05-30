module.exports = {
  dateUtil:formatDate,
  formatDate,
  checkDate,
  checkDateTime,
  getFulldate
}

//转换date显示时间
function formatDate(data) {
  var date = new Date(data).toJSON()
  return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
}

//校验日期格式 yyyy-MM-dd
function checkDate(str) {
  var reg = /^(\d{4})-(\d{2})-(\d{2})$/
  if (str == null || str == '') return false
  if (!str.match(reg)) {
    return false
  }
  return true
}


//校验时间格式 yyyy-MM-dd HH:mm:ss
function checkDateTime(str){
  var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
  var r = str.match(reg);
  if(r==null)return false;
  r[2]=r[2]-1;
  var d= new Date(r[1], r[2],r[3], r[4],r[5], r[6]);
  if(d.getFullYear()!=r[1])return false;
  if(d.getMonth()!=r[2])return false;
  if(d.getDate()!=r[3])return false;
  if(d.getHours()!=r[4])return false;
  if(d.getMinutes()!=r[5])return false;
  if(d.getSeconds()!=r[6])return false;
  return true;
}

function getFulldate() {
    let nowDate = new Date();
    return `${nowDate.getFullYear()}-${getZero(nowDate.getMonth() + 1)}-${getZero(nowDate.getDate())} ${nowDate.getHours()}:${getZero(nowDate.getMinutes())}:${getZero(nowDate.getSeconds())}`;
}
