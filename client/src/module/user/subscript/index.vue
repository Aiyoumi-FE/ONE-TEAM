<template>
    <div class="page_mysub">
        <div class="section_sublist">
            <h3>我的关注</h3>
            <span class="btn btn_edit" @click="isEditing = !isEditing">{{editStatusTxt}}</span>
            <ul class="list_sub">
                <li v-for="item in subscripList">
                    <span class="unit_photo"></span>
                    <span>{{item.subUserName}}</span>
                    <span>{{item.subUserTeam}}</span>
                    <span class="btn_del" v-show="isEditing" @click="deleteSub(item)">X</span>
                </li>
                <li>
                    <span class="btn_add" @click="dialogVisible = true"></span>
                </li>
            </ul>
        </div>
        <el-dialog width="300px" title="添加关注" :visible.sync="dialogVisible">
            <input type="text" class="search_content" v-model="searchContent" placeholder="请输入用户姓名">
            <span class="search_btn" @click="getUsers">Search</span>
            <ul class="maxh500">
                <li v-for="item in userList">
                    <input type="radio" name="user" :value="item" v-model="subUser">
                    <label for="user">{{item.nickName}}--{{item.teamId.teamName}}</label>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <span class="search_btn" @click="addSubSubmit">确 定</span>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    deleteRecord,
    addRecord,
    getRecordList,
    getUserByName
} from '@/store/subscript'
import {
    Dialog,
    Input,
    Button,
    Table,
    TableColumn
} from 'element-ui'
export default {
    name: 'subscrip',
    data() {
        return {
            isEditing: false,
            showType: 'list',
            subscripList: [],
            dialogVisible: false,
            userList: [],
            subUser: '',
            searchContent: ''
        }
    },
    computed: {
        editStatusTxt() {
            return this.isEditing ? '完成' : '编辑'
        }
    },
    components: {
        'el-dialog': Dialog,
        'el-input': Input,
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn
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
                subUserId: item.subUserId
            }).then((res) => {
                if (res.success) {
                    this.initData()
                } else {
                    alert(res.resultDes || '系统异常，稍后再试')
                }
            })
        },
        getUsers() {
            if (!this.searchContent) {
                alert('请输入用户姓名')
                return
            }

            getUserByName({
                userName: this.searchContent
            }).then((res) => {
                if (res.success && res.result.length) {
                    this.userList = res.result
                } else {
                    alert('找不到匹配用户')
                }
            })
        },
        addSubSubmit() {
            if (!this.subUser._id) {
                alert('关注用户不可为空')
                return
            }

            addRecord({
                subUserId: this.subUser._id,
                subUserTeamName: this.subUser.teamId.teamName,
                subUserName: this.subUser.nickName
            }).then((res) => {
                if (res.success) {
                    this.dialogVisible = false
                    this.initData()
                } else {
                    alert(res.resultDes || '系统异常，稍后再试')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.page_mysub {
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
            li {
                position: relative;
                width: 120px;
                // height: 110px;
                line-height: 30px;
                background: #fff;
                border-radius: 15px;
                text-align: center;
                padding-top: 15px;
                padding-bottom: 15px;
                margin: 5px;
                border: 2px solid #000;
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
                    background: url('../image/leader.png') 0 center no-repeat;
                    background-size: cover;
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
                    background: #000;
                    color: #fff;
                    border-radius: 50%;
                }
                .btn_add {
                    width: 70px;
                    height: 70px;
                    margin: 20px auto;
                    background: url('../image/add2.png') 0 center no-repeat;
                    background-size: cover;
                    opacity: 0.15;
                }
            }
        }

        .maxh500 {
            max-height: 500px;
        }

    }
}
.el-dialog {
    border-radius: 20px !important;
    .search_content {
        display: inline;
        width: 190px;
        height: 26px;
        border-radius: 7px;
        border-style: none;
        border: 1px solid #ccc;
        text-indent: 10px;
    }
    .search_btn {
        display: inline-block;
        width: 61px;
        height: 26px;
        background: #409eff;
        color: #fff;
        line-height: 26px;
        text-align: center;
        border-radius: 7px;
    }
}

.dialog-footer {
    span {

    }
}

</style>
