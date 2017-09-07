<template>
  <div id="app">
    mcdkls
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    this.$router.push({
      name: 'home'
    })
  }
}
</script>

<style lang="scss">
@import './var.scss';
</style>
