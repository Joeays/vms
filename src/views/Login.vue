<template>
    <div class="main-login h100">
        <el-row class="login-container">
            <div class="login-logo"><span>{{ webName }}</span></div>
            <el-form :model="data" :rules="rule_data" ref="loginForm">
                <el-form-item prop="user_name">
                    <el-input type="text"
                              placeholder="账号"
                              v-model="data.user_name"
                              :disabled="loading"
                              autofocus
                              clearable
                              @keyup.native.enter="handleLogin"></el-input>
                </el-form-item>
                <el-form-item prop="pass_word">
                    <el-input type="password"
                              placeholder="密码"
                              v-model="data.pass_word"
                              :disabled="loading"
                              show-password
                              clearable
                              @keyup.native.enter="handleLogin"></el-input>
                </el-form-item>
                <el-form-item v-if="false">
                    <el-row type="flex" justify="space-between">
                        <el-link type="primary" :underline="false" :disabled="loading"
                                 @click="handleRegPopup('register')">
                            注册
                        </el-link>
                        <el-link type="primary" :underline="false" @click="handleRegPopup('retrieve')">忘记密码</el-link>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="w100" @click="handleLogin" :disabled="btnLoad.login">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-dialog :title="title[type]"
                   :visible.sync="register.visible"
                   custom-class="main-dialog">
            <el-form :model="form"
                     :rules="register.rules"
                     label-width="120px"
                     ref="regForm">
                <el-form-item label="帐号：" prop="user_name" v-if="type==='register'">
                    <el-input v-model="form.user_name"
                              :placeholder="placeholder.name"
                              suffix-icon="p-icon p-icon-f p-icon-f-user"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：" prop="user_email">
                    <el-input v-model="form.user_email"
                              :placeholder="placeholder.email"
                              suffix-icon="p-icon p-icon-f p-icon-f-email"></el-input>
                </el-form-item>
                <el-form-item :label="type==='register'?'密码：':'新密码：'" prop="pass_word">
                    <el-input type="password" v-model="form.pass_word"
                              :placeholder="placeholder.pass"
                              suffix-icon="p-icon p-icon-f p-icon-f-pwd"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="pass_words">
                    <el-input type="password" v-model="form.pass_words"
                              :placeholder="placeholder.pass"
                              suffix-icon="p-icon p-icon-f p-icon-f-pwd"
                              @keyup.native.enter="handleRegisters"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="register.visible = false">取 消</el-button>
                <el-button type="primary" :disabled="register.loading" @click="handleRegisters">确 定</el-button>
            </div>
        </el-dialog>
        <particles color="#f1f1f1" :particleOpacity="0.7" :particlesNumber="30" shapeType="star" :particleSize="5"
                   linesColor="#f1f1f1" :linesWidth="2" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
                   :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true"
                   clickMode="push"/>
    </div>
</template>

<script>
/**
 * Login.vue -- Start
 * @author Joe
 * @date 2020/8/7 16:08
 **/

import '@/components/index';
import '@/assets/style/main.scss';
import utils from '@/utils';

export default {
    name: 'Login',
    data() {
        const that = this
        return {
            webName: utils.common.web_name,
            data: {
                user_name: 'admin',
                pass_word: 'admin?123'
            },
            placeholder: {
                name: utils.common.name_txt,
                pass: utils.common.pass_txt,
                email: utils.common.email_txt
            },
            title: {
                register: '用户注册',
                retrieve: '找回密码'
            },
            type: 'register', /* register|retrieve */
            register: {
                visible: false,
                loading: false,
                rules: {
                    user_name: [{
                        required: true,
                        message: '用户帐号不能为空！',
                        trigger: 'change'
                    }, {
                        validator: (rule, value, callback) => {
                            if (!utils.common.name_reg.test(value)) {
                                callback(new Error(utils.common.name_txt))
                            } else if (that.err.includes('帐号')) {
                                callback(new Error(that.err))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'change'
                    }],
                    pass_word: [{
                        required: true,
                        message: '密码不能为空！',
                        trigger: 'change'
                    }, {
                        validator: (rule, value, callback) => {
                            if (!utils.common.pass_reg.test(value)) {
                                callback(new Error(utils.common.pass_txt))
                            } else {
                                that.form.pass_words && that.$refs.regForm.validateField('pass_words')
                                callback()
                            }
                        },
                        trigger: 'change'
                    }],
                    pass_words: [{
                        required: true,
                        message: '确认密码不能为空！',
                        trigger: 'change'
                    }, {
                        validator: (rule, value, callback) => {
                            if (!utils.common.pass_reg.test(value)) {
                                callback(new Error(utils.common.pass_txt))
                            } else if (that.form.pass_word !== that.form.pass_words) {
                                callback(new Error('密码与确认密码不相同！'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'change'
                    }],
                    user_email: [{
                        required: true,
                        message: '邮箱不能为空！',
                        trigger: 'change'
                    }, {
                        validator: (rule, value, callback) => {
                            if (!utils.common.email_reg.test(value)) {
                                callback(new Error(utils.common.email_txt))
                            } else if (that.err.includes('邮箱')) {
                                callback(new Error(that.err))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'change'
                    }]
                }
            },
            form: {
                user_name: '',
                pass_word: '',
                pass_words: '',
                user_email: ''
            },
            loading: false,
            btnLoad: {
                login: false,
            },
            rule_data: {
                user_name: [{
                    required: true,
                    message: '帐号不能为空！',
                    trigger: 'change'
                }, {
                    pattern: utils.common.name_reg,
                    message: utils.common.name_txt,
                    trigger: 'change'
                }],
                pass_word: [{
                    required: true,
                    message: '密码不能为空！',
                    trigger: 'change'
                }, {
                    pattern: utils.common.pass_reg,
                    message: utils.common.pass_txt,
                    trigger: 'change'
                }]
            },
            err: '',
            isChecked: true
        }
    },
    mounted() {
        utils.storage.remove('userInfo')
        let key = this.$route.query.active || this.$route.query.find
        if (key && utils.common.deal_results.hasOwnProperty(key)) {
            let err = this.$route.query.active ? '激活用户' : '密码找回'
            this.$notify({
                title: '系统通知',
                duration: 10000,
                message: utils.common.deal_results[key].replace('#', err),
                type: key === 'success' ? 'success' : 'error'
            })
        }
        this.handleActiveMenu(this.$route)
    },
    methods: {
        /**
         * 处理注册/忘记密码窗口
         * @date 2020/9/7 13:13
         * @param {String} type 窗口类型
         **/
        handleRegPopup(type) {
            this.$refs.regForm && this.$refs.regForm.resetFields()
            this.type = type
            this.register.visible = true
        },
        /**
         * 处理注册
         * @date 2020/9/7 13:14
         * @returns {Function}
         **/
        handleRegisters() {
            this.$refs.regForm.validate(valid => {
                if (valid) {
                    this.$confirm('确定要' + this.title[this.type] + '？注意：操作后需要邮箱激活帐号！', '系统提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.register.loading = true
                        utils.ajax.call(this, '/' + this.type, this.form, (data, err) => {
                            this.register.loading = false
                            if (!err) {
                                this.register.visible = false
                                let err = this.type === 'register' ? '注册用户' : '找回密码'
                                this.$message({
                                    message: (data.emailErr ? '#成功。但激活邮件发送失败，请联系管理员！' : '恭喜您#成功,请登录邮箱激活帐号！').replace('#', err),
                                    type: data.emailErr ? 'warning' : 'success'
                                })
                            } else {
                                this.err = err
                                if (err.includes('帐号') || err.includes('邮箱')) {
                                    this.$refs.regForm.validateField(err.includes('帐号') ? 'user_name' : 'user_email')
                                }
                            }
                        })
                    })
                }
            })
        },
        /**
         * 登录按钮
         * @date 2020/8/31 17:45
         * @returns {Function}
         **/
        handleLogin() {
            let secretkey = utils.common.cryptoJS.methods.randomString(32)
            this.data.pass_word = utils.common.cryptoJS.methods.encrypt(this.data.pass_word, secretkey)
            this.data.secretkey = secretkey
            this.$refs.loginForm.validate(valid => {
                if (valid && !this.loading) {
                    this.loading = true
                    this.btnLoad.login = true
                    utils.ajax.call(this, utils.api.login, this.data, (data, err) => {
                        this.loading = false
                        this.btnLoad.login = false
                        if (!err) {
                            utils.storage.set('userInfo', data.data, () => {
                                let url = this.$route.query.url
                                url = url && !url.includes('login') ? url : '/'
                                this.$router.replace(url)
                            })
                        } else {
                            this.data.pass_word = utils.common.cryptoJS.methods.decrypt(this.data.pass_word, secretkey)
                            this.data.pass_word = ''
                        }
                    })
                }
            })
        },
        /**
         * 处理活跃菜单
         * @date 2021/2/1 15:39
         * @param {Object} route    菜单路由
         * @returns {Function}
         **/
        handleActiveMenu(route) {
            route = route || this.$route
            if (route.matched.length) {
                this.routes = route.matched
                let title = ''
                route.matched.forEach(obj => {
                    title += obj.meta.title + ' - '
                })
                this.activeRouter = route.path
                document.title = title + utils.common.web_name
            } else {
                this.$router.push('/*')
                this.activeRouter = '/404'
                document.title = '404 - ' + utils.common.web_name
            }
        }
    },
    watch: {
        $route(to) {
            this.handleActiveMenu(to)
        },
        'form.user_name'() {
            if (this.err.includes('帐号')) this.err = ''
        },
        'form.user_email'() {
            if (this.err.includes('邮箱')) this.err = ''
        },
        'data.pass_word'() {
            this.btnLoad.login = !this.data.pass_word
        }
    }
}
</script>
