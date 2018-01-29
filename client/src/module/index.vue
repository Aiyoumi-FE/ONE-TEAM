<template>
    <div class="ot-page">
        <page-header :online="online"></page-header>
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
// @import '../var.scss';
.ot-page {
    padding-top: 100px;
    background: #fff;
    overflow: hidden;
    .ot-content {
        margin: 0 10%;
        position: relative;
        min-height: 800px;
        padding: 50px 10%;
        -webkit-box-shadow: 0 0 15px 0 #999;
        box-shadow: 0 0 15px 0 #999;
        background: #f9f9f9;
    }
}
</style>

