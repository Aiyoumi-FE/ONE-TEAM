<template>
    <div class="page-content">
        <img :src="logo" alt="" class="logo">
        <h1>ONE TEAM</h1>
        <user-login v-if="status == 'login'" @back="back"></user-login>
        <user-register v-if="status == 'register'" @back="back"></user-register>
    </div>
</template>
<script>
import UserRegister from './register'
import UserLogin from './login'
export default {
    name: 'login',
    data() {
        return {
            logo: require('../image/logo.jpg'),
            status: 'login'
        }
    },
    components: {
        UserRegister,
        UserLogin
    },
    methods: {
        back(msg) {
            this.status = msg
        }
    }
}

</script>
<style lang='scss'>
@import '../../../var.scss';
body {
    background-color: #fff;
}

.page-content {
    height: 100%;
    background-color: #fff;
    text-align: center;
    h1 {
        margin: 10px auto;
    }
}

.logo {
    width: 160px;
}

.form-input {
    width: 230px;
    height: 40px;
    border-bottom: 1px solid #222222;
    display: block;
    margin: 20px auto 5px;
    font-size: $fontSizeLevel5;
}

.mt25 {
    margin-top: 25px;
}
</style>
