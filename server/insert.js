// 工具库
const { serviceUtil, businessUtil } = require('./util')
// 数据库
const teamModel = require('./models/team.js')
const userModel = require('./models/user.js')
const weeklyModel = require('./models/weekly.js')

const fs = require('fs')

var data = fs.readFileSync('./test.json', 'utf-8')
var jsonData = JSON.parse(data)
var teamId = '5a4ee688b73c94d32fb73ffc' // 团队id

for (var i = 0; i < jsonData.length; i++) {  // 某一周
    var item = jsonData[i]
    var weekList = item.membeRecords
    var creatTime = getCreateTime(item.title)
    for (var j = 0; j < weekList.length; j++) { // 某一周中的每个人
        var weeklyList = weekList[j]
        var userId = {
            '5cc9d31b623c4843b83b9209255ee33f': '5a51ea21b73c94d32fb74003', //蔡蔡
            '7bc28d3722c149c4a4a17a0647c92581': '5a4ee688b73c94d32fb73ffd', // 我
            'bcfbd55367444bbabeb312515f20aca3': '5a51f792b73c94d32fb74004' // 青
        }[weeklyList.id]
        if (userId) {
            var content = ''
            var contentList = weeklyList.content
            console.log(contentList)
            for (var k = 0; k < contentList.length; k++) {
                content += '<h3>' + contentList[k].title + '</h3>' + contentList[k].content
            }
            var createWeekly = new weeklyModel({
                userId: userId,
                teamId: teamId,
                content: content,
                creatTime: creatTime // 创建时间
            })
            let createWeeklyRes = createWeekly.save()
        }
    }
}

function getCreateTime (da) {
    var year = da.substring(0, 4)
    var week = da.substring(8, da.length - 2)
    return getXDate(year, week, 1)
}

function getXDate(year,weeks,weekDay){ 
    // 用指定的年构造一个日期对象，并将日期设置成这个年的1月1日 
    // 因为计算机中的月份是从0开始的,所以有如下的构造方法 
    var date = new Date(year,"0","1"); 
     
    // 取得这个日期对象 date 的长整形时间 time 
    var time = date.getTime(); 
     
    // 将这个长整形时间加上第N周的时间偏移 
    // 因为第一周就是当前周,所以有:weeks-1,以此类推 
    // 7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒) 
    time+=(weeks-1)*7*24*3600000; 
     
    // 为日期对象 date 重新设置成时间 time 
    date.setTime(time); 
    return getNextDate(date,weekDay); 
}

function getNextDate(nowDate,weekDay){ 
    // 0是星期日,1是星期一,... 
    weekDay%=7; 
    var day = nowDate.getDay(); 
    var time = nowDate.getTime(); 
    var sub = weekDay-day; 
    if(sub < 0){ 
    sub += 7; 
    } 
    time+=sub*24*3600000; 
    nowDate.setTime(time); 
    return nowDate; 
}