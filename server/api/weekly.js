const Weekly = require('../controllers/weekly')
module.exports = {
    'POST /getWeekList': Weekly.getWeeklyList,
    'POST /getWeekDetail': Weekly.getWeeklyDetail,
    'POST /saveWeekDetail': Weekly.saveWeekly
}
