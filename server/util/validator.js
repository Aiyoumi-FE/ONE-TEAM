/**
 * 全局校验类
 */

module.exports = {

    // 校验团队名称
    checkTeamName(str) {
        return /[\u4e00-\u9fa5A-Za-z0-9-_]{2,12}$/.test(str)
    },
    // 校验昵称
    checkNickName(str) {
        return /^[\u4e00-\u9fa5A-Za-z0-9-_]{2,12}$/.test(str)
    },
    // 校验密码(6-12位字母数字符号组合)
    checkPwd(str) {
        return str && /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,12}/.test(str)
    },
    // 校验邮箱
    checkEmail(str) {
        return str && /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(str)
    },
    // 校验手机号
    checkPhoneNum(str) {
        return str && /^1\d{10}$/.test(str)
    },
    // 校验QQ号
    checkQqNum() {
        return /^[1-9][0-9]{4,9}$/.test(str)
    }
}
