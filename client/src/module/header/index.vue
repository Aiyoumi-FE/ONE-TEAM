<template>
    <div class="header">
        <base-nav></base-nav>
    </div>
</template>
<script>
import BaseNav from './BaseNav'
export default {
    name: 'header',
    data() {
        return {}
    },
    components: {
        BaseNav
    }
}

</script>
<style lang="scss" scoped>
.header {
    z-index: 8;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.7);
}

</style>
