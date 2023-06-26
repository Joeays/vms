let ary = [1, 2, 1, 2, 3, 4, 5]
let ary2 = [1, 2, 1, 2, 3, 4, 5, 6, 7, 7, 8, 7, 9, 10]

function uniqueArray(arr) {
    const result = []
    for (let i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) === -1) {
            result.push(arr[i])
        }
    }
    return result
}

function uniqueArray(arr) {
    const result = []
    const obj = {}
    for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            result.push(arr[i])
            obj[arr[i]] = true
        }
    }
    return result
}

function uniqueArray(arr) {
    return arr.filter((item, index, arr) => arr.indexOf(item) === index)
}

function uniqueArray(arr) {
    let tmpArr = [], hash = {};//hash为hash表
    for (let i = 0; i < arr.length; i++) {
        if (!hash[arr[i]]) {//如果hash表中没有当前项
            hash[arr[i]] = true;//存入hash表
            tmpArr.push(arr[i]);//存入临时数组
        }
    }
    return tmpArr;
}

// console.log(uniqueArray(ary2))

let obj = {
    '0': 'first',
    '1': 'second',
    '2': 'third',
    length: 5
}
let arr = Array.from(obj)
console.log(obj)
console.log(arr) //["first", "second", "third"]
//es5 实现
let arr2 = Array.prototype.slice.call(obj)
console.log(arr2) //["first", "second", "third"]
