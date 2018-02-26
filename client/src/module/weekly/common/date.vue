<template>
    <div class="date">
        <p class="date-week">
            <i class="el-icon-arrow-left" @click="changeDate(-7)"></i>
            <span>{{year}}年  第{{weekNum}}周</span>
            <i class="el-icon-arrow-right" v-if="notEnd" @click="changeDate(7)"></i>
        </p>
        <p class="date-day">{{begin}} - {{end}}</p>
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
.date {
    text-align: center;
}
.date-week {
    color: #333;
    margin-bottom: 5px;
    font-size: $fontSizeLevel2;
    span {
        padding: 0 20px;
    }
}
.date-day {
    margin: 0;
    font-size: $fontSizeLevel4;
    color: $colorTextGeneral;
}

.bd-date_next {
    transform: rotate(180deg);
}

</style>
