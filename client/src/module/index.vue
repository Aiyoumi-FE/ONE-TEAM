<template>
    <div class="page">
        <page-header :online="online"></page-header>
        <router-view></router-view>
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
