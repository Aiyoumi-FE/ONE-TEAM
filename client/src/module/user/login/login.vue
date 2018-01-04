<template>
    <div>
        <input class="form-input" type="text" placeholder="登录邮箱" v-model.trim="form.eMail">
        <input class="form-input" type="password" placeholder="密码" v-model.trim="form.userPassword">
        <div class="mt25">
            <button class="btn" @click="submitLogin">登录</button>
            <button class="btn" @click="goRegsiter">去注册</button>
        </div>
    </div>
</template>
<script>
import {
    login
} from '@/store/home'
export default {
    name: 'login',
    data() {
        return {
            form: {
                eMail: '',
                userPassword: ''
            }
        }
    },
    methods: {
        submitLogin() {
            if (!this.check(this.form)) {
                return
            }
            login(this.form, (res) => {
                if (res.success) {
                    if (this.$route.query.backUrl) {
                        window.location.href = this.$route.query.backUrl
                    } else {
                        console.log('登录成功')
                        this.$router.replace({
                            name: 'home'
                        })
                    }
                } else {
                    alert(res.resultDes)
                }
            })
        },
        goRegsiter() {
            this.$router.replace({
                name: 'register'
            })
        },
        check(form) {
            if (!form.eMail) {
                alert('请输入用户名')
                return
            }
            if (!form.userPassword) {
                alert('请输入用户密码')
                return
            }
            return true
        }
    }
}

</script>
