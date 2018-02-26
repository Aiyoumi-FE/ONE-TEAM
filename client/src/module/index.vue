<template>
    <div class="ot-page">
        <page-header v-if="!$route.meta.throwHeader"></page-header>
        <transition name="fade">
            <router-view :class="{'ot-content': !$route.meta.throwContent}"></router-view>
        </transition>
    </div>
</template>
<script>
import pageHeader from './header'
export default {
    name: 'app',
    components: {
        pageHeader
    }
}

</script>
<style lang="scss">
@import '../var.scss';
// @import '../assets/style/main.scss';
body {
    background-color: #f2f2f2;
}

.ot-page {
    overflow: hidden;
}

.ot-content {
    position: relative;
    margin: 40px auto 0;
    min-height: 800px;
    max-width: 960px;
    background: #fff;
    padding: 10px;
    // overflow: hidden;
}

</style>
