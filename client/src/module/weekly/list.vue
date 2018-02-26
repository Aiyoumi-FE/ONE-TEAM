<template>
    <div v-if="!loading">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人周报" name="weekly"></el-tab-pane>
            <el-tab-pane label="小组总结" name="summary"></el-tab-pane>
        </el-tabs>
        <date-el v-on:dateBack="changeList"></date-el>
        <div class="list-write">
            <a href="javsscript:;" @click="goWeeklyConfig" v-if="isAdmin">设置</a>
            <el-button @click="creatWeekly">{{activeName == 'summary' ? '写总结' : '写周报'}}</el-button>
        </div>
        
        <el-row :gutter="20" v-for="item in list" :key="item._id" class="list">
            <el-col :span="4" class="list-hd">
                <img class="list-hd-pic" :src="item.phote | photoFilter" alt="">
                <p>{{item.userId.nickName}}</p>
            </el-col>
            <el-col :span="16" class="list-content">
                <vue-markdown v-highlight :source="item.content" class="list-bd"></vue-markdown>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {
    Tabs,
    TabPane
} from 'element-ui'
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
            activeName: 'weekly',
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
        VueMarkdown,
        'el-tabs': Tabs,
        'el-tab-pane': TabPane
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
            getWeekList({
                tarUserId: this.tarUserId,
                beginDate: this.beginDate,
                type: this.activeName
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
        creatWeekly() {
            this.$router.push({
                name: 'weeklyDetail',
                query: {
                    beginDate: Date.parse(this.beginDate),
                    type: this.activeName
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
                name: 'weeklyConfig',
                query: {
                    type: this.activeName
                }
            })
        },
        handleClick(tab, event) {
            this.initData()
            console.log(tab, event)
        }
    }
}

</script>
<style lang="scss" scoped>
@import '../../assets/style/base.scss';
.list-hd {
    text-align: center;
    padding-top: 15px;
}
.list-hd-pic {
    width: 50px;
}

.list-bd {
    ol li {
        list-style-position: inside;
    }
    img {
        max-width: 80%;
        height: auto;
    }
}

.list {
    padding: 10px 0;
}

.list-content::after {
    content: " ";
    position: absolute;
    box-sizing: content-box;
    width: 95%;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    margin: 0 auto;
    background-color: $colorLine;
}

.list-write {
    position: absolute;
    right: 10px;
    top: 80px;
}
</style>
