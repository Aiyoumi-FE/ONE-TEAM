<template>
    <div>
        <div class="bd-date" v-if="showType == 'memberList'">
            <p class="bd-date_week" >
                {{teamName}}成员列表
            </p>
        </div>
        <div class="bd-date" v-else>
            <p class="bd-date_week">
                <img class="bd-date_back" src="./img/back.png" alt="" @click="changeList(-7)">
                {{dateInfo.year}}年  第{{dateInfo.weekNum}}周 {{titleTxt}}
                <img class="bd-date_next" v-if="notEnd" src="./img/back.png" alt="" @click="changeList(7)">
            </p>
            <p class="bd-date_detail">{{dateInfo.begin}} - {{dateInfo.end}}</p>
        </div>
        <div class="bd-config">
            <span class="icon_list" @click="showTypeList = !showTypeList"></span>
            <ul v-show="showTypeList">
                <li @click="setType('teamReport')">部门总结</li>
                <li @click="setType('memberList')">部门成员</li>
                <li @click="setType('memberReport')">成员周报</li>
            </ul>
        </div>
        <div class="bd-content">
            <section v-if="showType == 'teamReport'">
                {{teamReportContent}}
            </section>
            <section v-if="showType == 'memberReport'">
                <ul class="ot-cells">
                    <li v-for="item in memberReportLsit" class="ot-cell">
                        <div class="cell-hd">
                            <img class="cell-hd-pic" :src="item.phote | photoFilter" alt="">
                            <p class="cell-hd-name">{{item.userId.nickName}}</p>
                        </div>
                        <vue-markdown v-highlight :source="item.content" class="cell-bd markdown"></vue-markdown>
                    </li>
                </ul>
            </section>
            <section v-if="showType == 'memberList'">
                <ul class="ot-cells">
                    <li v-for="item in teamMemberList" class="ot-cell">
                        <div class="cell-hd">
                            <img class="cell-hd-pic" :src="item.phote | photoFilter" alt="">
                            <p class="cell-hd-name">{{item.nickName}}<span class="admin" v-if="item._id == dateInfo.administrator">管理员</span></p>
                            <p>{{item.eMail}}</p>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
import {
    getWeekList,
    getWeekDetail
} from '@/store/weekly'
import {
    getTeamInfo
} from '@/store/team'
import rHeader from '../header/index'
import dateFormate from './common/index'
import VueMarkdown from 'vue-markdown'

export default {
    name: 'weeklyList',
    data() {
        return {
            teamName: this.$route.query.name,
            teamId: this.$route.query.team,
            dateInfo: {
                year: '',
                weekNum: '',
                begin: '',
                end: ''
            },
            beginDate: null,
            showTypeList: false,
            showType: 'teamReport',
            teamMemberList: [],
            memberReportLsit: [],
            teamReportContent: ''
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
        titleTxt() {
            return {
                teamReport: this.teamName + '工作总结',
                memberReport: this.teamName + '成员周报',
                memberList: this.teamName + '成员列表'
            }[this.showType]
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
        this.beginDate = this.$route.query.beginDate ? new Date(parseInt(this.$route.query.beginDate)) : dateFormate.getDayOfWeek(new Date(), 1)
        this.setDate()
        this.loadData()
    },
    methods: {
        loadData(type = this.showType, beginDate = this.beginDate) {
            if (type === 'teamReport') {
                getWeekDetail({
                    beginDate,
                    teamId: this.teamId,
                    type: 'summary'
                }).then((res) => {
                    if (res.success && res.result) {
                        this.teamReportContent = res.result.content
                    }
                })
            } else if (type === 'memberReport') {
                getWeekList({
                    beginDate,
                    teamId: this.teamId
                }).then((res) => {
                    if (res.success) {
                        this.memberReportLsit = res.result.list
                    } else {
                        this.isEmpty = true
                    }
                })
            } else {
                getTeamInfo({
                    teamId: this.teamId
                }).then((res) => {
                    if (res.success) {
                        this.teamMemberList = res.result.memberList
                    } else {
                        this.isEmpty = true
                    }
                })
            }
        },
        setDate() {
            this.dateInfo.year = dateFormate.getYear(this.beginDate)
            this.dateInfo.weekNum = dateFormate.getYearWeek(this.beginDate)

            let begin = this.beginDate
            let end = dateFormate.getDayOfWeek(this.beginDate, 5)

            this.dateInfo.begin = `${begin.getMonth() + 1}/${begin.getDate()}`
            this.dateInfo.end = `${end.getMonth() + 1}/${end.getDate()}`
        },
        setType(type) {
            this.showType = type
            this.showTypeList = false
            this.loadData()
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

.ot-cell{
    padding: 10px 10px 20px;
}

.bd-config {
    position: absolute;
    right: 70px;
    top: 50px;
    width: 30px;
    height: 30px;
    .icon_list {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url('./img/list_gray_deep.png') 0 center no-repeat;
        background-size: cover;
    }
    ul {
        position: absolute;
        left: -26px;
        top: 17px;
        width: 70px;
        background: #e9e9e9;
        border-radius: 5px;
        text-align: center;
        padding: 3px 6px 8px;
    }
    li {
        margin-top: 5px;
        border-bottom: 1px solid #ccc;
    }
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

.btn_back {

}
</style>
