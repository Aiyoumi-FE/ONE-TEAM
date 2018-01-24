<template>
    <div class="page">
        <div class="content mid">
            <img :src="nullPic" alt="" class="team-pic_no">
            <h3>您还未加入任何团队</h3>
            <p class="btn btn-choose">
                <span class="btn-create" :class="{'on' : opera == 'create'}" @click="operation('create')">创建团队</span>
                <span :class="{'on' : opera == 'join'}" @click="operation('join')">加入团队</span>
            </p>
            <div v-show="opera" class="team-opera">
                <input type="text" class="input" ref="field" :placeholder="placeholder" v-model.trim="field">
                <img :src="nextPic" alt="" class="team-pic_next" @click="submit">
            </div>
        </div>
    </div>
</template>
<script>
import {
    teamOpera
} from '@/store/team'
export default {
    name: 'home',
    data() {
        return {
            nullPic: require('src/assets/null.png'),
            nextPic: require('src/assets/next.png'),
            opera: '',
            field: ''
        }
    },
    computed: {
        placeholder() {
            return this.opera === 'create' ? '请输入团队名称' : '请输入团队邀请码'
        }
    },
    mounted() {},
    methods: {
        operation(str) {
            this.opera = str
            this.$nextTick(() => {
                this.$refs.field.focus()
            })
        },
        submit() {
            if (!this.field) {
                return
            }
            let form = {}
            if (this.opera === 'create') {
                form.teamName = this.field
            } else if (this.opera === 'join') {
                form.teamId = this.field
            }
            teamOpera(form, (res) => {
                if (res.success) {
                    this.$router.replace({
                        name: 'home'
                    })
                } else {
                    alert(res.resultDes)
                }
            })
        }
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
.btn-choose{
    margin: 20px auto;
    padding: 0;
    width: 150px;
    background-color: #fff;
    color: #222;
    border: 1px solid #999;
    display: flex;
    span{
        width: 50%;
        display: inline-block;
        text-align: center;
    }
}
.btn-create::after{
    content: " ";
    display: inline-block;
    position: absolute;
    left: 50%;
    width: 1px;
    height: 35px;
    background-color: #999;
}
.on{
    background-color: #222;
    color: #fff;
}
.team-pic_next{
    position: absolute;
    width: 30px;
    margin-left: 20px;
}
</style>