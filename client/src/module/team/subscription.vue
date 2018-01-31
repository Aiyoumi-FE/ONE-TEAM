<template>
    <div>
        <div class="section_sublist">
            <h3>我的关注</h3>
            <span class="btn btn_edit">编辑</span>
            <ul class="list_sub">
                <li v-for="item in subscripList">
                    <span class="unit_photo"></span>
                    <span>张天爱</span>
                    <span>前端组</span>
                    <span class="btn_del" v-show="isEditing" @click="deleteSub(item)">X</span>
                </li>
                <li>
                    <span class="btn_add" @click="addSubSubmit"></span>
                </li>
            </ul>
        </div>
        <div class="dialog">

        </div>
    </div>
</template>
<script>
import {
    deleteRecord,
    addRecord,
    getRecordList
} from '@/store/subscript'
export default {
    name: 'subscrip',
    data() {
        return {
            isEditing: false,
            showType: 'list',
            subscripList: []
        }
    },
    components: {
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            getRecordList().then((res) => {
                if (res.success) {
                    this.subscripList = res.result
                }
            })
        },
        deleteSub(item) {
            deleteRecord({
                subUserId: ''
            }).then((res) => {

            })
        },
        addSubSubmit() {
            addRecord({
                userId: '',
                subUserId: ''
            }).then((res) => {

            })
        }
    }
}
</script>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}
.section_sublist {
    position: relative;
    .btn_edit {
        position: absolute;
        right: 0;
        top: 0;
        padding: 0 10px;
    }
    .list_sub {
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
        // justify-content: space-between;
        li {
            position: relative;
            width: 120px;
            height: 110px;
            line-height: 30px;
            background: #999;
            border-radius: 15px;
            text-align: center;
            padding-top: 15px;
            padding-bottom: 15px;
            color: #fff;
            margin: 5px;
            span {
                display: block;
                text-align: center;
                width: 100%;
                overflow: hidden;
            }
            .unit_photo {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #FFEBEE;
                margin: 0 auto;
            }
            .btn_del {
                position: absolute;
                right: -8px;
                top: -8px;
                width: 25px;
                height: 25px;
                text-align: center;
                line-height: 25px;
                background: #9c9696;
                color: #fff;
                border-radius: 50%;
            }
            .btn_add {
                width: 100px;
                height: 100px;
                margin: 0 auto;
                background: url('./image/add.png') 0 center no-repeat;
                background-size: cover;
            }
        }
    }
}
.section_setting {
    display: none;
}

</style>
