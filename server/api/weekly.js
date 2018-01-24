const Weekly = require('../controllers/weekly')
module.exports = {
    'POST /week/getWeekList': Weekly.getWeeklyList,
    'POST /week/getWeekDetail': Weekly.getWeeklyDetail,
    'POST /week/saveWeekDetail': Weekly.saveWeekly
}
