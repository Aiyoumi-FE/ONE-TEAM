<template>
    <div v-if="!loading">
        <!-- <div class="bd-date">
            <img src="./img/back.png" alt="" @click="changeList(-7)">
            <span>{{obj.year}}年  第{{obj.weekNum}}周</span>
            <img class="bd-date_next" v-if="notEnd" src="./img/back.png" alt="" @click="changeList(7)">
            <p class="bd-date_detail">{{obj.begin}} - {{obj.end}}</p>
        </div> -->
        <div class="bd-date">
            <p class="bd-date_week">
                <img class="bd-date_back" src="./img/back.png" alt="" @click="changeList(-7)">
                {{obj.year}}年  第{{obj.weekNum}}周
                <img class="bd-date_next" v-if="notEnd" src="./img/back.png" alt="" @click="changeList(7)">
            </p>
            <p class="bd-date_detail">{{obj.begin}} - {{obj.end}}</p>
        </div>
        <div class="bd-config">
            <span class="link" @click="goWeeklyConfig()" v-if="isAdmin">设置</span>
            <span class="btn" @click="creatWeekly()">写周报</span>
        </div>
        <div class="bd-content">
            <ul class="ot-cells">
                <li v-for="item in list" class="ot-cell">
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
import {
    getWeekList
} from '@/store/weekly'
import rHeader from '../header/index'
import dateFormate from './common/index'
import VueMarkdown from 'vue-markdown'

export default {
    name: 'weeklyList',
    data() {
        return {
            list: [],
            isAdmin: false,
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
            getWeekList({ beginDate: this.beginDate })
                .then((res) => {
                    if (res.success) {
                        this.isAdmin = res.result.isAdmin
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
@import '../../assets/style/base.scss';
.bd-date {
    text-align: center;
    font-size: $fontSizeLevel4;
    color: #333;
    span {
        padding: 0 20px;
    }
    img {
        width: 24px;
    }
}
.bd-date_week {
    position: relative;
    display: inline-block;
    margin: 0 auto;
}
.bd-date_back {
    position: absolute;
    left: -34px;
    top: 4px;
}
.bd-date_next {
    position: absolute;
    right: -34px;
    top: 4px;
    transform: rotate(180deg);
}

.bd-date_detail {
    margin: 0;
    font-size: $fontSizeLevel6;
    color: #999;
}

.ot-cell {
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
    padding: 0 30px;
}

@media screen and (max-width: 1024px) {
    .cell-bd {
        padding: 0;
    }
    .ot-cell {
        flex-direction: column;
        .cell-hd {
            display: flex;
            align-items: center;
        }
    }
    .cell-hd-pic {
        width: 25px;
        height: 25px;
        line-height: 25px;
        padding: 0 8px 0 0;
    }
    .bd-content {
        margin: 0;
    }
    .bd-config {
        position: relative;
        right: 0;
        top: 0;
        margin-top: 10px;
        text-align: center;
    }
}

</style>
