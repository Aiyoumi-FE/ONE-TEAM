<template>
    <div>
        <div class="bd-date">
            <p class="bd-date_week">
                <img class="bd-date_back" src="./img/back.png" alt="" @click="changeList(-7)">
                {{dateInfo.year}}年  第{{dateInfo.weekNum}}周
                <img class="bd-date_next" v-if="notEnd" src="./img/back.png" alt="" @click="changeList(7)">
            </p>
            <p class="bd-date_detail">{{dateInfo.begin}} - {{dateInfo.end}}</p>
        </div>
        <div class="bd-content">
            <ul class="ot-cells">
                <li v-for="item in memberReportLsit" class="ot-cell">
                    <div class="cell-hd">
                        <img class="cell-hd-pic" :src="item.phote | photoFilter" alt="">
                        <p class="cell-hd-name">{{item.userId.nickName}}</p>
                    </div>
                    <vue-markdown v-highlight :source="item.content" class="cell-bd markdown"></vue-markdown>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {
    // getWeekList,
    getWeekDetail
} from '@/store/weekly'
// import {
//     getTeamInfo
// } from '@/store/team'
import dateFormate from '../../../weekly/common/index'
import VueMarkdown from 'vue-markdown'

export default {
    name: 'reportDetail',
    props: {
        userId: {
            type: String
        }
    },
    data() {
        return {
            dateInfo: {
                year: '',
                weekNum: '',
                begin: '',
                end: ''
            },
            beginDate: null,
            memberReportLsit: []
        }
    },
    components: {
        VueMarkdown
    },
    filters: {
        photoFilter(val) {
            return val
        }
    },
    computed: {
        notEnd() {
            return this.beginDate < dateFormate.getDayOfWeek(new Date(), 1)
        }
    },
    watch: {

    },
    mounted() {
        this.beginDate = this.$route.query.beginDate ? new Date(parseInt(this.$route.query.beginDate)) : dateFormate.getDayOfWeek(new Date(), 1)
        this.setDate()
        this.loadData()
    },
    methods: {
        loadData() {
            getWeekDetail({
                beginDate: this.getWeekDetail,
                userId: this.userId
            }).then((res) => {
                if (res.success) {
                    this.memberReportLsit = res.result.list
                } else {
                    this.isEmpty = true
                }
            })
        },
        setDate() {
            this.dateInfo.year = dateFormate.getYear(this.beginDate)
            this.dateInfo.weekNum = dateFormate.getYearWeek(this.beginDate)

            let begin = this.beginDate
            let end = dateFormate.getDayOfWeek(this.beginDate, 5)

            this.dateInfo.begin = `${begin.getMonth() + 1}/${begin.getDate()}`
            this.dateInfo.end = `${end.getMonth() + 1}/${end.getDate()}`
        },
        changeList(action) {
            this.beginDate = new Date(Date.parse(this.beginDate) + 24 * 60 * 60 * 1000 * action)
            this.loadData()
            this.setDate()
        }
    }
}

</script>
<style lang="scss" scoped>
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

.bd-date_detail {
    margin: 0;
    font-size: 16px;
    color: #999;
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
.ot-cells:before {
    content: '';
    display: none;
}
.ot-cell{
    padding: 10px 10px 20px;
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
