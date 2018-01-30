<template>
    <div>
        <div class="bd-date">
            {{dateForm.year}}年 第{{dateForm.weekNum}}周
            <p class="bd-date__sub">本周周报</p>
        </div>
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
                content: ''
            },
            isEdit: true
        }
    },
    components: {
        VueMarkdown,
        markdownEditor
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
            }).then((res) => {
                if (res.success) {
                    this.obj = res.result
                    // this.initEdit()
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
            saveWeekDetail(this.obj).then((res) => {
                if (res.success) {
                    this.isEdit = false
                } else {
                    alert(res.resultDes)
                }
            })
        },
        back() {
            this.$router.go(-1)
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

.bd-date {
    text-align: center;
    font-size: 26px;
    color: #333;
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
