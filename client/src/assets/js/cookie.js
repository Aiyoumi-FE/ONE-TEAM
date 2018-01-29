export const cookie = {
    get(name) {
        let arr = document.cookie.split('; ')
        let res = ''
        arr.forEach((item) => {
            let arrName = item.split('=')
            if (arrName[0] === name) {
                res = arrName[1]
            }
        })
        return res
    },
    set(name, value, exdays, path) {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = 'expires=' + d.toUTCString()
        document.cookie = name + '=' + value + '; ' + expires + '; path=' + path
    },
    clear(name, path) {
        this.set(name, '', -1, path)
    }
}
