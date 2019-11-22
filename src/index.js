import Vue from 'vue'
import ViewUI from 'view-design'
import VueClipboard from 'vue-clipboard2'
import Cookies from 'js-cookie'
import store from './store'
import { appRouter } from './router/router'
import { router } from './router/index'
import App from './App.vue'
import 'view-design/dist/styles/iview.css'
import './assets/styles/themes/default/style.less'

/** Axios 配置 */
axios.defaults.baseURL = process.env.API_HOST
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.interceptors.request.use(config => {
  if (store.state.user.token && config.data) {
    config.data['token'] = store.state.user.token // 判断是否存在token，如果存在的话，则每个http header都加上token
  }
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
  // const { ret } = response.data
  // if (ret === 10001) { // 返回10001，需要重新登录
  //   store.commit('logout')
  //   router.replace({ name: 'login' })
  // } else if (ret !== 0) {
  //   ViewUI.Message.error(response.data.msg)
  // }
  return response.data
}, error => {
  return Promise.reject(error)
})

/** Vue 相关 */
Vue.use(VueClipboard)
Vue.use(ViewUI)

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App),
  created () {
    /** 设置Cookies用户信息 */
    this.$store.commit('setToken', Cookies.get('userToken'))
    this.$store.commit('setUserId', Cookies.get('userId'))
    this.$store.commit('setUserName', Cookies.get('userName'))
    this.$store.commit('setRealName', Cookies.get('realName'))

    /** 设置页标签 */
    const tagsList = []
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0])
      } else {
        tagsList.push(...item.children)
      }
    })
    this.$store.commit('setTagsList', tagsList)
  },
  mounted () {
    this.$store.commit('setOpenedList')
    this.$store.commit('initCachepage')
  }
})
