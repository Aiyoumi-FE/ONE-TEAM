<template>
    <div class="nav">
        <ul class="ul">
            <li v-for="item in navList" class="li">
                <router-link :to="{name: item.link, params: item.params}">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'header',
    data() {
        return {
            navList: [{
                name: 'About',
                link: 'About'
            }, {
                name: 'Team',
                link: 'team'
            }, {
                name: 'Weekly',
                link: 'weeklyList'
            }, {
                name: 'Home',
                link: 'home'
            }]
        }
    }
}

</script>
<style scoped>
.nav {
    height: 100%;
}

</style>
