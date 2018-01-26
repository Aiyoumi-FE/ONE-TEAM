<template>
    <div class="headerbar">
        <base-nav></base-nav>
    </div>
</template>
<script>
import BaseNav from './BaseNav'
export default {
    name: 'headerbar',
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
    z-index: 8;
    width: 100%;
    z-index: 8;
    background-color: rgba(255, 255, 255, 0.7);
}

</style>
