<template>
  <div class="content">
  <ul class="rain-ul__primary">
    <li v-for="item in navList" class="rain-li__primary">
        <router-link :to="{name: item.link}">{{item.name}}</router-link>
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return {
      navList: [{
        name: 'About',
        link: 'About'
      }, {
        name: 'Team',
        link: 'team'
      }, {
        name: 'Weekly',
        link: 'weeklyList'
      }, {
        name: 'Home',
        link: 'home'
      }]
    }
  }
}
</script>

<style scoped>

</style>
