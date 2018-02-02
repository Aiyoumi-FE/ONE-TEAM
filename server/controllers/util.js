// 工具库
import { serviceUtil } from '../util'
import nodemailer from 'nodemailer'
import teamModel from '../models/team.js'

class Util {

    async sendEmail(ctx, next) {
        let formData = ctx.request.body
        let teamId = serviceUtil.getCookie(ctx, 'team')
        let userName = serviceUtil.getCookie(ctx, 'team')
        let transporter = nodemailer.createTransport({  
            service: 'qq',  
            auth: {  
                user: '526932838@qq.com',  
                pass: 'bpywdnrmtsczcbda' //授权码,通过QQ获取  
            }  
        })
        let teamInfo = await teamModel
                .findOne({ '_id': teamId })
                .populate('administrator', 'nickName')
                .exec()

        let url = `http://${ctx.request.header.host}/page/user/register?id=${teamId}`
        let mailOptions = {  
            from: '526932838@qq.com', // 发送者  
            to: formData.email, // 接受者,可以同时发送多个,以逗号隔开  
            subject: '邀请您加入ONE TEAM', // 标题  
            //text: 'Hello world', // 文本  
            html: `<h2>${teamInfo.administrator.nickName}邀请您加入:${teamInfo.teamName}团队</h2><h3>  
            <a href="${url}">  
            ${url}</a></h3>`   
        } 

        transporter.sendMail(mailOptions, function (err, info) {  
            if (err) {  
              console.log(err)
              return
            }  

            let result = {
                success: true
            }
            ctx.response.body = result 
        })

    }
}


module.exports = new Util()
