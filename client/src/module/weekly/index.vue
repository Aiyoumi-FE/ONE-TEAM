<template>
    <transition name="fade">
        <router-view></router-view>
    </transition>
</template>
<script>
import weekList from './list'
export default {
    name: 'weekly',
    data() {
        return {
        }
    },
    components: {
        weekList
    },
    mounted() {},
    methods: {}
}

</script>
