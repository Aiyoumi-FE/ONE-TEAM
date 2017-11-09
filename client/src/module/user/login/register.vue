<template>
    <div>
        <input class="form-input" type="text" placeholder="登录邮箱" v-model.trim="form.eMail">
        <input class="form-input" type="text" placeholder="用户昵称" v-model.trim="form.nickName">
        <input class="form-input" type="password" placeholder="6-12位字母数字密码" v-model.trim="form.userPassword">
        <input class="form-input" type="password" placeholder="密码确认" v-model.trim="form.confirmPassword">
        <div class="mt25">
            <input type="radio" id="create" value="create" v-model="teamPick">
            <label for="create">创建团队</label>
            <input type="radio" id="join" value="join" v-model="teamPick">
            <label for="join">加入团队</label>
        </div>
        <input v-if="teamStatus" class="form-input mt25" type="text" placeholder="团队名称" v-model.trim="form.teamName">
        <input v-else class="form-input mt25" type="text" placeholder="团队邀请码" v-model.trim="form.teamId">
        <div class="mt25">
            <button class="btn" @click="goLogin">《 登录</button>
            <button class="btn" @click="submitRegsiter">注册</button>
        </div>
    </div>
</template>
<script>
import {
    register
} from '@/store/home'
export default {
    name: 'register',
    data() {
        return {
            teamPick: 'create',
            form: {
                eMail: '',
                nickName: '',
                userPassword: '',
                confirmPassword: '',
                teamName: '',
                teamId: ''
            },
            photo: require('../image/cat.png')
        }
    },
    computed: {
        teamStatus() {
            return this.teamPick === 'create'
        }
    },
    components: {},
    methods: {
        submitRegsiter() {
            if (!this.check(this.form)) {
                return
            }
            this.form.photo = this.photo
            register(this.form, (res) => {
                if (res.success) {
                    this.$router.replace({
                        name: 'home'
                    })
                } else {
                    alert(res.resultDes)
                }
            })
        },
        goLogin() {
            this.$emit('back', 'login')
        },
        check(form) {
            if (!form.eMail) {
                alert('请输入用户邮箱')
                return
            }
            if (!form.nickName) {
                alert('请输入昵称')
                return
            }
            if (!form.userPassword) {
                alert('请输入用户密码')
                return
            }
            if (!form.userPassword === form.confirmPassword) {
                alert('两次密码不一致')
                return
            }
            if (this.teamStatus && !form.teamName) {
                alert('请输入团队名称')
                return
            }
            if (!this.teamStatus && !form.teamId) {
                alert('请输入团队邀请码')
                return
            }
            return true
        }
    }
}

</script>
