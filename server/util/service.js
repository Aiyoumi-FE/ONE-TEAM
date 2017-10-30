const crypto = require('crypto')
module.exports = {
    encrypt: function(data) { // 密码加密
        let key = 'oneteam'
        let cipher = crypto.createCipher("bf", key)
        let newPsd = cipher.update(data, "utf8", "hex")
        newPsd += cipher.final("hex")
        return newPsd;
    },
    sendErrMsg: function(ctx, errMsg = '系统错误') { // 错误返回
        ctx.response.body = {
            success: false,
            resultDes: errMsg
        }
    },
    getCookie: function(req, str) {
        if (req.header.cookie) {
            let arr = req.header.cookie.split('; ')
            let res = ''
            arr.forEach((item) => {
                let arrName = item.split('=')
                if (arrName[0] === str) {
                    res = arrName[1]
                }
            })
            return res
        }
    },
    getDayOfWeek: (date, targetDay) => {
        var day = date.getDay() || 7
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + targetDay - day)
    },
    // 获取第几周
    getYearWeek: (date) => {
        let a = date.getFullYear(),
            b = date.getMonth(),
            c = dataNow.getDate()
        let date1 = new Date(a, parseInt(b), c),
            date2 = new Date(a, 0, 1)
        let d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000)
        return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
    }
}
