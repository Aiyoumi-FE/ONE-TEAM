<template>
    <div>
        <date-el v-on:dateBack="changeDetail">
            <p class="bd-date__sub" slot="header">{{des}}</p>
        </date-el>
        <a href="javascript:;" class="bd-back link" @click="back()">返回列表</a>
        <div class="bd-content" v-if="isEdit">
            <markdown-editor v-model="obj.content" ref="markdownEditor" :configs="configs"></markdown-editor>
            <div @click="saveWeekly()" class="btn">保存</div>
        </div>
        <div class="bd-content" v-else>
            <vue-markdown :source="obj.content" v-highlight></vue-markdown>
            <div @click="edit()" class="btn">编辑</div>
        </div>
    </div>
</template>
<script>
import dateFormate from './common/index'
import dateEl from './common/date'
import {
    getWeekDetail,
    saveWeekDetail
} from '@/store/weekly'
import VueMarkdown from 'vue-markdown'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
export default {
    name: 'weekly',
    data() {
        return {
            dateForm: {
                year: '',
                weekNum: '',
                begin: '',
                end: ''
            },
            configs: {
                status: false, // 禁用底部状态栏
                spellChecker: false // 禁用拼写检查
            },
            obj: {
                content: '',
                type: this.$route.query.type
            },
            isEdit: true,
            type: this.$route.query.type
        }
    },
    components: {
        dateEl,
        VueMarkdown,
        markdownEditor
    },
    computed: {
        beginDate() {
            return this.$route.query.beginDate ? new Date(parseInt(this.$route.query.beginDate)) : dateFormate.getDayOfWeek(new Date(), 1)
        },
        des() {
            return this.type === 'summary' ? '本周小组总结' : '本周周报'
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
            getWeekDetail({
                beginDate: this.beginDate,
                type: this.type
            }).then((res) => {
                if (res.success) {
                    this.obj = res.result
                    // this.initEdit()
                } else {
                    alert(res.resultDes)
                }
            })
        },
        saveWeekly() {
            Object.assign(this.obj, {
                beginDate: this.beginDate,
                type: this.type
            })
            saveWeekDetail(this.obj).then((res) => {
                if (res.success) {
                    this.isEdit = false
                } else {
                    alert(res.resultDes)
                }
            })
        },
        changeDetail(val) {
            this.$router.push({
                name: 'weeklyDetail',
                query: {
                    beginDate: val,
                    type: this.type
                }
            })
        },
        back() {
            this.$router.push({
                name: 'weeklyList',
                query: {
                    beginDate: Date.parse(this.beginDate)
                }
            })
        },
        edit() {
            this.isEdit = true
        }
    }
}

</script>
<style lang="scss" scoped>
@import '~simplemde/dist/simplemde.min.css';
.page-bd {
    position: relative;
    margin: 100px auto;
    width: 80%;
    height: 800px;
    padding-top: 50px;
    background-color: #fff;
    box-shadow: 0 0 15px 0 #999;
}

.bd-back {
    width: 80px;
    position: absolute;
    left: 3%;
    top: 3%;
}

.btn_save {
    display: block;
    margin: 45px auto 0;
}

.bd-date__sub {
    // margin-top: 25px;
    font-size: 18px;
}

.btn {
    margin: 10px auto 0;
}

</style>
