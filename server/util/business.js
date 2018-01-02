const serviceUtil = require('./service')
const jwt = require('jsonwebtoken')

module.exports = {
	// 获取用户状态
    getStatus: function(ctx) {
    	try {
    		let jwtData = jwt.verify(serviceUtil.getCookie(ctx, 'tocken'), 'jwt one')
    		return jwtData.id
    	} catch(error) {
    		return false
    	}
    }
}
