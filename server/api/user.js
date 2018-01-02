const User = require('../controllers/user')
module.exports = {
	'GET /login': User.loginAction,
    'POST /login': User.loginAction,
    'POST /register': User.regAction,
    'POST /signout': User.signOutAction
}
