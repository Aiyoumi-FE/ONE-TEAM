import {
    _post
} from '../assets/js/ajax'

/* ================登陆================= */
export const getWeekList = (param, callback) => {
    return _post('/week/getWeekList', param, (data) => {
        callback(data)
    })
}

export const getWeekDetail = (param, callback) => {
    return _post('/week/getWeekDetail', param, (data) => {
        callback(data)
    })
}

export const saveWeekDetail = (param, callback) => {
    return _post('/week/saveWeekDetail', param, (data) => {
        callback(data)
    })
}
