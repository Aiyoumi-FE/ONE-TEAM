const Weekly = require('../controllers/weekly')
const WeeklyConfig = require('../controllers/weeklyConfig')
module.exports = {
    'POST /week/getWeekList': Weekly.getWeeklyList,
    'POST /week/getWeekDetail': Weekly.getWeeklyDetail,
    'POST /week/saveWeekDetail': Weekly.saveWeekly,
    'POST /week/getWeeklyConfig': WeeklyConfig.getweeklyTemplate,
    'POST /week/saveWeeklyConfig': WeeklyConfig.saveWeeklyTemplate
}
