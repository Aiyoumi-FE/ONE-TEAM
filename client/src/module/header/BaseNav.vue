<template>
    <div class="nav">
        <p class="logo">
            <img src="./image/logo.png" alt="">
        </p>
        <ul class="nav-ul">
            <li v-for="item in navList" class="nav-li">
                <router-link :to="{name: item.link, params: item.params}">{{item.name}}</router-link>
            </li>
        </ul>
        <p class="nav-catalog" @click="isPop = !isPop">=</p>
        <transition name="slide-up">
            <ul class="nav-ul_min" v-show="isPop">
                <li v-for="item in navList" class="nav-li">
                    <router-link :to="{name: item.link, params: item.params}">{{item.name}}</router-link>
                </li>
            </ul>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'header',
    data() {
        return {
            navList: [{
                name: 'Home',
                link: 'home'
            }, {
                name: 'Weekly',
                link: 'weeklyList'
            }, {
                name: 'Team',
                link: 'teamList'
            }, {
                name: 'Settings',
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
@media screen and (max-width: 700px) {
    .nav-catalog {
        display: block;
    }
    .nav-ul{
        display: none;
    }
}
.nav-ul_min {

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
