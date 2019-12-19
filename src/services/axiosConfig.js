/**
 * Axios 配置
 */
axios.defaults.baseURL = process.env.API_HOST
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

/** 拦截器 */
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})
