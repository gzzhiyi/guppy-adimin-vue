import Vue from 'vue'
import ViewUI from 'view-design'
import VueClipboard from 'vue-clipboard2'
import Cookies from 'js-cookie'
import store from './store'
import { router } from './router/index'
import '@services/axiosConfig'
import App from './App'
import 'view-design/dist/styles/iview.css'
import './assets/styles/style.less'

/** Vue 相关 */
Vue.use(VueClipboard)
Vue.use(ViewUI)

new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App),
  created () {
    /** 设置Cookies用户信息 */
    this.$store.commit('setToken', Cookies.get('userToken'))
    this.$store.commit('setUserId', Cookies.get('userId'))
    this.$store.commit('setUserName', Cookies.get('userName'))
    this.$store.commit('setRealName', Cookies.get('realName'))
  },
  mounted () {
    this.$store.commit('initCachepage')
  }
})
