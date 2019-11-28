/**
 * Axios 配置
 */
import ViewUI from 'view-design'
import store from '../store'
import { router } from '../router/index'

axios.defaults.baseURL = process.env.API_HOST
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

/** 拦截器 */
axios.interceptors.request.use(config => {
  if (store.state.user.token && config.data) {
    config.data['token'] = store.state.user.token // 判断是否存在token，如果存在的话，则每个http header都加上token
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  const { ret } = response.data
  if (ret === 10001) { // 返回10001，需要重新登录
    store.commit('logout')
    router.replace({ name: 'login' })
  } else if (ret !== 0) {
    ViewUI.Message.error(response.data.msg)
  }
  return response.data
}, error => {
  return Promise.reject(error)
})
