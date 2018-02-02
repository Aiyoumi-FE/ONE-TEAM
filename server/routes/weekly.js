import Weekly from '../controllers/weekly'
import WeeklyConfig from '../controllers/weeklyConfig'

module.exports = {
    'POST /week/getWeekList': Weekly.getWeeklyList,
    'POST /week/getWeekDetail': Weekly.getWeeklyDetail,
    'POST /week/saveWeekDetail': Weekly.saveWeekly,
    'POST /week/getWeeklyConfig': WeeklyConfig.getWeeklyConfig,
    'POST /week/saveWeeklyTemplate': WeeklyConfig.saveWeeklyTemplate,
    'POST /week/saveSummaryTemplate': WeeklyConfig.saveSummaryTemplate
}
