<template>
    <div class="page404-container">
        <div class="page404-content">
            <div class="page404-pic">
                <img class="page404-pic__parent" src="@/assets/images/main-404.png" alt="404">
                <img class="page404-pic__child left" src="@/assets/images/main-404-cloud.png" alt="404">
                <img class="page404-pic__child mid" src="@/assets/images/main-404-cloud.png" alt="404">
                <img class="page404-pic__child right" src="@/assets/images/main-404-cloud.png" alt="404">
            </div>
            <div class="page404-bullshit">
                <div class="page404-bullshit__oops">OOPS!</div>
                <div class="page404-bullshit__info">All rights reserved
                    ©<a class="page404-link-type" href="https://antiy.cn" target="_blank">Antiy</a>
                    版权所有
                </div>
                <div class="page404-bullshit__headline">{{ message }}</div>
                <div class="page404-bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回首页或者访问安天官网</div>
                <el-link class="page404-bullshit__return-home" icon="el-icon-link" :underline="false" href="/">返回首页
                </el-link>
                <el-link class="page404-bullshit__return-home" icon="el-icon-link" :underline="false"
                         href="https://antiy.cn">
                    访问安天官网
                </el-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'page404',
    computed: {
        message() {
            return '抱歉，您访问的页面出错啦'
        }
    }
}
</script>
<style lang="scss" scoped>
.page404-container {
    margin: 250px auto 0;
    width: 900px;

    .page-back {
        padding: 50px 0px;
    }

    .page404-content {
        position: relative;
        width: 900px;
        overflow: hidden;

        .page404-pic {
            position: relative;
            float: left;
            width: 600px;
            overflow: hidden;

            &__parent {
                width: 100%;
            }

            &__child {
                position: absolute;

                &.left {
                    width: 80px;
                    top: 17px;
                    left: 220px;
                    opacity: 0;
                    animation-name: cloudLeft;
                    animation-duration: 2s;
                    animation-timing-function: linear;
                    animation-fill-mode: forwards;
                    animation-delay: 1s;
                }

                &.mid {
                    width: 46px;
                    top: 10px;
                    left: 420px;
                    opacity: 0;
                    animation-name: cloudMid;
                    animation-duration: 2s;
                    animation-timing-function: linear;
                    animation-fill-mode: forwards;
                    animation-delay: 1.2s;
                }

                &.right {
                    width: 62px;
                    top: 100px;
                    left: 500px;
                    opacity: 0;
                    animation-name: cloudRight;
                    animation-duration: 2s;
                    animation-timing-function: linear;
                    animation-fill-mode: forwards;
                    animation-delay: 1s;
                }

                @keyframes cloudLeft {
                    0% {
                        top: 17px;
                        left: 220px;
                        opacity: 0;
                    }
                    20% {
                        top: 33px;
                        left: 188px;
                        opacity: 1;
                    }
                    80% {
                        top: 81px;
                        left: 92px;
                        opacity: 1;
                    }
                    100% {
                        top: 97px;
                        left: 60px;
                        opacity: 0;
                    }
                }
                @keyframes cloudMid {
                    0% {
                        top: 10px;
                        left: 420px;
                        opacity: 0;
                    }
                    20% {
                        top: 40px;
                        left: 360px;
                        opacity: 1;
                    }
                    70% {
                        top: 130px;
                        left: 180px;
                        opacity: 1;
                    }
                    100% {
                        top: 160px;
                        left: 120px;
                        opacity: 0;
                    }
                }
                @keyframes cloudRight {
                    0% {
                        top: 100px;
                        left: 500px;
                        opacity: 0;
                    }
                    20% {
                        top: 120px;
                        left: 460px;
                        opacity: 1;
                    }
                    80% {
                        top: 180px;
                        left: 340px;
                        opacity: 1;
                    }
                    100% {
                        top: 200px;
                        left: 300px;
                        opacity: 0;
                    }
                }
            }
        }

        .page404-bullshit {
            position: relative;
            float: left;
            width: 300px;
            padding: 30px 0;
            overflow: hidden;

            &__oops {
                font-size: 32px;
                font-weight: bold;
                line-height: 40px;
                color: #1482f0;
                opacity: 0;
                margin-top: 50px;
                margin-bottom: 20px;
                animation-name: slideUp;
                animation-duration: .5s;
                animation-fill-mode: forwards;
            }

            &__headline {
                font-size: 20px;
                line-height: 24px;
                color: #222;
                font-weight: bold;
                opacity: 0;
                margin-bottom: 10px;
                animation-name: slideUp;
                animation-duration: .5s;
                animation-delay: .1s;
                animation-fill-mode: forwards;
            }

            &__info {
                font-size: 12px;
                line-height: 21px;
                color: grey;
                opacity: 0;
                margin-bottom: 20px;
                animation-name: slideUp;
                animation-duration: .5s;
                animation-delay: .2s;
                animation-fill-mode: forwards;
            }

            &__return-home {
                display: block;
                float: left;
                text-align: center;
                color: #ffffff;
                padding-right: 10px;
                opacity: 0;
                font-size: 12px;
                animation-name: slideUp;
                animation-duration: .5s;
                animation-delay: .3s;
                animation-fill-mode: forwards;
            }

            a {
                text-decoration: none;
                color: grey;
            }

            @keyframes slideUp {
                0% {
                    transform: translateY(60px);
                    opacity: 0;
                }
                100% {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        }
    }
}
</style>
