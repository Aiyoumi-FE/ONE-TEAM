import {
    _postPromise
} from '../assets/js/ajax'

/* ================登陆================= */
export const getTeamInfo = (param) => {
    return _postPromise('/api/team/getTeamInfo', param)
}

export const changeTeamMemStatus = (param) => {
    return _postPromise('/api/team/changeMemberStatus', param)
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

export const getPermissionTeamList = (param) => {
    return _postPromise('/api/team/getPermissionTeamList', param)
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

export const getChildTeamInfo = (param) => {
    return _postPromise('/api/team/getChildTeamInfo', param)
}
