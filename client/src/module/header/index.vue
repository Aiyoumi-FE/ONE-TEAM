<template>
    <div class="headerWrapper">
        <div class="nav">
            <div class="nav-logo">
                <img class="nav-notice" src="./image/logo.png" alt="">
            </div>
            <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1"><router-link :to="{name: 'teamDashBoard'}">面板</router-link></el-menu-item>
                <el-menu-item index="2"><router-link :to="{name: 'weeklyList'}">周报</router-link></el-menu-item>
                <el-menu-item index="3"><router-link :to="{name: 'teamList'}">团队</router-link></el-menu-item>
                <el-menu-item index="4" class="nav-notice">
                    <img src="../../assets/icon/notice.png" alt="">
                </el-menu-item>
                <el-submenu index="5">
                    <template slot="title">我的头像</template>
                    <el-menu-item index="5-1">账户设置</el-menu-item>
                    <el-menu-item index="5-2">我的关注</el-menu-item>
                    <el-menu-item index="5-3" @click="submitSignout">退出</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>
<script>
import {
    Menu,
    Submenu,
    MenuItem
} from 'element-ui'
import { cookie } from '@/assets/js/cookie'
export default {
    name: 'headerbar',
    data() {
        return {}
    },
    components: {
        'el-menu': Menu,
        'el-submenu': Submenu,
        'el-menu-item': MenuItem
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        },
        submitSignout() {
            this.$http.post('/user/signout')
            .then((response) => {
                const res = response.data

                if (res.success) {
                    cookie.clear('token', '/')
                    cookie.clear('name', '/')
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
<style lang="scss" scoped>
.headerWrapper {
    background-color: #fff;
}

.nav {
    width: 960px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
}

.el-menu-demo {
    display: flex;
    border: 0;
}

.nav-notice {
    padding-right: 0px;
    img {
        width: 20px;
    }
}

.nav-logo img {
    width: 120px;
}

</style>
