const Team = require('../controllers/team')
module.exports = {
    'POST /team/teamInfo': Team.getTeamInfo,
    'POST /team/teamMemStatus': Team.chengeMemberStatus,
    'POST /team/teamOpera': Team.teamOpera,
    'POST /team/joinUrl': Team.joinUrl,
    'POST /team/getTeamList': Team.getTeamList,
    'POST /team/getTeamListSelf': Team.getTeamListSelf,
    'POST /team/createTeam': Team.createTeam,
    'POST /team/deleteTeam': Team.deleteTeam,
    'POST /team/updateTeam': Team.updateTeam,
    'POST /team/addMem2Team': Team.addMem2Team
}
