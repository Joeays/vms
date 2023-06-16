function xxx(onResolved, fun) {
    // 这里叫做promise2
    console.log(onResolved, 111)
    console.log(fun, 222)
    return new Promise((resolve, inject) => {
        let res = {
            data: 'ddd'
        }
        //计时器模拟请求
        setTimeout(() => {
            if (res) {
                resolve(res)
            } else {
                inject('err')
            }
        })


    });
};
let fun = {}
xxx(fun, fun).then((res) => {
    console.log(res)
})
