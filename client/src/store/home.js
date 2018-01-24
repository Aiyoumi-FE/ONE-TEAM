import {
    _post
} from '../assets/js/ajax'

/* ================登陆================= */
export const init = (callback) => {
    return _post('/init', null, (data) => {
        callback(data)
    })
}

export const login = (param, callback) => {
    return _post('/user/login', param, (data) => {
        callback(data)
    })
}

export const register = (param, callback) => {
    return _post('/user/register', param, (data) => {
        callback(data)
    })
}

export const signout = (callback) => {
    return _post('/user/signout', null, (data) => {
        callback(data)
    })
}
