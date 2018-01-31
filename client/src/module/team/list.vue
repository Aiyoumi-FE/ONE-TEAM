<template>
    <div v-if="!loading">
        <h1>{{obj.teamName}}</h1>
        <div class="team-sub">
            <span class="invate">邀请码：{{obj._id}}</span>
            <div class="team-sub_btn">
                <button v-if="obj.isAdmin" class="btn" @click="manageAction">{{manageText}}</button>
                <button v-if="obj.isAdmin" class="btn" @click="invate">邀请新成员</button>
                <button class="btn" @click="teamOpera('out')">退出团队</button>
            </div>
        </div>
        <ul class="ot-cells">
            <li v-for="item in obj.memberList" class="ot-cell">
                <div class="cell-hd">
                    <img class="cell-hd-pic" :src="item.phote | photoFilter" alt="">
                </div>
                <div class="cell-bd">
                    <p><span class="cell-hd-name">{{item.nickName}}</span><span class="admin" v-if="item._id == obj.administrator">管理员</span></p>
                    <p>{{item.eMail}}</p>
                </div>
                <div v-if="managing && item._id != obj.administrator" class="cell-ft">
                    <button v-if="obj.isAdmin" class="btn" @click="teamOpera('admin', item._id)">升级</button>
                    <button class="btn" @click="teamOpera('del', item._id)">移除</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {
    changeTeamMemStatus,
    getTeamInfo
} from '@/store/team'
import TeamJoin from './join'

export default {
    name: 'home',
    data() {
        return {
            loading: true,
            managing: false,
            obj: {}
        }
    },
    filters: {
        photoFilter(val) {
            return val || require('../user/image/cat.png')
        }
    },
    components: {
        TeamJoin
    },
    computed: {
        manageText() {
            return this.managing ? '完成' : '管理团队'
        }
    },
    mounted() {
        this.initData()
    },
    methods: {
        initData() {
            getTeamInfo().then((res) => {
                // const res = response.data

                if (res.success) {
                    this.obj = res.result
                } else {
                    this.$router.replace({
                        name: 'refuse'
                    })
                }
                this.loading = false
            })
        },
        invate() {
            this.$router.push('teamJoin')
        },
        manageAction() {
            // this.managing = !this.managing
            this.$router.push({
                path: 'teamManage'
            })
        },
        teamOpera(str, id) {
            if (str === 'out' && this.obj.isAdmin) {
                alert('请先移交管理权限')
                return
            }
            changeTeamMemStatus({
                opera: str,
                userId: id
            }).then((res) => {
                if (str === 'admin') {
                    this.managing = !this.managing
                }
                this.initData()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/base.scss';
h1 {
    font-size: $fontSizeLevel4;
}
.team-sub{
    display:flex;
    justify-content:space-between;
    .team-sub_btn {
        display: flex;
        .btn {
            margin-right: 10px;
        }
    }
}
.invate{
    padding: 5px 15px;
    border-radius: 20px;
    background-color: #eee;
    display: inline-block;
}
.admin{
    margin-left: 10px;
    padding: 2px 15px;
    border-radius: 20px;
    background-color: #fcf1a5;
    display: inline-block;
}
.cell-hd {
    width: 50px;
    text-align: center;
}

.cell-hd-pic {
    width: 50px;
    height: 50px;
    border-radius: 25px;
    line-height: 50px;
}

.ot-cells {
    margin-top: 30px;
}
.ot-cell {
    min-height: 60px;
}
.cell-bd {
    margin-left: 15px;
    flex-grow: 1;
    p {
        margin: 5px 0;
    }
}
.cell-hd-name{
    font-size: $fontSizeLevel6;
}
.team-pic_no{
    width: 80px;
}
@media screen and (max-width: 1024px) {
    .team-sub {
        flex-direction: column;
        .btn {
            padding: 0 10px;
        }
    }
    .team-sub_btn {
        margin-top: 10px;
    }
}
</style>
