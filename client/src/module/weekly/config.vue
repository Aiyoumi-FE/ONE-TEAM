<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <a href="javascript:;" class="config-link" @click="back()">返回列表</a>
            <el-tab-pane label="周报模板" name="weekly">
                <h2 class="config-title">设置周报模版</h2>
                <el-button @click="btnActive(1)" class="config-btn">{{isEdit1 ? '保存' : '编辑'}}</el-button>
                <markdown-editor v-if="isEdit1" v-model="resultTemplate.weeklyTemplate.template" ref="markdownEditor" :configs="configs"></markdown-editor>
                <vue-markdown v-else :source="resultTemplate.weeklyTemplate.template" v-highlight></vue-markdown>
            </el-tab-pane>
            <el-tab-pane label="总结模板" name="summary">
                <h2 class="config-title">设置总结模版</h2>
                <el-button @click="btnActive(2)" class="config-btn">{{isEdit2 ? '保存' : '编辑'}}</el-button>
                <markdown-editor v-if="isEdit2" v-model="resultTemplate.summaryTemplate.template" ref="markdownEditor" :configs="configs"></markdown-editor>
                <vue-markdown v-else :source="resultTemplate.summaryTemplate.template" v-highlight></vue-markdown>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {
    getWeeklyConfig,
    saveWeeklyTemplate,
    saveSummaryTemplate
} from '@/store/weekly'
import {
    Tabs,
    TabPane
} from 'element-ui'
import VueMarkdown from 'vue-markdown'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
export default {
    name: 'weekly',
    data() {
        return {
            activeName: this.$route.query.type,
            configs: {
                status: false, // 禁用底部状态栏
                spellChecker: false // 禁用拼写检查
            },
            resultTemplate: {
                weeklyTemplate: {
                    template: ''
                },
                summaryTemplate: {
                    template: ''
                }
            },
            isEdit1: true,
            isEdit2: true
        }
    },
    components: {
        markdownEditor,
        VueMarkdown,
        'el-tabs': Tabs,
        'el-tab-pane': TabPane
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            getWeeklyConfig().then((res) => {
                if (res.success) {
                    this.resultTemplate = res.result
                } else {
                    alert(res.resultDes)
                }
            })
        },
        saveWeekly() {
            // this.weeklyTemplate.template = this.template
            let res = Object.assign(this.resultTemplate.weeklyTemplate, {
                type: this.activeName
            })
            saveWeeklyTemplate(res).then((res) => {
                if (res.success) {
                    this.isEdit1 = false
                } else {
                    alert(res.resultDes)
                }
            })
        },
        saveSummary() {
            // this.summaryTemplate.template = this.template
            let res = Object.assign(this.resultTemplate.summaryTemplate, {
                type: this.activeName
            })
            saveSummaryTemplate(res).then((res) => {
                if (res.success) {
                    this.isEdit2 = false
                } else {
                    alert(res.resultDes)
                }
            })
        },
        btnActive(num) {
            if (!this['isEdit' + num]) {
                this['isEdit' + num] = true
                return
            }
            if (this.activeName === 'weekly') {
                this.saveWeekly()
            } else {
                this.saveSummary()
            }
        },
        back() {
            this.$router.go(-1)
        },
        handleClick(tab, val) {
        }
    }
}

</script>
<style lang="scss" scoped>
@import '~simplemde/dist/simplemde.min.css';
.config-link {
    position: absolute;
    top: 10px;
}
.config-title {
    text-align: center;
}

.config-btn {
    position: absolute;
    right: 10px;
    top: 0px;
}
</style>
