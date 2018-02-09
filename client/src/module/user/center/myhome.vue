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
            <ul>
                <li v-for="item in menuList">{{item.label}}</li>
            </ul>
        </div>
        <div class="area_content">
            <report-list :userId="userId"></report-list>
        </div>
    </div>
</template>
<script>
import reportList from './common/reportlist'
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
                param: ''
            }],
            userId: '',
            teamId: ''
        }
    },
    computed: {
        // mockData() {
        //     return {
        //         userName: 'Heioray',
        //         userEmail: 'heioray@sina.com',
        //         userPhone: '15268175233',
        //         userDesc: 'The Rap God'
        //     }
        // },
        userLink() {
            if (this.userEmail && this.userPhone) {
                return this.userPhone + '/' + this.userEmail
            } else {
                return this.userEmail || this.userPhone
            }
        }
    },
    components: {
        reportList
    },
    mounted() {
        this.initUserInfo()
    },
    methods: {
        initUserInfo() {

        }
    }
}
</script>
<style lang="scss" scoped>
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
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
    .area_menu {
        height: 40px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        li {
            display: inline-block;
            line-height: 40px;
            width: 80px;
            text-align: center;
        }
    }
}
</style>
