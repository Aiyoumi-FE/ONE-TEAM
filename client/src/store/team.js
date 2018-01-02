import {
    _post
} from '../assets/js/ajax'

/* ================登陆================= */
export const getTeamInfo = (callback) => {
    return _post('/teamInfo', null, (data) => {
        callback(data)
    })
}

export const changeTeamMemStatus = (param, callback) => {
    return _post('/teamMemStatus', param, (data) => {
        callback(data)
    })
}

export const teamOpera = (param, callback) => {
    return _post('/teamOpera', param, (data) => {
        callback(data)
    })
}
