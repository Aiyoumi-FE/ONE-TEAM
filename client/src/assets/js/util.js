// const md5 = require('js-md5')
const Base64 = require('./base64')
module.exports = {
    // encrypt: function(data) { // 密码加密
    //     var hash = md5.create()
    //     hash.update(data)
    //     return hash.hex()
    // },
    decodeBase64: (str) => {
        console.log(Base64.decode(str))
        return Base64.decode(str)
    },
    login: (param) => {
        let url = window.location.pathname + window.location.search
        if (param) {
            url = param
        }
        window.location.href = '/page/login?backUrl=' + encodeURIComponent(url)
    }
}
