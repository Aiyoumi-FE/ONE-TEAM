<template>
    <!-- <div class="home" @mousemove='updateXY'> -->
    <div class="home">
        <div class="hello">
            <h1>Hello, {{nickName}} :）</h1>
            <p>Even if it's the end of the world, I'll be there for you</p>
            <button class="btn" @click="submitSignout">退出</button>
        </div>
        <div class="ft">
            <div class="image">
                <!-- <img src="./image/left-pop.png" alt="" ref="imgLeft" v-bind:style="styleObject"> -->
                <img src="./image/left-pop.png" alt="" ref="imgLeft">
                <img src="./image/bg.png" alt="">
                <img src="./image/right-pop.png" alt="" ref="imgRight">
            </div>
            <div class="sub">
            </div>
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
            nickName: '',
            midWidth: document.body.clientWidth / 2,
            btHeight: document.body.clientHeight - 100,
            moveX: 0,
            moveY: 0
        }
    },
    computed: {
        styleObject() {
            return {
                transform: `translate(${this.moveX}px, ${this.moveY}px)`
            }
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
        },
        updateXY(event) {
            this.moveX = (event.offsetX - this.midWidth) / 20
            this.moveY = (event.offsetY - this.btHeight) / 20
        }
    }
}

</script>
<style lang='scss' scoped>
body {
    background-color: #fff;
}

.home {
    width: 100%;
    height: 100%;
    margin-bottom: 100px;
    padding-top: 200px;
}

.btn {
    border: 0;
}

.hello {
    position: relative;
    overflow: hidden;
    width: 80%;
    min-height: 250px;
    margin: 0 auto;
    text-align: center; // margin: 120px auto;
    color: #56332f;
    font-size: 20px;
    h1 {
        color: #56332f;
        font-size: 30px;
        margin: 20px auto;
    }
}

.ft {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-top: 305px;
    text-align: center;
    .image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: -1
    }
    .sub {
        background-color: #56332f;
    }
}

</style>
