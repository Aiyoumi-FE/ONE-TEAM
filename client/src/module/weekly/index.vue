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
.content {
    padding: 0 10%;
}
.weekly {
    position: relative;
    margin: 100px auto;
    min-height: 800px;
    padding: 50px 15%;
    background-color: #fff;
    box-shadow: 0 0 15px 0 #999;
}

</style>
