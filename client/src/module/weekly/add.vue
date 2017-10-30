<template>
    <div class="content">
        <div class="bd-date">
            <div>
                {{obj.year}}年 第{{obj.weeknum}}周
                <br>
                <span class="bd-date__sub">本周周报</span>
            </div>
        </div>
        <router-link class="bd-back" :to="{name: 'weeklyList'}">
            <<返回列表</router-link>
                <div class="bd-content" v-if="isEmpty">
                    <textarea class="rain-textarea rain-form" v-model="obj.content"></textarea>
                    <div @click="saveWeekly()" class="rain-btn__primary add-btn">保存</div>
                </div>
                <div class="bd-content" v-else>
                    {{obj.content}}
                </div>
    </div>
</template>
<script>
import rHeader from '../header/index'
import {
    getWeekDetail,
    saveWeekDetail
} from '@/store/weekly'
export default {
    name: 'weekly',
    data() {
        return {
            online: true,
            obj: {
                id: this.$route.query.id || '',
                year: '',
                weeknum: '',
                weekdata: '',
                content: ''
            },
            isEmpty: true
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
            getWeekDetail(this.obj, (result) => {
                let res = JSON.parse(result)
                if (res.success) {
                    this.obj = res.result
                } else {
                    alert(res.resultDes)
                }
            })
        },
        saveWeekly() {
            saveWeekDetail(this.obj, (result) => {
                let res = JSON.parse(result)
                if (res.success) {
                    this.isEmpty = false
                } else {
                    alert(res.resultDes)
                }
            })
        }
    }
}

</script>
<style scoped>
.page-bd {
    position: relative;
    margin: 100px auto;
    width: 80%;
    height: 800px;
    padding-top: 50px;
    background-color: #fff;
    box-shadow: 0 0 15px 0 #999;
}

.bd-date {
    text-align: center;
    font-size: 30px;
    color: #333;
}

.bd-back {
    width: 80px;
    position: absolute;
    left: 80px;
    top: 50px;
    color: #c18795;
}

.add-btn {
    display: block;
    margin: 45px auto 0;
}

.bd-date__sub {
    font-size: 18px;
}

.bd-content {
    margin: 50px auto;
    width: 65%;
}

</style>
