<template>
    <div class="bd-date">
        <img src="../img/back.png" alt="" @click="changeDate(-7)">
        <span>{{year}}年  第{{weekNum}}周</span>
        <img class="bd-date_next" v-if="notEnd" src="../img/back.png" alt="" @click="changeDate(7)">
        <p class="bd-date_detail">{{begin}} - {{end}}</p>
        <slot name="header"></slot>
    </div>
</template>
<script>
import dateFormate from './index'

export default {
    name: 'dateFormate',
    data() {
        return {}
    },
    computed: {
        beginDate() {
            return this.$route.query.beginDate ? new Date(parseInt(this.$route.query.beginDate)) : dateFormate.getDayOfWeek(new Date(), 1)
        },
        notEnd() {
            return this.beginDate < dateFormate.getDayOfWeek(new Date(), 1)
        },
        year() {
            return dateFormate.getYear(this.beginDate)
        },
        weekNum() {
            return dateFormate.getYearWeek(this.beginDate)
        },
        begin() {
            return `${this.beginDate.getMonth() + 1}/${this.beginDate.getDate()}`
        },
        end() {
            let end = dateFormate.getDayOfWeek(this.beginDate, 5)
            return `${end.getMonth() + 1}/${end.getDate()}`
        }
    },
    methods: {
        changeDate(action) {
            let beginDate = Date.parse(this.beginDate) + 24 * 60 * 60 * 1000 * action
            this.$emit('dateBack', beginDate)
        }
    }
}

</script>
<style lang="scss" scoped>
@import '../../../assets/style/base.scss';
.bd-date {
    text-align: center;
    font-size: $fontSizeLevel4;
    color: #333;
    span {
        padding: 0 20px;
    }
    img {
        width: 24px;
    }
}

.bd-date_next {
    transform: rotate(180deg);
}

.bd-date_detail {
    margin: 0;
    font-size: $fontSizeLevel6;
    color: #999;
}

</style>
