const Team = require('../controllers/team')
module.exports = {
    'POST /teamInfo': Team.getTeamInfo,
    'POST /teamMemStatus': Team.chengeMemberStatus,
    'POST /teamOpera': Team.teamOpera,
    'POST /joinUrl': Team.joinUrl,
    'POST /getTeamList': Team.getTeamList
}
