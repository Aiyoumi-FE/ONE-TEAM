<template>
  <div class="form">
    <input type="text" placeholder="用户名" v-model.trim="form.username">
    <input type="text" placeholder="密码" v-model.trim="form.username">
    <button @click="submit">登录</button>
    <button>注册</button>
  </div>
</template>

<script>
import {
  login
} from '../../store/home'
export default {
  name: 'login',
  data() {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  components: {
  },
  methods: {
    submit() {
      login(this.form, (res) => {

      })
    }
  }
}
</script>
<style lang='scss' scoped>
.form{
    width: 450px;
    height: 300px;
    background-color: #000;
}
</style>
