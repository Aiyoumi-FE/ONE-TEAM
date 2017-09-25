<template>
  <div class="content">
    <div class="bd-date">
      {{obj.year}}年  第{{obj.weeknum}}周
    </div>
    <div @click="creatWeekly()" class="rain-btn__primary week-btn">写周报</div>
    <div class="bd-content">
        <ul class="rain-cells">
          <li v-for="item in obj.list" class="rain-cell">
            <div class="cell-hd">
              <div class="cell-hd-pic">
                <img src="" alt="">
              </div>
              <p class="cell-hd-name">{{item.username}}</p>
            </div>
            <div class="cell-bd">{{item.content}}</div>
            <div class="rain-btn__primary" v-if="item.isUser" @click="creatWeekly(item._id)">编辑</div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import rHeader from '../header/index'
import {
  getWeekList
} from '@/store/weekly'
export default {
  name: 'weeklyList',
  data() {
    return {
      obj: {
        year: '',
        weeknum: '',
        weekdata: '',
        list: [{
          username: 'Doris',
          content: 'cnjanckjscnkjc'
        }, {
          username: 'sunny',
          content: 'cnjanckkjc'
        }]
      }
    }
  },
  components: {
    rHeader
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      getWeekList(this.obj, (result) => {
        let res = JSON.parse(result)
        if (res.success) {
          this.obj = res.result
        } else {
          alert(res.resultDes)
        }
      })
    },
    creatWeekly(id) {
      this.$router.push({
        name: 'weeklyDetail',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
<style scoped>
.bd-date{
  text-align: center;
  font-size: 24px;
  color: #333;
}
.week-btn{
  position: absolute;
  right: 130px;
  top: 50px;
}
.bd-content{
    margin: 50px auto;
    width: 65%;
}
.cell-hd{
  width: 50px;
  text-align: center;
}
.cell-hd-pic{
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #999;
  line-height: 50px;
}
.cell-hd-name{
  margin-top: 10px; 
  color: #999;
}
.cell-bd{
  margin-left: 30px;
  flex-grow: 1;
}
</style>
