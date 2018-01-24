<template>
    <div>
        设置周报模版
        <markdown-editor v-model="weeklyTemplate[0].content" ref="markdownEditor" :configs="configs"></markdown-editor>	
        <div v-for="item in weeklyTemplate">
        	<div v-if="item.content">
        		<markdown-editor v-model="item.content" ref="markdownEditor" :configs="configs"></markdown-editor>
        	</div>
        </div>
        <span class="link" @click="add">添加个性化模板</span>
    </div>
</template>
<script>
import {
    getWeeklyConfig
} from '@/store/weekly'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
export default {
    name: 'weekly',
    data() {
        return {
            configs: {
                status: false, // 禁用底部状态栏
                spellChecker: false // 禁用拼写检查
            },
            weeklyTemplate: [],
            isEmpty: true
        }
    },
    components: {
        markdownEditor
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            getWeeklyConfig((res) => {
                if (res.success) {
                    this.weeklyTemplate = res.result.template
                } else {
                    alert(res.resultDes)
                }
            })
        },
        add() {
        	let obj = {
        		content: '',
        		list: []
        	}
        	this.weeklyTemplate.push(obj)
        },
        save() {
            let result = Object.assign({}, {
            	weeklyTemplate: this.weeklyTemplate
            })
            saveWeekDetail(result, (res) => {
                if (res.success) {
                    this.isEmpty = false
                } else {
                    alert(res.resultDes)
                }
            })
        },
        back() {
            this.$router.go(-1)
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
    font-size: 30px;
    color: #333;
}

.bd-back {
    width: 80px;
    position: absolute;
    left: 80px;
    top: 50px;
    color: #c18795;
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
