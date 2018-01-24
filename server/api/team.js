const Team = require('../controllers/team')
module.exports = {
    'POST /team/teamInfo': Team.getTeamInfo,
    'POST /team/teamMemStatus': Team.chengeMemberStatus,
    'POST /team/teamOpera': Team.teamOpera,
    'POST /team/joinUrl': Team.joinUrl,
    'POST /team/getTeamList': Team.getTeamList
}
