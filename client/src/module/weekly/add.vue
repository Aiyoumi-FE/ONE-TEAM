<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人周报" name="weekly"></el-tab-pane>
            <el-tab-pane label="小组总结" name="summary"></el-tab-pane>
        </el-tabs>
        <a href="javascript:;" class="add-link" @click="back()">返回列表</a>
        <date-el v-on:dateBack="changeDetail">
            <p slot="header" class="add-des">{{des}}</p>
        </date-el>
        <el-button class="add-btn" @click="btnActive(activeName)">{{isEdit? '保存' : '编辑'}}</el-button>
        <markdown-editor v-if="isEdit" v-model="obj.content" ref="markdownEditor" :configs="configs"></markdown-editor>
        <vue-markdown v-else :source="obj.content" v-highlight></vue-markdown>
    </div>
</template>
<script>
import {
    Tabs,
    TabPane
} from 'element-ui'
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
            configs: {
                status: false, // 禁用底部状态栏
                spellChecker: false // 禁用拼写检查
            },
            obj: {
                content: '',
                type: this.$route.query.type
            },
            isEdit: true,
            activeName: this.$route.query.type
        }
    },
    components: {
        dateEl,
        VueMarkdown,
        markdownEditor,
        'el-tabs': Tabs,
        'el-tab-pane': TabPane
    },
    computed: {
        beginDate() {
            return this.$route.query.beginDate ? new Date(parseInt(this.$route.query.beginDate)) : dateFormate.getDayOfWeek(new Date(), 1)
        },
        btnText() {
            return this.isEdit ? '编辑' : '保存'
        },
        des() {
            return this.activeName === 'summary' ? '本周小组总结' : '本周周报'
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
                type: this.activeName
            }).then((res) => {
                if (res.success) {
                    this.obj = res.result
                } else {
                    alert(res.resultDes)
                }
            })
        },
        btnActive() {
            if (!this.isEdit) {
                this.isEdit = !this.isEdit
                return
            }
            Object.assign(this.obj, {
                beginDate: this.beginDate,
                type: this.activeName
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
                    type: this.activeName
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
        handleClick(tab, val) {
            this.initData()
        }
    }
}

</script>
<style lang="scss" scoped>
@import '../../assets/style/base.scss';
@import '~simplemde/dist/simplemde.min.css';
.add-link {
    position: absolute;
    left: 10px;
    top: 80px;
}

.add-btn {
    position: absolute;
    right: 10px;
    top: 80px;
}

.add-des {
    font-size: $fontSizeLevel3;
}

</style>
