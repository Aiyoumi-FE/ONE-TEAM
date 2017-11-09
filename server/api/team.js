const Team = require('../controllers/team')
module.exports = {
    'POST /teamInfo': Team.getTeamInfo
}
