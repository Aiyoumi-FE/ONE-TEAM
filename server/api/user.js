const User = require('../controllers/user')
module.exports = {
	'GET /user/login': User.loginAction,
    'POST /user/login': User.loginAction,
    'POST /user/register': User.regAction,
    'POST /user/signout': User.signOutAction
}
