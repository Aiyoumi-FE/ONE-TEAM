import {
    _postPromise
} from '../assets/js/ajax'

/* ================WEEK================= */
export const getWeekList = (param) => {
    return _postPromise('/api/week/getWeekList', param)
}

export const getWeekDetail = (param) => {
    return _postPromise('/api/week/getWeekDetail', param)
}

export const saveWeekDetail = (param) => {
    return _postPromise('/api/week/saveWeekDetail', param)
}

export const getWeeklyConfig = () => {
    return _postPromise('/api/week/getWeeklyConfig')
}

export const saveWeeklyConfig = (param) => {
    return _postPromise('/api/week/saveWeeklyConfig', param)
}
