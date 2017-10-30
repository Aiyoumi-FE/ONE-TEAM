<template>
    <div class="page-content home">
        <home-login></home-login>
    </div>
</template>
<script>
import homeLogin from './login'
export default {
    name: 'hello',
    data() {
        return {
            online: true
        }
    },
    components: {
        homeLogin
    }
}

</script>
<style scoped>
.home {
    width: 100%;
    height: 800px;
    background: url(./image/bg.jpeg) center no-repeat;
    background-size: cover;
}

</style>
