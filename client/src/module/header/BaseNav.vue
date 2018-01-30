<template>
    <div class="nav">
        <p class="logo" v-show="!isPop">
            <img src="./image/logo.png" alt="">
        </p>
        <ul class="nav-ul">
            <li v-for="item in navList" class="nav-li">
                <router-link :to="{name: item.link, params: item.params}">{{item.name}}</router-link>
            </li>
        </ul>
        <div class="nav-catalog">
            <span @click="isPop = !isPop">三</span>
            <transition name="slide-up">
                <ul class="nav-ul_min" v-show="isPop">
                    <li v-for="item in navList" class="nav-li">
                        <router-link :to="{name: item.link, params: item.params}">{{item.name}}</router-link>
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    name: 'headerBaseNav',
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
                name: '个人设置',
                link: 'settings'
            }],
            isPop: false
        }
    }
}

</script>
<style lang="scss" scoped>
.nav-catalog {
    display: none;
}
@media screen and (max-width: 1024px) {
    .nav-catalog {
        display: flex;
    }
    .nav-ul{
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

</style>
