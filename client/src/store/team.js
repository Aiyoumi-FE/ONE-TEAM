import {
    _post
} from '../assets/js/ajax'

/* ================登陆================= */
export const getTeamInfo = (param, callback) => {
    return _post('/team/teamInfo', param, (data) => {
        callback(data)
    })
}

export const changeTeamMemStatus = (param, callback) => {
    return _post('/team/teamMemStatus', param, (data) => {
        callback(data)
    })
}

export const teamOpera = (param, callback) => {
    return _post('/team/teamOpera', param, (data) => {
        callback(data)
    })
}

export const joinUrl = (callback) => {
    return _post('/team/joinUrl', null, (data) => {
        callback(data)
    })
}

export const sendEmail = (param, callback) => {
    return _post('/common/sendEmail', param, (data) => {
        callback(data)
    })
}

/* new */
export const getTeamList = (param, callback) => {
    return _post('/team/getTeamList', param, (data) => {
        callback(data)
    })
}

export const createTeam = (param, callback) => {
    return _post('/team/createTeam', param, (data) => {
        callback(data)
    })
}

export const deleteTeam = (param, callback) => {
    return _post('/team/deleteTeam', param, (data) => {
        callback(data)
    })
}

export const updateTeam = (param, callback) => {
    return _post('/team/updateTeam', param, (data) => {
        callback(data)
    })
}

export const addMem2Team = (param, callback) => {
    return _post('/team/addMem2Team', param, (data) => {
        callback(data)
    })
}
