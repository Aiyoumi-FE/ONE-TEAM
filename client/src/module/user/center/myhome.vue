<template>
    <div class="page_mysub">
        <div class="area_info">
            <div class="part_photo">
                <img :src="photoSrc" alt="">
            </div>
            <div class="part_info">
                <p class="user_name">{{userName}}</p>
                <p>{{userLink}}</p>
                <p>{{userDesc}}</p>
            </div>
        </div>
        <div class="area_menu">
            <el-tabs v-model="activeName" @tab-click="chooseTab">
                <el-tab-pane label="周报" name="report">
                    <report-list :userId="userId"></report-list>
                </el-tab-pane>
                <el-tab-pane label="关注" name="focus">
                    <focus-list :focusList="focusList"></focus-list>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- <div class="area_menu">
            <ul>
                <li v-for="item in menuList"><a href="javascript:;" @click="showType = item.param" :class="{'active': showType == item.param}">{{item.label}}</a></li>
            </ul>
        </div> -->
        <!-- <div class="area_content">
            <section v-if="showType == 'report'">
                <report-list :userId="userId"></report-list>
            </section>
            <section v-if="showType == 'focus'">
                <focus-list :focusList="focusList"></focus-list>
            </section>
        </div> -->
    </div>
</template>
<script>
import reportList from './common/reportlist'
import focusList from './common/focuslist'
import {
    getRecordList
} from '@/store/subscript'
import {
    Tabs,
    TabPane
} from 'element-ui'
export default {
    name: 'myhome',
    data() {
        return {
            photoSrc: require('../image/leader.png'),
            userName: 'Heioray',
            userEmail: 'heioray@sina.com',
            userPhone: '15268175233',
            userDesc: 'The Rap God',
            menuList: [{
                label: '周报',
                param: 'report'
            }, {
                label: '关注',
                param: 'focus'
            }],
            userId: '',
            teamId: '',
            showType: 'focus',
            focusList: [],
            activeName: 'report'
        }
    },
    computed: {
        userLink() {
            if (this.userEmail && this.userPhone) {
                return this.userPhone + '/' + this.userEmail
            } else {
                return this.userEmail || this.userPhone
            }
        }
    },
    components: {
        reportList,
        focusList,
        elTabs: Tabs,
        elTabPane: TabPane
    },
    mounted() {
        this.initUserInfo()
        this.getFocusList()
    },
    methods: {
        initUserInfo() {

        },
        getFocusList() {
            getRecordList().then((res) => {
                if (res.success) {
                    this.focusList = res.result
                }
            })
        },
        chooseTab(tab, event) {
            console.log(tab, event)
        }
    }
}
</script>
<style lang="scss" scoped>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    user-select: none;
}
.page_mysub {
    max-width: 960px;
    margin: 0 auto;
    .area_info {
        height: 120px;
        padding: 20px;
        display: flex;
        .part_photo {
            width: 90px;
            height: 80px;
            img {
                height: 80px;
            }
        }
        .part_info {
            padding-top: 5px;
            .user_name {
                font-size: 20px;
                font-weight: bold;
            }
        }
    }
    // .area_menu {
    //     height: 40px;
    //     // border-top: 1px solid #ccc;
    //     // border-bottom: 1px solid #ccc;
    //     ul {
    //         padding-left: 20px;
    //     }
    //     li {
    //         display: inline-block;
    //     }
    //     a {
    //         display: inline-block;
    //         line-height: 40px;
    //         width: 80px;
    //         text-align: center;
    //         color: #808080;
    //     }
    //     .active {
    //         color: #000;
    //         font-weight: bold;
    //     }
    // }
    // .area_content {
    //     padding-top: 30px;
    // }
}
.area_menu {
    height: 40px;
    padding-left: 35px;
    position: relative;
    &:before {
        content: "";
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 2px;
        background-color: rgb(228, 231, 237);
        z-index: 1;
    }
    &:after {
        content: "";
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 2px;
        background-color: rgb(228, 231, 237);
        z-index: 1;
    }
}
</style>
