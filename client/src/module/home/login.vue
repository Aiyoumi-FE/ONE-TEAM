<template>
<div v-show="loaded">
  <div v-if="!online" class="form">
    <input class="rain-input form-input" type="text" placeholder="用户名" v-model.trim="form.username">
    <input class="rain-input form-input mt25" type="password" placeholder="密码" v-model.trim="form.password">
    <div class="mt25">
      <button class="rain-btn__primary" @click="submitLogin">登录</button>
      <button class="rain-btn__primary" @click="submitRegsiter">注册</button>
    </div>
  </div>
  <div v-else class="hello">
    <h1>Hello, {{form.username}} :）</h1>
    <p>Even if it's the end of the world, I'll be there for you</p>
    <button class="rain-btn__primary mt45" @click="submitSignout">退出</button>
  </div>
</div>
</template>

<script>
import {
  login,
  register,
  signout
} from '@/store/home'
import {
  cookie
} from '@/assets/js/cookie'
export default {
  name: 'login',
  data() {
    return {
      loaded: false,
      online: false,
      form: {
        username: '',
        password: ''
      },
      photo: require('./image/cat.png')
    }
  },
  mounted() {
    this.initData()
  },
  components: {
  },
  methods: {
    initData() {
      let name = cookie.get('name')
      console.log(name)
      if (name) {
        this.form.username = name
        this.online = true
      }
      this.loaded = true
    },
    submitLogin() {
      if (!this.check(this.form)) {
        return
      }
      login(this.form, (result) => {
        let res = JSON.parse(result)
        if (res.success) {
          this.online = true
        } else {
          alert(res.resultDes)
        }
      })
    },
    submitRegsiter() {
      if (!this.check(this.form)) {
        return
      }
      this.form.photo = this.photo
      register(this.form, (result) => {
        let res = JSON.parse(result)
        if (res.success) {
          this.online = true
        } else {
          alert(res.resultDes)
        }
      })
    },
    submitSignout() {
      signout((result) => {
        let res = JSON.parse(result)
        if (res.success) {
          this.online = false
        } else {
          alert(res.resultDes)
        }
      })
    },
    check(form) {
      if (!form.username) {
        alert('请输入用户名')
        return
      }
      if (!form.password) {
        alert('请输入用户密码')
        return
      }
      return true
    }
  }
}
</script>
<style lang='scss' scoped>
.form{
  margin: 0 auto;
  width: 450px;
  height: 300px;
  background-color: rgba(255,255,255,0.4);
  border-radius: 10px;
  text-align: center;
  padding-top: 45px;
}
.form-input{
  display: block;
  margin: 0 auto;
}
.mt25{
  margin-top: 25px;
}
.hello{
  width: 80%;
  text-align: center;
  margin: 120px auto;
  color: #fff;
  font-size: 24px;
  h1{
    font-size: 40px;
    margin:20px auto;
  }
}
.mt45{
  margin-top: 45px;
}
</style>
