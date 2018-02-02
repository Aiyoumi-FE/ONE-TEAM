<template>
    <div v-if="!loading">
        <date-el v-on:dateBack="changeList"></date-el>
        <div class="bd-config">
            <span class="link" @click="goWeeklyConfig()" v-if="isAdmin">设置</span>
            <span class="btn" @click="creatWeekly('weekly')">写周报</span>
            <span class="btn" @click="creatWeekly('summary')" v-if="isAdmin">小组总结</span>
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
import dateFormate from './common/index'
import dateEl from './common/date'
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
        dateEl,
        VueMarkdown
    },
    filters: {
        photoFilter(val) {
            return val || require('../user/image/cat.png')
        }
    },
    watch: {
        '$route'(to, from) {
            this.initData()
        }
    },
    computed: {
        beginDate() {
            return this.$route.query.beginDate ? new Date(parseInt(this.$route.query.beginDate)) : dateFormate.getDayOfWeek(new Date(), 1)
        },
        tarUserId() {
            return this.$route.query.id || ''
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            this.setDate()
            getWeekList({
                tarUserId: this.tarUserId,
                beginDate: this.beginDate
            }).then((res) => {
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
        creatWeekly(type) {
            this.$router.push({
                name: 'weeklyDetail',
                query: {
                    beginDate: Date.parse(this.beginDate),
                    type: type
                }
            })
        },
        changeList(val) {
            this.$router.push({
                name: 'weeklyList',
                query: {
                    beginDate: val,
                    id: this.tarUserId
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

.bd-date_next {
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
