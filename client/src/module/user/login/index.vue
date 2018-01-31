<template>
    <div class="page_login">
        <img :src="logo" alt="" class="logo">
        <h1>ONE TEAM</h1>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'user',
    data() {
        return {
            logo: require('../image/logo.jpg')
        }
    }
}

</script>
<style lang='scss'>
@import '../../../assets/style/base.scss';
body {
    background-color: #fff;
}

.page_login {
    height: 100%;
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
    border: 0;
    border-bottom: 1px solid #222222;
    display: block;
    margin: 20px auto 5px;
    font-size: $fontSizeLevel5;
}

.mt25 {
    margin-top: 25px;
}

</style>
