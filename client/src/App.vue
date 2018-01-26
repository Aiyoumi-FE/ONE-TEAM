<template>
    <transition name="fade">
        <router-view></router-view>
    </transition>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {
            online: true
        }
    }
}

</script>
<style lang="scss">
@import './var.scss';

</style>
