<template>
    <div>
        <page-header :online="online"></page-header>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
import pageHeader from './header'
export default {
    name: 'app',
    data() {
        return {
            online: true
        }
    },
    components: {
        pageHeader
    }
}

</script>
<style lang="scss">
@import '../var.scss';

</style>

