<template>
    <div>
        <div class="methods-link">
            <h4>链接邀请，发送下发链接至邀请人</h4>
            <p>https://tower.im/join?t=9ad942b5cf95fa6867efd3d7b64a59f7</p>
        </div>
        <div class="methods-email">
            <h4>邮件邀请</h4>
            <p>https://tower.im/join?t=9ad942b5cf95fa6867efd3d7b64a59f7</p>
        </div>
        <div class="methods-orcode">
            待开放。
        </div>
    </div>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {
            nullPic: require('src/assets/null.png')
        }
    },
    mounted() {},
    methods: {
    }
}
</script>
<style lang="scss" scoped>
@import '../../var.scss';
.mid{
    text-align: center;
}
.team-pic_no{
    width: 80px;
}
</style>