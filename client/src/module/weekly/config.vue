<template>
    <div>
        <a href="javascript:;" class="bd-back link" @click="back()">返回列表</a>
        <h2>设置周报模版</h2>
        <div v-if="isEdit1">
            <markdown-editor v-model="weeklyTemplate.template" ref="markdownEditor" :configs="configs"></markdown-editor>
            <div class="btn" @click="saveWeekly()">保存</div>
        </div>
        <div class="bd-content" v-else>
            <hr>
            <vue-markdown :source="weeklyTemplate.template" v-highlight></vue-markdown>
            <div @click="edit(1)" class="btn">编辑</div>
        </div>
        <h2>设置总结模版</h2>
        <div v-if="isEdit2">
            <markdown-editor v-model="summaryTemplate.template" ref="markdownEditor" :configs="configs"></markdown-editor>
            <div class="btn" @click="saveSummary()">保存</div>
        </div>
        <div class="bd-content" v-else>
            <hr>
            <vue-markdown :source="summaryTemplate.template" v-highlight></vue-markdown>
            <div @click="edit(2)" class="btn">编辑</div>
        </div>
    </div>
</template>
<script>
import {
    getWeeklyConfig,
    saveWeeklyTemplate,
    saveSummaryTemplate
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
            weeklyTemplate: {
                template: ''
            },
            summaryTemplate: {
                template: ''
            },
            isEdit1: true,
            isEdit2: true
        }
    },
    components: {
        markdownEditor,
        VueMarkdown
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            getWeeklyConfig().then((res) => {
                if (res.success) {
                    this.weeklyTemplate = res.result.weeklyTemplate
                    this.summaryTemplate = res.result.summaryTemplate
                } else {
                    alert(res.resultDes)
                }
            })
        },
        saveWeekly() {
            saveWeeklyTemplate(this.weeklyTemplate).then((res) => {
                if (res.success) {
                    this.isEdit1 = false
                } else {
                    alert(res.resultDes)
                }
            })
        },
        saveSummary() {
            saveSummaryTemplate(this.summaryTemplate).then((res) => {
                if (res.success) {
                    this.isEdit2 = false
                } else {
                    alert(res.resultDes)
                }
            })
        },
        edit(num) {
            this['isEdit' + num] = true
        },
        back() {
            this.$router.go(-1)
        }
    }
}

</script>
<style lang="scss" scoped>
@import '~simplemde/dist/simplemde.min.css';
.btn {
    margin-top: 20px;
}
.bd-back {
    width: 80px;
    position: absolute;
    left: 3%;
    top: 3%;
}
</style>
