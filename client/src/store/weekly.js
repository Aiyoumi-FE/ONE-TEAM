import {
    _post
} from '../assets/js/ajax'

/* ================登陆================= */
export const getWeekList = (param, callback) => {
    return _post('/getWeekList', param, (data) => {
        callback(data)
    })
}

export const getWeekDetail = (param, callback) => {
    return _post('/getWeekDetail', param, (data) => {
        callback(data)
    })
}

export const saveWeekDetail = (param, callback) => {
    return _post('/saveWeekDetail', param, (data) => {
        callback(data)
    })
}
export const getWeeklyConfig = (callback) => {
    return _post('/getWeeklyConfig', null, (data) => {
        callback(data)
    })
}
