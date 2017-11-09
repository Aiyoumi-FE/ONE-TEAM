module.exports = {
    // 获取周几
    // date当前日期，目标星期几
    getDayOfWeek: (date, targetDay) => {
        var day = date.getDay() || 7
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + targetDay - day)
    },
    // 获取第几周
    getYearWeek: (date) => {
        let a = date.getFullYear()
        let b = date.getMonth()
        let c = date.getDate()
        let date1 = new Date(a, parseInt(b), c)
        let date2 = new Date(a, 0, 1)
        let d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000)
        return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7)
    },
    getYear: (date) => {
        return date.getFullYear()
    }
}
