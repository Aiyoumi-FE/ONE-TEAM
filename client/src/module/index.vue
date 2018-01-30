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
    data() {
        return {
            online: true // 这个是干啥的？
        }
    },
    components: {
        pageHeader
    }
}

</script>
<style lang="scss">
@import '../var.scss';
@import '../assets/style/main.scss';
</style>
