<template>
    <div class="headerbar">
        <base-nav></base-nav>
    </div>
</template>
<script>
import BaseNav from './BaseNav'
export default {
    name: 'headerbar',
    props: {
        online: Boolean
    },
    data() {
        return {}
    },
    components: {
        BaseNav
    }
}

</script>
<style lang="scss" scoped>
.headerbar {
    position: absolute;
    width: 100%;
    height: 80px;
    background-color: rgba(255, 255, 255, 0.7);
}

</style>
