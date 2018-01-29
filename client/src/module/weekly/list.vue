<template>
    <div v-if="!loading">
        <div class="bd-date">
            <img src="./img/back.png" alt="" @click="changeList(-7)">
            <span>{{obj.year}}年  第{{obj.weekNum}}周</span>
            <img class="bd-date_next" v-if="notEnd" src="./img/back.png" alt="" @click="changeList(7)">
            <p class="bd-date_detail">{{obj.begin}} - {{obj.end}}</p>
        </div>
        <div class="bd-config">
            <span class="link" @click="goWeeklyConfig()">设置</span>
            <span class="btn" @click="creatWeekly()">写周报</span>
        </div>
        <div class="bd-content">
            <ul class="cells">
                <li v-for="item in list" class="cell">
                    <div class="cell-hd">
                        <img class="cell-hd-pic" :src="item.phote | photoFilter" alt="">
                        <p class="cell-hd-name">{{item.userId.nickName}}</p>
                    </div>
                    <vue-markdown v-highlight :source="item.content" class="cell-bd markdown"></vue-markdown>
                    <div class="btn__primary" v-if="item.isUser" @click="creatWeekly(item._id)">编辑</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import rHeader from '../header/index'
import dateFormate from './common/index'
import VueMarkdown from 'vue-markdown'

export default {
    name: 'weeklyList',
    data() {
        return {
            list: [],
            obj: {
                year: '',
                weekNum: '',
                begin: '',
                end: ''
            },
            loading: true
        }
    },
    components: {
        rHeader,
        VueMarkdown
    },
    filters: {
        photoFilter(val) {
            return val || require('../user/image/cat.png')
        }
    },
    computed: {
        beginDate() {
            return this.$route.query.beginDate ? new Date(parseInt(this.$route.query.beginDate)) : dateFormate.getDayOfWeek(new Date(), 1)
        },
        notEnd() {
            return this.beginDate < dateFormate.getDayOfWeek(new Date(), 1)
        }
    },
    watch: {
        '$route'(to, from) {
            this.initData()
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            this.setDate()
            this.$http.post('/api/week/getWeekList', { beginDate: this.beginDate })
            .then((response) => {
                const res = response.data

                if (res.success) {
                    this.list = res.result.list
                } else {
                    this.$router.replace({
                        name: 'refuse'
                    })
                }
                this.loading = false
            })
        },
        setDate() {
            this.obj.year = dateFormate.getYear(this.beginDate)
            this.obj.weekNum = dateFormate.getYearWeek(this.beginDate)

            let begin = this.beginDate
            let end = dateFormate.getDayOfWeek(this.beginDate, 5)

            this.obj.begin = `${begin.getMonth() + 1}/${begin.getDate()}`
            this.obj.end = `${end.getMonth() + 1}/${end.getDate()}`
        },
        creatWeekly(id) {
            this.$router.push({
                name: 'weeklyDetail',
                query: {
                    beginDate: Date.parse(this.beginDate)
                }
            })
        },
        changeList(action) {
            this.$router.push({
                name: 'weeklyList',
                query: {
                    beginDate: Date.parse(this.beginDate) + 24 * 60 * 60 * 1000 * action
                }
            })
        },
        goWeeklyConfig() {
            this.$router.push({
                name: 'weeklyConfig'
            })
        }
    }
}

</script>
<style lang="scss" scoped>
@import '../../var.scss';
.bd-date {
    text-align: center;
    font-size: 24px;
    color: #333;
    span {
        padding: 0 20px;
    }
    img {
        width: 24px;
    }
}

.bd-date_next {
    transform: rotate(180deg);
}

.bd-date_detail {
    margin: 0;
    font-size: 16px;
    color: #999;
}

.cell {
    padding: 10px 10px 20px;
}

.bd-config {
    position: absolute;
    right: 130px;
    top: 50px;
}

.link {
    padding-right: 10px;
}

.bd-content {
    margin: 50px auto;
}

.cell-hd {
    width: 50px;
    text-align: center;
    margin-top: 10px;
}

.cell-hd-pic {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    line-height: 50px;
}

.cell-hd-name {
    margin-top: 10px;
    color: #999;
}

.cell-bd {
    flex-grow: 1;
}

</style>
