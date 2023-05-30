<template>
    <div class="page401-container">
        <div class="page401-content">
            <el-row>
                <el-col :span="12">
                    <div class="page401-back">
                        <el-button type="info" icon="el-icon-back" @click="handleBack">返回</el-button>
                    </div>
                    <h1 class="text-jumbo">OOPS!</h1>
                    <h2 class="text-headline">抱歉，您没有权限访问此页面</h2>
                    <p class="text-info">如有不满请联系管理员，或者你可以：</p>
                    <el-link icon="el-icon-link" :underline="false" href="/">返回首页</el-link>
                    <el-link icon="el-icon-link" :underline="false" href="https://antiy.cn">访问安天官网</el-link>
                </el-col>
                <el-col :span="12">
                    <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import errGif from '@/assets/images/main-401.gif';

export default {
    name: 'Page401',
    data() {
        return {
            errGif: errGif + '?' + +new Date()
        }
    },
    methods: {
        /**
         * 处理返回
         * @date 2020/11/4 16:43
         * @returns {Function}
         **/
        handleBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.page401-container {
    width: 100%;
    height: 100%;
    background: #fff;

    .page401-content {
        width: 700px;
        max-width: 100%;
        padding-top: 200px;
        margin: 0 auto;

        .page401-back {
            padding: 50px 0px;
        }

        .text-jumbo {
            font-size: 32px;
            font-weight: bold;
            line-height: 40px;
            opacity: 0;
            margin-top: 50px;
            margin-bottom: 20px;
            animation-name: slideUp;
            animation-duration: .5s;
            animation-fill-mode: forwards;
            color: #484848;
        }

        .text-headline {
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

        .text-info {
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

        .el-link {
            font-size: 12px;
            padding-right: 10px;
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
</style>
