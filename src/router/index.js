import Vue from 'vue'
import iView from 'view-design'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
import routerConfig from './routerConfig'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: routerConfig
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = Cookies.get('userToken')
  if (token) {
    to.path === '/' ? next({ name: 'home' }) : next()
  } else {
    to.name === 'login' ? next() : next({ name: 'login' })
  }
})

router.afterEach((to) => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
