import {
  _post
} from '../assets/js/ajax'

/* ================登陆================= */
// 短信验证码登录提交
export const login = (param, callback) => {
  return _post('/login', param, (data) => {
    callback(data)
  })
}
