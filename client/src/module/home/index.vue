<template>
  <div class="page">
    <r-header></r-header>
    <home-login></home-login>
  </div>
</template>

<script>
import rHeader from '../header/index'
import homeLogin from './login'
export default {
  name: 'hello',
  data() {
    return {}
  },
  components: {
    rHeader,
    homeLogin
  }
}
</script>
<style scoped>
</style>
