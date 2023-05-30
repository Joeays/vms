const regularUtil = require('../utils/regularUtil')

module.exports = {
  ipIntervalUtil,
  numberToIp,
  ipToNumber
}



// 验证IP的正则
var ip_reg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// 验证子网掩码的正则
var mask_reg = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;

//所有子掩码对应值
function getSubmask(date) {
  var SubmaskMap = new Map()
  SubmaskMap = {
    '1':'128.0.0.0',
    '2':'192.0.0.0',
    '3':'224.0.0.0',
    '4':'240.0.0.0',
    '5':'248.0.0.0',
    '6':'252.0.0.0',
    '7':'254.0.0.0',
    '8':'255.0.0.0',
    '9':'255.128.0.0',
    '10':'255.192.0.0',
    '11':'255.224.0.0',
    '12':'255.240.0.0',
    '13':'255.248.0.0',
    '14':'255.252.0.0',
    '15':'255.254.0.0',
    '16':'255.255.0.0',
    '17':'255.255.128.0',
    '18':'255.255.192.0',
    '19':'255.255.224.0',
    '20':'255.255.240.0',
    '21':'255.255.248.0',
    '22':'255.255.252.0',
    '23':'255.255.254.0',
    '24':'255.255.255.0',
    '25':'255.255.255.128',
    '26':'255.255.255.192',
    '27':'255.255.255.224',
    '28':'255.255.255.240',
    '29':'255.255.255.248',
    '30':'255.255.255.252',
    '31':'255.255.255.254',
    '32':'255.255.255.255'
  }
    var submask = SubmaskMap[date]

    return submask

}

// IP转二进制
function ip_to_binary(ip)
{
  if (ip_reg.test(ip)) {
    var ip_str = "",
      ip_arr = ip.split(".");

    for (var i = 0; i < 4; i++) {
      let curr_num = ip_arr[i];
      let number_bin = parseInt(curr_num);
      number_bin = number_bin.toString(2);
      let count = 8 - number_bin.length;
      for (var j = 0; j < count; j++) {
        number_bin = "0" + number_bin;
      }
      ip_str += number_bin;
    }
    return ip_str;
  }

  return '';
}

// 二进制转IP
function binary_to_ip(binary)
{
  if (binary.length == 32) {
    let a = parseInt(binary.substr(0, 8), 2);
    let b = parseInt(binary.substr(8, 8), 2);
    let c = parseInt(binary.substr(16, 8), 2);
    let d = parseInt(binary.slice(-8), 2);

    return a + '.' + b + '.' + c + '.' + d;
  }

  return '';
}

// 根据子网掩码和网关计算出IP范围（网络地址 - 广播地址）
function get_network_broadcast_addr(ip,mask)
{
  var network_broadcast = [];
  var network_addr = "";

  let mask_arr = mask.split(".");
  let ip_arr = ip.split(".");

  // 计算IP的网络地址 与(&)运算
  for (var i = 0; i < 4; i++) {
    let number1 = parseInt(mask_arr[i]);
    let number2 = parseInt(ip_arr[i]);
    network_addr += number1 & number2;
    if( i < 3 ){
      network_addr += ".";
    }
  }
  network_broadcast.push(network_addr);

  // 计算广播地址
  // 子掩码后面有几个0，就去掉IP地址后几位再补1
  let mask_binary = ip_to_binary(mask);
  let gateway_binary = ip_to_binary(ip);

  let mask_zero = mask_binary.split(0).length - 1;
  let one_number = new Array(mask_zero + 1).join('1'); // IP地址后位补1
  let gateway_hou_wei_bu_yi = gateway_binary.slice(0, -mask_zero) + one_number;

  network_broadcast.push(binary_to_ip(gateway_hou_wei_bu_yi));

  return network_broadcast;
}

// 返回所有IP
function return_ip(network_addr, broadcast_addr)
{
  var range = [];
  let start = network_addr.split(".");
  let end = broadcast_addr.split(".");

  // range格式为[[192], [168], [0,1,2...254], [0,1,2...254]]
  for (var i = 0; i < 4; i++) {
    if (start[i] == end[i]) {
      range[i] = [start[i]];
    } else {
      let min = Math.min(start[i], end[i]);
      let max = Math.max(start[i], end[i]);
      var temp = [];
      for (var j = min; j <= max; j++) {
        temp.push(j);
      }
      range[i] = temp;
    }
  }

  var ip_list = doExchange(range);
  ip_list.shift(); // 去掉网络地址
  ip_list.pop(); // 去掉广播地址


  return ip_list;
}

//  全排列组合算法（两两递归组合）
function doExchange(doubleArrays)
{
  var len = doubleArrays.length;
  if(len >= 2){
    var len1 = doubleArrays[0].length;
    var len2 = doubleArrays[1].length;
    var newlen = len1 * len2;
    var temp = new Array(newlen);
    var index = 0;
    for(var i = 0; i < len1; i++){
      for(var j = 0; j < len2; j++){
        temp[index] = doubleArrays[0][i] + '.' + doubleArrays[1][j];
        index++;
      }
    }

    var newArray = new Array(len - 1);
    for(var i = 2; i < len; i++){
      newArray[i - 1] = doubleArrays[i];
    }
    newArray[0] = temp;

    return doExchange(newArray);

  } else{
    return doubleArrays[0];
  }
}

function ipIntervalUtil(data) {
  let ipHead
  let ipTail
  let ipsubmask
  let ipInterval
  //校验ip段
  if (data.includes('/')) {
    ipsubmask = data.split("/")
    ipHead = ipsubmask[0]
    ipTail = ipsubmask[1]
     if (regularUtil.checkIp(ipHead))  {
         if ( ipTail > 0 && ipTail < 33) {
             let submask = getSubmask(ipTail)
             let netArry = get_network_broadcast_addr(ipHead,submask)
             let ipList = return_ip(netArry[0],netArry[1])
             let max_subscript = ipList.length - 1
             ipHead = ipList[0]
             ipTail = ipList[max_subscript]
             ipInterval =  ipHead +"-" + ipTail
         }
         return ipInterval
     }
  }
  return false
}


//整数转IP地址
async function numberToIp(value,row,index){
    var ip = "";
    if(value <= 0) {
        return ip;
    }
    var ip3 = (value << 0 ) >>> 24;
    var ip2 = (value << 8 ) >>> 24;
    var ip1 = (value << 16) >>> 24;
    var ip0 = (value << 24) >>> 24;
    ip += ip3 + "." + ip2 + "." + ip1 + "." + ip0;
    return ip;
  }

//IP地址转整数
async function ipToNumber(ip) {
    var num = 0;
    if(ip == "") {
        return num;
    }
    var aNum = ip.split(".");
    if(aNum.length != 4) {
        return num;
    }
    num += parseInt(aNum[0]) << 24;
    num += parseInt(aNum[1]) << 16;
    num += parseInt(aNum[2]) << 8;
    num += parseInt(aNum[3]) << 0;
    num = num >>> 0;//这个很关键，不然可能会出现负数的情况
    return num;
}

