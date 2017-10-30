<template>
    <div class="content">
        <div class="weekly">
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
<style scoped>
.weekly {
    position: relative;
    margin: 100px auto;
    width: 80%;
    min-height: 800px;
    padding: 50px 0;
    background-color: #fff;
    box-shadow: 0 0 15px 0 #999;
}

</style>
