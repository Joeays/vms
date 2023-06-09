<template>
    <div>
        <div @click="clickParent">
            <p>
                <el-button type="success" @click="clickBtn">成功按钮</el-button>
            </p>
            <div style="height: 50px; color: black" id="testId">1111111</div>
            <p>
                <button @click.stop="htmlBtn">html标签按钮</button>
            </p>
        </div>
        <div class="father">
            <div class="son">我是垂直居中的div</div>
        </div>
        <div class="fathers">
            <div class="left">12</div>
            <div class="right">22</div>
        </div>
        <div class="bfc">
            <div></div>
            <div></div>
        </div>
        <el-button @click="handleRequests">axios</el-button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "event",
    data() {
        return {
            obj: '111'
        }
    },
    mounted() {
        // this.obj.addEventListener("click", this.clickBtn(), true); // 捕获方式
        // this.obj.addEventListener("click", this.clickBtn(), false); // 冒泡方式

        // 0、""、false、null、undefined、NaN 判断为false (6个)
        // if (![] == false) {
        //     console.log(true)
        // } else {
        //     console.log(false)
        // }

        console.log(typeof Symbol())
        console.log(JSON.stringify([]) === '[]')
        console.log([] instanceof Array)
    },
    methods: {
        handleRequests() {
            var a = 'a' //可以重复声明
            let c = 'c'
            axios.post('/postAxios', {
                name: '小美post'
            }).then(res => {
                a = 'ab1'
                c = 'cd1'
                console.log('postAxios 成功响应', res);
            }).catch(err => {
                console.log('postAxios err', err);
            })
            console.log(a)
            console.log(c)
            axios({
                method: 'get',
                url: '/getAxios'
            }).then(res => {
                console.log('getAxios 成功响应', res);
            }).catch(err => {
                console.log('getAxios err', err);
            })
        },
        clickParent() {
            console.log('父级窗口')
        },
        clickBtn() {
            this.obj = '2222'
            console.log('el-button按钮窗口')
        },
        htmlBtn() {
            console.log('html标签按钮点击窗口')
        }
    }
}
</script>

<style scoped lang="scss">
.bfc {
    div {
        margin: 50px 50px;
        width: 50px;
        height: 50px;
        display: table-cell;
        background: #44bd32;
    }
}

/*.father {
    position: relative;
    width: 500px;
    height: 500px;
    background-color: red;
}*/

/*1.绝对定位（盒子宽高已知）*/
/*.son {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -150px;
    width: 300px;
    height: 300px;
    background-color: blue;
}*/
/*2.绝对定位（宽高已知）*/
/* .son {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background-color: blue;
}*/
/*3.定位 （宽高未知）*/
/* .son {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: blue;
}*/
/*4.grid布局（父元素设置，宽高未知）（兼容性ie 10以上支持）*/
/*.father {
    display: grid;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 500px;
    background-color: red;
}*/
/*5.flex布局（父元素设置，宽高未知）（兼容性ie 11以上支持）*/
/*.father {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 500px;
    background-color: red;
}*/
/*6.表格布局（父元素设置，宽高未知）（兼容性较好）*/
.father {
    display:table-cell;
    text-align: center;
    vertical-align: middle;
    width: 500px;
    height: 500px;
    background-color: red;
}
.son {
    display: inline-block;
}
/*1.float布局*/
/*.left {
    width: 200px;
    height: 200px;
    float: left;
    background-color: blue;
}
.right {
    margin-left: 200px;
    height: 200px;
    background-color: red;
}*/
/*2.绝对定位*/
.fathers {
    position: relative;
    height: 200px;
}

.left {
    position: absolute;
    width: 200px;
    height: 100%;
    float: left;
    background-color: blue;
}

.right {
    position: absolute;
    height: 100%;
    left: 200px;
    right: 0;
    background-color: #800a0a;
}


</style>
