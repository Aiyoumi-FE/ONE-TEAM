<template>
    <div class="page_TM">
        <div class="part_left">
            <p class="search_unit">
                <el-input class="txt__search" placeholder="输入关键字进行过滤" v-model="filterText">
                </el-input>
                <span class="btn btn__search" @click="search"></span>
            </p>
            <el-tree highlight-current ref="teamTree" :data="teamList" :props="defaultProps" @node-click="getInfo" :filter-node-method="filterNode"></el-tree>
            <p class="btn_tm" @click="dialogTeamManage.show = true">
                小组管理
            </p>
        </div>
        <div class="part_right">
            <h3>{{currentTeam.name}}</h3>
            <p class="btn_addmem" @click="dialogMemManage.show = true">添加成员</p>
            <el-table ref="multipleTable" :data="teamDetail" tooltip-effect="blue" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="nickName" label="姓名">
                </el-table-column>
                <el-table-column prop="eMail" label="邮箱">
                </el-table-column>
                <el-table-column prop="type" label="成员类别">
                </el-table-column>
            </el-table>
        </div>
        <div class="part_other">
            <div class="dialog__container" v-show="dialogTeamManage.show">
                <div class="dialog__content">
                    <h3>小组管理</h3>
                    <div class="block_btns">
                        <span class="btns">新增</span>
                        <span class="btns">删除</span>
                        <span class="btns">编辑</span>
                    </div>
                    <el-tree highlight-current ref="teamTree" :data="teamList" :props="defaultProps" @node-click="getInfo" :filter-node-method="filterNode"></el-tree>
                </div>
            </div>
            <div class="dialog__container" v-show="dialogMemManage.show">
                <div class="dialog__content">
                    <h3>添加成员</h3>
                    <div class="tab_head">
                        <span class="tab_quick" :class="{'active': invite_quick}" @click="invite_quick = true">快速添加</span>
                        <span class="tab_email" :class="{'active': !invite_quick}" @click="invite_quick = false">邮件邀请</span>
                    </div>
                    <div class="tab_content">
                        <div v-if="invite_quick" class="content_quick">
                            <p class="block_input">
                                <p class="line_input">
                                    <label for="name">姓名：</label>
                                    <input name="name" type="text" v-model="form.name">
                                </p>
                                <p class="line_input">
                                    <label for="email">邮箱：</label>
                                    <input name="email" type="text" v-model="form.eMail">
                                </p>
                                <p class="line_input">
                                    <label for="teamId">所属Team：</label>
                                    <input name="teamId" type="text" v-model="form.team">
                                </p>
                                <p class="tips">*登录账号与默认密码均为邮箱地址</p>
                            </p>
                            <p class="btn_addmem_submit" @click="addMember">
                                添加成员
                            </p>
                        </div>
                        <div v-else class="content_email">
                            <p class="block_input">
                                <p class="line_input">
                                    <label for="email">邮箱：</label>
                                    <input name="email" type="text" v-model="form.eMail">
                                </p>
                            </p>
                            <p class="btn_addmem_submit">
                                发送邀请
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    Tree,
    Table,
    TableColumn,
    Input
} from 'element-ui'
import {
    getTeamList,
    getTeamInfo
} from '@/store/team'
export default {
    name: 'teamManage',
    data() {
        return {
            teamList: [],
            defaultProps: {
                label: 'teamName'
            },
            teamDetail: [],
            filterText: '',
            dialogTeamManage: {
                show: false
            },
            dialogMemManage: {
                show: false
            },
            currentTeam: {
                name: ''
            },
            invite_quick: true,
            // curTeamId: '',
            curAdminId: '',
            form: {
                name: '',
                eMail: '',
                team: ''
            }
        }
    },
    components: {
        'el-tree': Tree,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-input': Input
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            let params = ''
            getTeamList(params, (data) => {
                let temp = this.reformate(data.result)
                // console.log(temp)
                this.teamList = temp
            })
        },
        reformate(dataList) {
            let pidArr = []
            let childArr = []
            dataList.forEach((item) => {
                if (!item.pid) {
                    item.children = []
                    pidArr.push(item)
                } else {
                    childArr.push(item)
                }
            })
            this.getInfo(pidArr[0])
            childArr.forEach((citem) => {
                pidArr.forEach((pitem) => {
                    if (citem.pid === pitem._id) {
                        pitem.children.push(citem)
                    }
                })
            })

            return pidArr
        },
        search() {
            this.$refs.teamTree.filter(this.filterText)
        },
        getInfo(team) {
            let teamId = team._id
            // this.curTeamId = team._id
            this.curAdminId = team.administrator
            getTeamInfo({ teamId }, (data) => {
                if (data.success && data.result) {
                    this.teamDetail = this.formateData(data.result.memberList)
                    this.currentTeam.name = data.result.teamName
                    this.currentTeam.num = data.result.memberList.length
                }
            })
        },
        formateData(data) {
            data.map((item) => {
                item.type = (item._id === this.curAdminId) ? '管理员' : '成员'
            })

            return data
        },
        handleSelectionChange() {

        },
        filterNode(value, data) {
            if (!value) return true
            return data.teamName.indexOf(value) !== -1
        },
        addMember() {

        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/rem.scss';
@import '../../assets/style/reset.scss';

* {
    box-sizing: border-box;
}

.page_TM {
    position: relative;
    width: 1000px;
    min-height: 400px;
    margin: 100px auto;
    border: 1px solid #ccc;
    background: #fff;
    .part_left {
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        width: 200px;
        height: 100%;
        border-right: 1px solid #ccc;
    }
    .search_unit {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .btn__search {
        display: inline-block;
        width: 25px;
        height: 25px;
        background: url('./image/search.png') 0 center no-repeat;
        background-size: cover;
        padding: 0;
    }
    .txt__search {
        width: 160px;
        display: inline-block;
    }
    .btn_tm {
        position: absolute;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        width: 160px;
        height: 30px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        background: #00BCD4;
        border-radius: 13px;
    }
    .part_right {
        display: inline-block;
        padding-left: 200px;
        width: 100%;
        h3 {
            height: 40px;
            line-height: 40px;
            text-indent: 10px;
        }
    }
}

.btn_addmem {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 160px;
    height: 30px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    background: #00BCD4;
    border-radius: 13px;
}

.dialog__container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 99;

    .dialog__content {
        position: absolute;
        left: 50%;
        top: 28%;
        width: auto;
        height: auto;
        -webkit-transform: translate(-50%);
        transform: translate(-50%);
        background: #fff;
        z-index: 30;
        padding: 20px;
        border-radius: 10px;
        font-size: 15px;
    }
    .tab_head {
        width: 400px;
        span {
            position: relative;
            display: inline-block;
            width: 49%;
            height: 45px;
            line-height: 45px;
            text-align: center;
            font-size: 17px;
            &:nth-child(2n+1):after {
                content: " ";
                position: absolute;
                right: 0;
                top: 25%;
                width: 1px;
                height: 50%;
                border-right: 1px solid #e4e4e4;
            }
        }
        .active {
            color: #00BCD4;
        }
    }
    h3 {
        border-bottom: 1px solid #ccc;
    }
    .tab_content {}
    .line_input {
        display: flex;
        line-height: 30px;
        font-size: 16px;
        margin: 5px;
        padding-right: 20px;
        label {
            flex-basis: 100px;
            text-align: center;
        }
        input {
            display: inline-block;
            flex: 1;
            text-indent: 5px;
            border-style: none;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        input:focus {
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(0, 0, 0, .6);
        }
        .tip {
            color: #a89e9e;
        }
    }
    .btn_addmem_submit {
        margin: 10px auto 0;
        height: 35px;
        width: 220px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 35px;
        background: #00BCD4;
        border-radius: 13px;
    }
    .block_btns {
        width: 400px;
        display: flex;
        justify-content: space-evenly;
        span {
            width: 30%;
            display: inline-block;
            padding: 0 15px;
            line-height: 35px;
            border: 1px solid #ccc;
            text-align: center;
            margin-top: 5px;
            border-radius: 10px;
            background: #00BCD4;
            color: #fff;
        }
    }
}
</style>
