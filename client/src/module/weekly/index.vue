<template>
  <div class="page">
    <r-header :online="online"></r-header>
    <div class="page-bd">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import rHeader from '../header/index'
import weekList from './list'
export default {
  name: 'weekly',
  data() {
    return {
      online: true
    }
  },
  components: {
    rHeader,
    weekList
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style scoped>
.page-bd{
  position: relative;
  margin: 100px auto;
  width: 80%;
  min-height: 800px;
  padding: 50px 0;
  background-color: #fff;
  box-shadow: 0 0 15px 0 #999; 
}
</style>
