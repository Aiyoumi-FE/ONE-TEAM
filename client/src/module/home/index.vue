<template>
    <div class="page-content home">
        <div class="hello">
            <h1>Hello, {{nickName}} :）</h1>
            <p>Even if it's the end of the world, I'll be there for you</p>
            <button class="btn mt45" @click="submitSignout">退出</button>
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
import util from '@/assets/js/util'
export default {
    name: 'home',
    data() {
        return {
            nickName: ''
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            this.nickName = base64.decode(cookie.get('name'))
            if (!this.nickName) {
                util.login()
            }
        },
        submitSignout() {
            signout((res) => {
                if (res.success) {
                    this.$router.replace({
                        name: 'login'
                    })
                } else {
                    alert(res.resultDes)
                }
            })
        }
    }
}

</script>
<style lang='scss' scoped>
.home {
    width: 100%;
    height: 800px;
    background: url(./image/bg.jpeg) center no-repeat;
    background-size: cover;
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

</style>
