<template>
    <div class="main" :class="{'main-collapse':main.isCollapse}" @click="handleClosePopup">
        <el-aside class="main-menu" width="">
            <div class="menu-title">
                <div class="title-collapse">
                    <i :class="'el-icon-s-'+(main.isCollapse?'unfold':'fold')" @click="handleCollapseMenu"></i>
                </div>
                <div class="title-logo">
                    <span><i class="el-icon-s-home"></i>{{ main.webName.toUpperCase() }}</span>
                </div>
            </div>
            <el-menu :router="true"
                     :collapse="main.isCollapse"
                     :default-active="main.activeRouter"
                     class="el-menu-vertical-demo">
                <template v-for="item in getMenuData">
                    <el-submenu :key="item.path"
                                :index="item.path"
                                v-if="!item.hidden"
                                popper-class="main-collapse-submenu">
                        <template slot="title">
                            <svg-icon :icon-class="item.meta.icon"/>
                            <span slot="title">{{ item.meta.title }}</span>
                        </template>
                        <el-menu-item v-for="sub in item.children"
                                      :key="sub.path"
                                      :index="item.path + '/' + sub.path"
                                      v-if="sub.meta.show"
                                      :disabled="sub.meta.disabled">
                            <template slot="title">
                                <svg-icon :icon-class="sub.meta.icon"/>
                                <span slot="title">{{ sub.meta.title }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </template>
            </el-menu>
        </el-aside>
        <el-header class="main-header" height="">
            <div class="header-toolbar">

            </div>
            <div class="header-user">
                <el-tooltip :content="main.userInfo.user_name" placement="bottom-end">
                    <p @click.stop="handleUserPopup" class="user-name"></p>
                </el-tooltip>
                <div class="user-info">
                    <dl>
                        <dt title="更新头像" :style="{ backgroundColor: stringToColor(main.userInfo.user_name),color:'#fff' }" @click="handleAvatarPopup"></dt>
                        <dd>昵称：{{ main.userInfo.user_name }}</dd>
                        <dd>{{ main.userInfo.user_type | typeFilter }}</dd>
                    </dl>
                    <dl>
                        <el-button :disabled="main.grade.changePwd" @click="handlePwdPopup">修改密码</el-button>
                        <el-button type="primary" @click="handleLoginOut">退出登录</el-button>
                    </dl>
                </div>
            </div>
        </el-header>
        <el-main class="main-container">
            <transition name="fade" mode="out-in">
                <router-view :userInfo="main.userInfo"></router-view>
            </transition>
        </el-main>
        <el-dialog title="更新头像"
                   :visible.sync="main.upUser.visible"
                   custom-class="main-dialog main-user">
            <el-form :model="main.upUser"
                     :rules="main.upUser.rules"
                     label-width="120px"
                     ref="picFormRef">
                <el-form-item label="头像地址：" prop="pic">
                    <el-row>
                        <el-col :span="18">
                            <el-input v-model="main.upUser.pic"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <UpFile ref="upImageRef" :upload="{}" @upFileValue="handleUserAvatarPath"/>
                            <el-button :disabled="main.grade.avatarFile"
                                       icon="el-icon-upload"
                                       @click="handleUpAvatar"
                                       class="fr">{{ main.upName }}
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="main.upUser.visible = false">取消</el-button>
                <el-button type="primary" disabled @click="handleUserAvatarInfo">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改密码"
                   :visible.sync="main.password.visible"
                   custom-class="main-dialog main-user">
            <el-form :model="main.password.form"
                     :rules="main.password.rules"
                     label-width="120px"
                     ref="passwordRef">
                <el-form-item label="旧密码：" prop="old_password">
                    <el-input type="password"
                              v-model="main.password.form.old_password"
                              suffix-icon="p-icon p-icon-f p-icon-f-pwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="pass_word">
                    <el-input type="password"
                              v-model="main.password.form.pass_word"
                              suffix-icon="p-icon p-icon-f p-icon-f-pwd"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" prop="pass_words">
                    <el-input type="password"
                              v-model="main.password.form.pass_words"
                              suffix-icon="p-icon p-icon-f p-icon-f-pwd"
                              @keyup.native.enter="handleChangePwd"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="main.password.visible = false">取 消</el-button>
                <el-button type="primary" :disabled="main.password.loading" @click="handleChangePwd">确 定</el-button>
            </div>
        </el-dialog>
        <el-backtop target=".main-container" :visibility-height="10"/>
    </div>
</template>

<script>
import '@/components/index';
import '@/assets/style/main.scss';
import utils from '@/utils';

const doc = {
    start: null,
    div: null,
    obj: null,
    parameter: {
        delay: 0,
        endDelay: 0,
        fill: 'forwards',
        iterations: 1,
        duration: 500,
        direction: 'normal',
        easing: 'ease-in'
    },
    keyframes: [
        {
            offset: 0,
            opacity: 0,
            filter: 'blur(40px)',
            transformOrigin: '50% 0',
            transform: 'perspective(800px) rotateY(-180deg) translateZ(150px)'
        }, {
            offset: 1,
            opacity: 1,
            filter: 'blur(0px)',
            transformOrigin: '0 0',
            transform: 'perspective(800px) rotateY(0deg) translate3d(0px,0px,0px)'
        }
    ]
}
export default {
    name: 'home',
    data() {
        let that = this
        return {
            main: {
                grade: {
                    changePwd: !0,
                    avatarFile: !0
                },
                page_grade: utils.common.page_grade,
                webName: utils.common.web_name,
                routes: [],
                userInfo: {},
                activeRouter: '',
                isCollapse: false,
                upName: '开始上传',
                upUser: {
                    visible: false,
                    pic: '',
                    rules: {
                        pic: {
                            required: true,
                            pattern: utils.common.pic_reg,
                            message: utils.common.pic_txt,
                            trigger: 'change'
                        }
                    }
                },
                password: {
                    visible: false,
                    loading: false,
                    form: {
                        old_password: '',
                        pass_word: '',
                        pass_words: ''
                    },
                    rules: {
                        old_password: [{
                            required: true,
                            message: '旧密码不能为空！',
                            trigger: 'change'
                        }, {
                            validator: (rule, value, callback) => {
                                if (!utils.common.pass_reg.test(value)) {
                                    callback(new Error(utils.common.pass_txt))
                                } else {
                                    that.password.form.pass_word && that.$refs.passwordRef.validateField('pass_word')
                                    callback()
                                }
                            },
                            trigger: 'change'
                        }],
                        pass_word: [{
                            required: true,
                            message: '新密码不能为空！',
                            trigger: 'change'
                        }, {
                            validator: (rule, value, callback) => {
                                let form = that.password.form
                                if (!utils.common.pass_reg.test(value)) {
                                    callback(new Error(utils.common.pass_txt))
                                } else if (form.old_password === form.pass_word) {
                                    callback(new Error('新密码不能与旧密码相同！'))
                                } else {
                                    form.pass_words && that.$refs.passwordRef.validateField('pass_words')
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
                                let form = that.password.form
                                if (!utils.common.pass_reg.test(value)) {
                                    callback(new Error(utils.common.pass_txt))
                                } else if (form.pass_word !== form.pass_words) {
                                    callback(new Error('新密码与确认密码不相同！'))
                                } else {
                                    callback()
                                }
                            },
                            trigger: 'change'
                        }]
                    }
                }
            }
        }
    },
    created() {
        this.handleToken(null)
        utils.storage.get('userInfo', obj => {
            if (JSON.stringify(obj) !== '{}') {
                this.$store.dispatch('set_userInfo', obj.userInfo)
                this.main.userInfo = obj.userInfo
            } else {
                this.$router.push('/login')
            }
        })
    },
    mounted() {
        this.handleUserInfo()
        this.handleActiveMenu(this.$route)
        doc.start = window.Element.prototype.animate !== undefined ? 'off' : null
    },
    methods: {
        /**
         * 处理用户窗口
         * @date 2020/8/21 15:41
         **/
        handleUserPopup() {
            doc.div = document.querySelector('.user-info')
            doc.div.style.opacity = 1
            doc.div.style.top = '40px'
            if (doc.start === 'off') {
                doc.start = 'on'
                doc.parameter.fill = 'forwards'
                doc.obj = doc.div.animate(doc.keyframes, doc.parameter)
                doc.obj.addEventListener('finish', () => {
                    doc.div.style.top = doc.start === 'on' ? '40px' : '-200px'
                }, false)
            }
        },
        /**
         * 处理用户信息
         * @date 2020/8/21 15:41
         * @returns {Function}
         **/
        handleUserInfo() {
            let dom = document.querySelectorAll('.header-user p,.user-info dt')
            if (dom.length) {
                const v = this.main.userInfo
                let name = v.user_name.replace(/[a-z]+/g, '')
                name = name ? name.slice(0, 1) : v.user_name.slice(0, 2)
                Array.from(dom).forEach(d => {
                    if (v.user_pic) {
                        d.style.backgroundImage = 'url(' + v.user_pic + ')'
                        d.style.textContent = ''
                    } else {
                        d.textContent = name.toUpperCase()
                    }
                })
            }
        },
        /**
         * 处理关闭窗口
         * @date 2021/2/5 10:32
         * @returns {Function}
         **/
        handleClosePopup() {
            doc.div && (doc.div.style.opacity = 0)
            if (doc.start === 'on') {
                doc.parameter.fill = 'backwards'
                doc.start = 'off'
                doc.obj.reverse()
            }
        },
        /**
         * 处理头像窗口
         * @date 2020/8/21 15:57
         **/
        handleAvatarPopup() {
            this.main.upUser.visible = true
            this.$refs.picFormRef && this.$refs.picFormRef.resetFields()
        },
        stringToColor(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            let color = Math.abs(hash).toString(16).substring(0, 6);
            return '#' + '0'.repeat(6 - color.length) + color;
        },
        /**
         * 处理上传头像
         * @date 2020/8/21 15:58
         **/
        handleUpAvatar() {
            this.$refs.upImageRef.handleSelectionUpFile()
        },
        /**
         * 处理用户头像路径
         * @date 2020/8/21 16:00
         **/
        handleUserAvatarPath(data) {
            this.main.upUser.pic = data.filename
        },
        /**
         * 处理用户头像信息
         * @date 2020/8/21 15:59
         **/
        handleUserAvatarInfo() {
            this.$refs.picFormRef.validate(v => {
                if (v) {
                    utils.ajax.call(this, utils.api.getUpUserInfo, {pic: this.main.upUser.pic}, (data, err) => {
                        if (!err) {
                            utils.storage.get('userInfo', obj => {
                                obj.userInfo.user_pic = data.data.pic
                                utils.storage.set('userInfo', obj)
                                Array.from(document.querySelectorAll('.header-user p,.user-info dt')).forEach(user => {
                                    user.style.backgroundImage = 'url(' + data.data.pic + ')'
                                    user.textContent = ''
                                })
                            })
                            this.main.upUser.visible = false
                        }
                    })
                }
            })
        },
        /**
         * 处理密码窗口
         * @date 2020/8/21 15:40
         **/
        handlePwdPopup() {
            this.main.password.visible = true
            this.$refs.passwordRef && this.$refs.passwordRef.resetFields()
        },
        /**
         * 处理修改密码
         * @date 2020/8/21 15:40
         **/
        handleChangePwd() {
            this.$refs.passwordRef.validate(valid => {
                if (valid) {
                    this.main.password.loading = true
                    utils.ajax.call(this, utils.api.getChangePwd, this.main.password.form, (data, err) => {
                        this.main.password.loading = false
                        if (!err) {
                            this.$message({
                                message: '密码修改成功！请记住新密码。',
                                type: 'success'
                            })
                            utils.storage.remove('userInfo')
                            this.$router.push('/login')
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
                this.main.routes = route.matched
                let title = ''
                route.matched.forEach(obj => {
                    if (JSON.stringify(obj.meta) !== '{}') {
                        title += obj.meta.title + ' - '
                    }
                })
                this.main.activeRouter = route.path
                document.title = title + utils.common.web_name
            } else {
                this.$router.push('/*')
                this.main.activeRouter = '/404'
                document.title = '404 - ' + utils.common.web_name
            }
        },
        /**
         * 处理折叠菜单
         * @date 2021/2/5 14:37
         * @returns {Function}
         **/
        handleCollapseMenu() {
            this.main.isCollapse = !this.main.isCollapse
        },
        /**
         * 处理退出登录
         * @date 2021/4/26 13:52
         * @returns {Function}
         **/
        handleLoginOut() {
            utils.ajax.call(this, utils.api.loginOut, {}, (data, err) => {
                utils.storage.remove('userInfo')
                this.$router.push('/login')
            })
        },
        /**
         * 处理token
         * @date 2021/4/26 13:52
         * @param {String}  val
         * @returns {Function}
         **/
        handleToken(val) {
            let that = this

            function tokenRefresh() {
                utils.ajax.call(this, utils.api.checkToken, {}, (data, err) => {
                    if (data) {
                        if (data.data.error === false) {
                            utils.storage.remove('userInfo')
                            this.$router.push('/login')
                        }
                    } else {
                        clearInterval(that.setTokenInfo)
                        utils.storage.remove('userInfo')
                        this.$router.push('/login')
                    }
                })
            }

            tokenRefresh()
            this.setTokenInfo = setInterval(tokenRefresh, 600000)
        }
    },
    mixins: [utils.common.mixin],
    watch: {
        $route(to) {
            this.handleActiveMenu(to)
        }
    },
    computed: {
        getMenuData() {
            let menuData = this.$router.options.routes
            return menuData
        },
        getUserType() {
            return utils.common.user_type[this.main.userInfo.user_type] || '未知'
        }
    },
    filters: {
        typeFilter(val) {
            if (val !== '' && val !== null) {
                const typeMap = {}
                for (let key in utils.common.user_type) {
                    typeMap[key] = utils.common.user_type[key]
                }
                return typeMap[val]
            }
        }
    },
    destroyed() {
        clearInterval(this.setTokenInfo)
    }
}
</script>
