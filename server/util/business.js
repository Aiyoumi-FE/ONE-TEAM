import serviceUtil from './service'
import jwt from 'jsonwebtoken'
import { secret } from './const'

module.exports = {
    // 获取用户状态
    getStatus: function(ctx) {
        try {
            let jwtData = jwt.verify(serviceUtil.getCookie(ctx, 'token'), secret)
            return jwtData.id
        } catch (error) {
            return false
        }
    }
}
