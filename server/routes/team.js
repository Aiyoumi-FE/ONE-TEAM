import Team from '../controllers/team'

module.exports = {
    'POST /team/getTeamInfo': Team.getTeamInfo,
    'POST /team/changeMemberStatus': Team.changeMemberStatus,
    'POST /team/teamOpera': Team.teamOpera,
    'POST /team/joinUrl': Team.joinUrl,
    'POST /team/getTeamList': Team.getTeamList,
    'POST /team/getPermissionTeamList': Team.getPermissionTeamList,
    'POST /team/createTeam': Team.createTeam,
    'POST /team/deleteTeam': Team.deleteTeam,
    'POST /team/updateTeam': Team.updateTeam,
    'POST /team/addMem2Team': Team.addMem2Team,
    'POST /team/getChildTeamInfo': Team.getChildTeamInfo
}
