export const cookie = {
    get: (name) => {
        let arr = document.cookie.split('; ')
        let res = ''
        arr.forEach((item) => {
            let arrName = item.split('=')
            if (arrName[0] === name) {
                res = arrName[1]
            }
        })
        return res
    }
}
