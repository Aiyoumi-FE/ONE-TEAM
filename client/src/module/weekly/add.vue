<template>
    <div>
        <div class="bd-date">
            <div>
                {{dateForm.year}}年 第{{dateForm.weekNum}}周
                <p class="bd-date__sub">本周周报</p>
            </div>
        </div>
        <a href="javascript:;" class="bd-back" @click="back()">返回列表</a>
        <div class="bd-content" v-if="isEmpty">
            <textarea class="textarea" v-model="obj.content"></textarea>
            <div @click="saveWeekly()" class="btn">保存</div>
        </div>
        <div class="bd-content" v-else>
            {{obj.content}}
        </div>
    </div>
</template>
<script>
import rHeader from '../header/index'
import dateFormate from './common/index'
import {
    getWeekDetail,
    saveWeekDetail
} from '@/store/weekly'
export default {
    name: 'weekly',
    data() {
        return {
            online: true,
            dateForm: {
                year: '',
                weekNum: '',
                begin: '',
                end: ''
            },
            obj: {
                content: ''
            },
            isEmpty: true
        }
    },
    components: {
        rHeader
    },
    computed: {
        beginDate() {
            return this.$route.query.beginDate ? new Date(parseInt(this.$route.query.beginDate)) : dateFormate.getDayOfWeek(new Date(), 1)
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            this.setDate()
            getWeekDetail({
                beginDate: this.beginDate
            }, (res) => {
                if (res.success) {
                    this.obj = res.result
                } else {
                    alert(res.resultDes)
                }
            })
        },
        setDate() {
            this.dateForm.year = dateFormate.getYear(this.beginDate)
            this.dateForm.weekNum = dateFormate.getYearWeek(this.beginDate)
            this.dateForm.begin = this.beginDate
            this.dateForm.end = dateFormate.getDayOfWeek(this.beginDate, 5)
        },
        saveWeekly() {
            Object.assign(this.obj, {
                beginDate: this.beginDate
            })
            saveWeekDetail(this.obj, (res) => {
                if (res.success) {
                    this.isEmpty = false
                } else {
                    alert(res.resultDes)
                }
            })
        },
        back() {
            this.$router.go(-1)
        }
    }
}

</script>
<style lang="scss" scoped>
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

.btn_save {
    display: block;
    margin: 45px auto 0;
}

.bd-date__sub {
    margin-top: 25px;
    font-size: 18px;
}

.bd-content {
    margin-top: 50px;
    .btn {
        margin: 10px auto 0;
    }
}

</style>
