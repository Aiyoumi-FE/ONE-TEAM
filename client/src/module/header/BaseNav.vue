<!-- 待废弃 -->
<template>
    <div class="nav">
        <p class="logo" v-show="!isPop">
            <img src="./image/logo.png" alt="">
        </p>
        <ul class="nav-ul">
            <li v-for="(item, index) in navList" class="nav-li nav_parent" @click="showChildList(index)">
                <router-link :to="{name: item.link, params: item.params}">{{item.name}}</router-link>
                <ul v-if="item.children && item.children.length && item.chidShow" class="nav_child">
                    <li v-for="itemC in item.children">
                        <router-link :to="{name: itemC.link, params: itemC.params}">{{itemC.name}}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="nav-catalog">
            <span @click="isPop = !isPop" class="btn_list"></span>
            <transition name="slide-up">
                <ul class="nav-ul_min" v-show="isPop">
                    <li v-for="(item, index) in navList" class="nav-li nav_parent" @click="showChildList(index)">
                        <router-link :to="{name: item.link, params: item.params}">{{item.name}}</router-link>
                        <ul v-if="item.children && item.children.length && item.chidShow" class="nav_child">
                            <li v-for="itemC in item.children">
                                <router-link :to="{name: itemC.link, params: itemC.params}">{{itemC.name}}</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    name: 'headerWrapper',
    data() {
        return {
            navList: [{
                name: '主页',
                link: 'home'
            }, {
                name: '周报',
                link: 'weeklyList'
            }, {
                name: '团队',
                link: 'teamList'
            }, {
                name: '面板',
                link: 'teamDashBoard'
            }, {
                name: '个人设置',
                link: '',
                chidShow: false,
                children: [{
                    name: '个人信息',
                    link: 'settings'
                }, {
                    name: '我的关注',
                    link: 'mysub'
                }]
            }],
            isPop: false,
            curIndex: -1
        }
    },
    methods: {
        showChildList(index) {
            if (this.navList[index].hasOwnProperty('chidShow')) {
                if (this.curIndex === -1) {
                    this.curIndex = index
                }

                if (this.curIndex !== index) {
                    this.navList[this.curIndex]['chidShow'] = false
                }
                this.curIndex = index
                this.navList[this.curIndex]['chidShow'] = !this.navList[this.curIndex]['chidShow']
            } else {
                if (this.curIndex !== -1) {
                    this.navList[this.curIndex]['chidShow'] = false
                }
            }
        }
    }
}

</script>
<style lang="scss" scoped>
.nav-catalog {
    display: none;
}

.btn_list {
    display: inline-block;
    width: 36px;
    height: 36px;
    background: url('./image/list.png') 0 center no-repeat;
    background-size: cover;
}

@media screen and (max-width: 660px) {
    .nav-catalog {
        display: flex;
        align-items: center;
    }
    .nav-ul {
        display: none;
    }
}

.nav-ul_min {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .nav-li {
        display: inline-block;
        padding: 0 5px;
    }
}

.logo {
    height: 100%;
    img {
        height: 100%;
    }
    flex-grow: 1;
}

p {
    margin: 0;
    padding: 0;
}

ul {
    margin: 0;
    padding: 0;
}

.nav_parent {
    position: relative;
    .nav_child {
        position: absolute;
        left: 13px;
        top: 32px;
        z-index: 100;
        background: #f9f9f9;
        padding: 5px;
        border-radius: 7px;
        box-shadow: 0 0 15px 0 #999;
    }
    li {
        margin: 3px;
        a {
            color: #787373;
        }
    }
}

</style>
