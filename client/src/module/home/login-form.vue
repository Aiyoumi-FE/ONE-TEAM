<template>
    <div>
        <input class="input form-input" type="text" placeholder="登录邮箱" v-model.trim="form.eMail">
        <input class="input form-input mt25" type="password" placeholder="密码" v-model.trim="form.userPassword">
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
            login(this.form, (result) => {
                let res = JSON.parse(result)
                if (res.success) {
                    this.$emit('back', 'online')
                } else {
                    alert(res.resultDes)
                }
            })
        },
        goRegsiter() {
            this.$emit('back', 'register')
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
<style lang='scss' scoped>
.form {
    margin: 0 auto;
    width: 450px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    text-align: center;
    padding-top: 85px;
    margin-top: 100px;
}

.form-input {
    display: block;
    margin: 0 auto;
}

.mt25 {
    margin-top: 25px;
}

.hello {
    width: 80%;
    text-align: center;
    margin: 120px auto;
    color: #fff;
    font-size: 24px;
    h1 {
        font-size: 40px;
        margin: 20px auto;
    }
}

.mt45 {
    margin-top: 45px;
}

</style>
