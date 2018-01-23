import {
    _post
} from '../assets/js/ajax'

/* ================登陆================= */
export const getTeamInfo = (param, callback) => {
    return _post('/teamInfo', param, (data) => {
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

export const joinUrl = (callback) => {
    return _post('/joinUrl', null, (data) => {
        callback(data)
    })
}

export const sendEmail = (param, callback) => {
    return _post('/sendEmail', param, (data) => {
        callback(data)
    })
}

export const getTeamList = (param, callback) => {
    return _post('/getTeamList', param, (data) => {
        callback(data)
    })
}

