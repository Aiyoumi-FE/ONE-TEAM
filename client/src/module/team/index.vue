<template>
    <div class="content">
        <div class="team">
            <h1>{{obj.teamName}}</h1>
            <p class="invate">邀请码：{{obj._id}}</p>
            <ul class="cells">
                <li v-for="item in obj.memberList" class="cell">
                    <div class="cell-hd">
                        <img class="cell-hd-pic" :src="item.phote | photoFilter" alt="">
                    </div>
                    <div class="cell-bd">
                        <p class="cell-hd-name">{{item.nickName}}</p>
                        <p>{{item.eMail}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {
    getTeamInfo
} from '@/store/team'
// import base64 from '@/assets/js/base64'
export default {
    name: 'home',
    data() {
        return {
            obj: {}
        }
    },
    filters: {
        photoFilter(val) {
            return val || require('../user/image/cat.png')
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            getTeamInfo((res) => {
                if (res.success) {
                    this.obj = res.result
                } else {
                    alert(res.resultDes)
                }
            })
        }
    }
}
</script>

<style scoped>
.content {
    padding: 0 10%;
}
.invate{
    margin-top: 10px;
    padding: 5px 15px;
    border-radius: 20px;
    background-color: #eee;
    display: inline-block; 
}
.team {
    position: relative;
    margin: 100px auto;
    min-height: 800px;
    padding: 50px 15%;
    background-color: #fff;
    box-shadow: 0 0 15px 0 #999;
}
.cell-hd {
    width: 50px;
    text-align: center;
}

.cell-hd-pic {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    line-height: 50px;
}
.cells{
    margin-top: 30px; 
}
.cell{
    min-height: 60px;
}
.cell-bd{
    margin-left: 15px; 
    flex-grow: 1;
}
</style>
