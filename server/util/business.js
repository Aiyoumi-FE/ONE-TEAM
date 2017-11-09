const serviceUtil = require('./service')

module.exports = {
	// 获取用户状态
    getStatus: function(ctx) {
    	return serviceUtil.getCookie(ctx, 'id')
    }
}
