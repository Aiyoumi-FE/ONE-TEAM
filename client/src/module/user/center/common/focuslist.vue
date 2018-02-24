<template>
    <div class="component_focus">
        <!-- 搜索添加栏 -->
        <div class="area_search">
            <!-- <input class="search_input" type="text" v-model="searchContent">
            <span class="search_btn">搜索</span>
            <span class="search_btn">添加</span> -->
            <el-input v-model="searchContent" placeholder="请输入内容"></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <!-- 列表区域 -->
        <ul v-if="focusList.length">
            <li v-for="item in focusList">
                <!-- <img :src="" alt=""> -->
                <p class="focus_part part_name">
                    <span class="name_photo">
                        {{item.subUserName | leterFilter}}
                    </span>
                    <b>{{item.subUserName}}/{{item.subUserTeam}}</b>
                </p>
                <p class="focus_part part_btn">
                    取消关注
                </p>
            </li>
        </ul>
        <div v-else class="bg_empty">
            <p>~~空空如也~~</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'focusList',
    props: {
        focusList: {
            type: Array
        }
    },
    data() {
        return {
            searchContent: '',
            searchID: '',
            searchList: []
        }
    },
    components: {

    },
    filters: {
        leterFilter(val) {
            return val.slice(0, 1)
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {

    }
}

</script>
<style lang="scss" scoped>
.component_focus {
    padding: 0 100px;
}
.area_search {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .search_input {
        display: inline-block;
        width: 240px;
        height: 30px;
        border: 1px solid #ccc;
        line-height: 30px;
        font-size: 16px;
        text-indent: 8px;
    }
    .search_btn {
        display: inline-block;
        padding: 3px 8px;
        text-align: center;
        line-height: 20px;
        border-radius: 3px;
        background: #ccc;
        height: 30px;
        margin-left: 5px;
    }
}
ul {
    position: relative;
    &:after {
        content: ' ';
        position: absolute;
        left: 100px;
        bottom: 0;
        height: 1px;
        width: 760px;
        background: #e6e6e6;
    }
}
li {
    display: flex;
    align-items: center;
    position: relative;
    height: 80px;
    &:before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        height: 1px;
        width: 100%;
        background: #e6e6e6;
    }
    .name_photo {
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        text-align: center;
        background: #ccc;
        line-height: 50px;
    }
}
.part_name {
    flex: 1;
}
.focus_part {
    display: inline-block;
}
.part_btn {
    padding: 3px 8px;
    border-radius: 2px;
    background: #ccc;
}
.bg_empty {
    width: 170px;
    height: 250px;
    text-align: center;
    margin: 30px auto;
    padding-top: 165px;
    background: url('./img/empty.png') 0 0 no-repeat;
    background-size: contain;
    p {
        font-size: 20px;
        /* font-weight: bold; */
        color: #9a9a9a;
    }
}
</style>
