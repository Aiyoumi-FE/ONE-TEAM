import Team from '../controllers/team'

const urlList = [
    'getTeamInfo',
    'changeMemberStatus',
    'teamOpera',
    'joinUrl',
    'getTeamList',
    'getPermissionTeamList',
    'createTeam',
    'deleteTeam',
    'updateTeam',
    'addMem2Team',
    'getChildTeamInfo'
]
let mapping = {}
urlList.forEach((item) => {
    mapping['POST /team/' + item] = Team[item]
})

module.exports = mapping
