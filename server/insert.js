// 工具库
const { serviceUtil, businessUtil } = require('./util')
// 数据库
const teamModel = require('./models/team.js')
const userModel = require('./models/user.js')
const weeklyModel = require('./models/weekly.js')

const fs = require('fs')

var data = fs.readFileSync('./week.json', 'utf-8')
var jsonData = JSON.parse(data)
var teamId = '5a4c506335dfee6105e525b4' // 团队id

for (var i = 0; i < jsonData.length; i++) {  // 某一周
    var item = jsonData[i]
    var weekList = item.membeRecords
    var creatTime = getCreateTime(item.title)
    for (var j = 0; j < weekList.length; j++) { // 某一周中的每个人
        var weeklyList = weekList[j]
        var userId = {
            '5cc9d31b623c4843b83b9209255ee33f': '5a5316cd7e44000cde370c30', //蔡蔡
            '7bc28d3722c149c4a4a17a0647c92581': '5a4c513935dfee6105e525b7', // 我
            'bcfbd55367444bbabeb312515f20aca3': '5a4df0ddae515ad30101b87c', // 青
            'ae421f85607c48bc92bac00e9c8c16df': '5a4df04cae515ad30101b87b', //吴松
            '9c1ef50470454138bd87b8f0b469eee0': '5a4ee40fb73c94d32fb73ffb', //小赵
            '9e1552dc9bc947359ae940ebc5edbca4': '5a4c513935dfee6105e525b7', //英姐
            'df99d56ca3894956b6d2042525c1ee28': '5a5318d17e44000cde370c32', //萌神
            '057faaf4ee834499813dd3bb4c5ca3e2': '5a531a017e44000cde370c33', //敏哥
            'c6ba921564ea44a5a7b662209f9032b0': '5a531a7e7e44000cde370c35', //马慧
            '5c6baf645055448ba8eee2720804513f': '5a531a9c7e44000cde370c37', //贺婷
            '62be72851f8b404ca6527d7f13d57e14': '5a531ad77e44000cde370c3a', //学婧
            '8f96af1f77d149788a72358e5efb0b14': '5a531c067e44000cde370c3b', //小翔
            'e9bcd1e4c55f46eb9ab051db8e955c95': '5a531c4e7e44000cde370c3c', //杨钧
            '424105a474ea4235bb51e5b1c434cc5c': '5a531c7a7e44000cde370c3d', //宝叔
            'a13ca593210d4d07ae0689d4aa07fc2d': '5a531c977e44000cde370c3e' //老杨
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