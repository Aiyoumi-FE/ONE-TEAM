<template>
    <div class="page">
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import weekList from './list'
export default {
    name: 'weekly',
    data() {
        return {
            online: true
        }
    },
    components: {
        weekList
    },
    mounted() {},
    methods: {}
}

</script>
