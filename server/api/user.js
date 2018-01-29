import User from '../controllers/user'
import koaRouter from 'koa-router'

const router = koaRouter()

router.get('/user/login', User.loginAction)
router.post('/user/login', User.loginAction)
router.post('/user/register', User.regAction)
router.post('/user/signout', User.signOutAction)

module.exports = router
