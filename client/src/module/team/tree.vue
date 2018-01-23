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
                Manage Entry
            </p>
        </div>
        <div class="part_right">
            <h3>{{currentTeam.name}}</h3>
            <el-table ref="multipleTable" :data="teamDetail" tooltip-effect="blue" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="nickName" label="姓名">
                </el-table-column>
                <el-table-column prop="eMail" label="邮箱">
                </el-table-column>
                <el-table-column prop="type" label="成员类别">
                </el-table-column>
                <el-table-column prop="other" label="备注">
                </el-table-column>
            </el-table>
        </div>
        <div class="part_other">
            <div class="dialog__container">
                <div class="dialog__content">
                    11111111111
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
import otDialog from '@/components/dialog'
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
                show: true
            },
            currentTeam: {
                name: ''
            }
        }
    },
    components: {
        'el-tree': Tree,
        'el-table': Table,
        'el-table-column': TableColumn,
        'el-input': Input,
        'ot-dialog': otDialog
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            let params = ''
            getTeamList(params, (data) => {
                let temp = this.reformate(data.result)
                console.log(temp)
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
        // reformate(dataList) {
        //     return dataList.map((item) => {
        //         return {
        //             value: item._id,
        //             label: item.teamName,
        //             children: this.reformate(item.children)
        //         }
        //     })
        // },
        search() {
            this.$refs.teamTree.filter(this.filterText)
        },
        getInfo(team) {
            let teamId = team._id
            getTeamInfo({teamId}, (data) => {
                if (data.success && data.result) {
                    this.teamDetail = data.result.memberList
                    this.currentTeam.name = data.result.teamName
                    this.currentTeam.num = data.result.memberList.length
                }
            })
        },
        handleSelectionChange() {

        },
        filterNode(value, data) {
            if (!value) return true
            return data.teamName.indexOf(value) !== -1
        },
        goEditRequest() {

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
.dialog__container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 99;

    .dialog__content {
        width: 440px;
        height: auto;
        padding-bottom: 20px;
        background: #fff;
        z-index: 30;
        padding: 20px;
        border-radius: 10px;
        font-size: 15px;
    }
    .dialog__content {
        position: absolute;
        left: 50%;
        top: 50%;
        width: auto;
        height: auto;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
    }
}
</style>
