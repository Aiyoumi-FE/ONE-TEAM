<template>
    <div>
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'app'
}
</script>
<style lang="scss">
@import './var.scss';

</style>

