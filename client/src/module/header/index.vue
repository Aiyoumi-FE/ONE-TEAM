<template>
  <div class="content">
    <r-nav v-if="online"></r-nav>
  </div>
</template>
<script>
import rNav from './nav'
export default {
  name: 'header',
  props: {
    online: Boolean
  },
  data() {
    return {}
  },
  components: {
    rNav
  }
}
</script>

<style lang="scss" scoped>
// @import '../../var.scss';
.content{
  width: 100%;
  height: 80px;
  background-color: #c18795;
}
</style>
