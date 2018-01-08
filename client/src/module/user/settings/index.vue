<template>
    <div class="page">
        <page-header></page-header>
        <div class="content">
            <h2>个人设置</h2>
            <a href="javascript:;" class="link-delete" @click="submitSignout">退出团队</a>
            <div class="setting-cells">
                <div class="setting-item">
                    <label class="label-img" for="file">
                        <div class="setting-img"><img src="../image/cat.png" alt=""></div>
                        <a href="javascript:;">选择新头像</a>
                        <input class="input-file" type="file" name="file" id="file" @change="upImg($event)" enctype="multipart/form-data">
                    </label>
                </div>
                <div class="setting-item">
                    <label>名字</label>
                    <div class="setting-item__filed">
                        <input class="input" type="text" v-model="nickName">
                    </div>
                </div>
                <div class="setting-item">
                    <label>邮箱</label>
                    <div class="setting-item__filed">
                        <input type="text" class="input">
                        <a class="ml20" href="javascript:;">修改邮箱</a>
                    </div>
                </div>
                <div class="setting-item">
                    <label>密码</label>
                    <div class="setting-item__filed">
                        <a class="ml20" href="javascript:;">修改密码</a>
                        <a class="ml20" href="javascript:;">找回密码</a>
                    </div>
                </div>
                <div class="setting-item">
                    <label>&nbsp;</label>
                    <div class="btn week-btn">提交</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import pageHeader from '../../header'
import {
    signout
} from '@/store/home'
import {
    cookie
} from '@/assets/js/cookie'
import base64 from '@/assets/js/base64'
import util from '@/assets/js/util'
export default {
    name: 'members-settings',
    data() {
        return {
            nickName: ''
        }
    },
    components: {
        pageHeader
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
        upImg(e) {
            console.log(e)
            let file = e.target.files[0]
            console.log(file)
            let formData = new FormData()
            formData.append('file', file)
            console.log(formData)
            // uploadFile(formData, (res) => {
            //     console.log(res)
            // })
            let xhr = new XMLHttpRequest()
            xhr.open('POST', '/uploadFile', true)
            // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            console.log(formData)
            xhr.send(formData)
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        let response = JSON.parse(xhr.responseText)
                        console.log(response)
                        // response.code === '-1999' ? util.login() : obj.success(response, xhr.responseXML)
                    } else {
                        console.log(xhr.status)
                    }
                }
            }
        }
    }
}
</script>
<style lang='scss' scoped>
@import '../../../var.scss';
.content {
    position: relative;
    margin: 100px 10%;
    min-height: 800px;
    padding: 30px;
    background-color: #fff;
    -webkit-box-shadow: 0 0 15px 0 #999;
    box-shadow: 0 0 15px 0 #999;
    .link-delete {
        display: block;
        position: absolute;
        right: 40px;
        top: 30px;
        font-size: 12px;
        color: #cf372b;
    }
    h2 {
        margin-bottom: 30px;
        font-size: 18px;
    }
}

.setting-item {
    font-size: 14px;
    margin-bottom: 20px;
    clear: left;
    line-height: 30px;
    label {
        float: left;
        width: 60px;
        text-align: right;
    }
    .label-img {
        display: block;
        float: none;
        width: 100%;
        text-align: left;
        clear: left;
        cursor: pointer;
        height: 60px;
        img {
            width: 100%;
        }
        a {
            margin-left: 10px;
            line-height: 60px;
            font-size: 12px;
        }
        .input-file {
            opacity: 0;
        }
    }
    .setting-img {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        float: left;
        overflow: hidden;
    }
    &__filed {
        margin-left: 70px;
        font-size: 12px;
    }
}
</style>
