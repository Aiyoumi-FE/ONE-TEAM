<template>
    <div>
        <page-header></page-header>
        <transition name="fade">
            <div class="page">
                <div class="content">
                    <router-view></router-view>
                </div>
            </div>
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

</style>

