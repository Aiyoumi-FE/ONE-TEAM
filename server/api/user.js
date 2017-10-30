const User = require('../controllers/user')
module.exports = {
    'POST /login': User.loginAction,
    'POST /register': User.regAction,
    'POST /signout': User.signOutAction
}
