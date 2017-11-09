import {
    _post
} from '../assets/js/ajax'

/* ================登陆================= */
export const getTeamInfo = (callback) => {
    return _post('/teamInfo', null, (data) => {
        callback(data)
    })
}
