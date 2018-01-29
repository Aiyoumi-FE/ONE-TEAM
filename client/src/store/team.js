import {
    _postPromise
} from '../assets/js/ajax'

/* ================登陆================= */
export const getTeamInfo = (param) => {
    return _postPromise('/api/team/teamInfo', param)
}

export const changeTeamMemStatus = (param) => {
    return _postPromise('/api/team/teamMemStatus', param)
}

export const teamOpera = (param) => {
    return _postPromise('/api/team/teamOpera', param)
}

export const joinUrl = () => {
    return _postPromise('/api/team/joinUrl')
}

export const sendEmail = (param) => {
    return _postPromise('/api/common/sendEmail', param)
}

/* new */
export const getTeamList = (param) => {
    return _postPromise('/api/team/getTeamList', param)
}

export const getTeamListSelf = (param) => {
    return _postPromise('/api/team/getTeamListSelf', param)
}

export const createTeam = (param) => {
    return _postPromise('/api/team/createTeam', param)
}

export const deleteTeam = (param) => {
    return _postPromise('/api/team/deleteTeam', param)
}

export const updateTeam = (param) => {
    return _postPromise('/api/team/updateTeam', param)
}

export const addMem2Team = (param) => {
    return _postPromise('/api/team/addMem2Team', param)
}
