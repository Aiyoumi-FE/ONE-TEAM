<template>
    <div v-show="loaded">
        <div v-if="status == 'online'" class="hello">
            <h1>Hello, {{form.nickName}} :）</h1>
            <p>Even if it's the end of the world, I'll be there for you</p>
            <button class="rain-btn__primary mt45" @click="submitSignout">退出</button>
        </div>
        <div v-else class="form">
            <user-login v-if="status == 'login'" @back="back"></user-login>
            <user-register v-if="status == 'register'" @back="back"></user-register>
        </div>
    </div>
</template>
<script>
import {
    signout
} from '@/store/home'
import {
    cookie
} from '@/assets/js/cookie'
import base64 from '@/assets/js/base64'
import UserRegister from './register-form'
import UserLogin from './login-form'
export default {
    name: 'login',
    data() {
        return {
            loaded: false,
            online: false,
            status: 'login',
            form: {
                nickName: '',
                userPassword: ''
            },
            photo: require('./image/cat.png')
        }
    },
    mounted() {
        this.initData()
    },
    components: {
        UserRegister,
        UserLogin
    },
    methods: {
        initData() {
            this.form.nickName = base64.decode(cookie.get('name'))
            if (this.form.nickName) {
                this.status = 'online'
            }
            this.loaded = true
        },
        submitSignout() {
            signout((result) => {
                let res = JSON.parse(result)
                if (res.success) {
                    this.status = 'login'
                } else {
                    alert(res.resultDes)
                }
            })
        },
        back(msg) {
            this.status = msg
            this.initData()
        }
    }
}

</script>
<style lang='scss' scoped>
.form {
    margin: 0 auto;
    width: 450px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    text-align: center;
    padding: 85px 0;
    margin-top: 100px;
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
