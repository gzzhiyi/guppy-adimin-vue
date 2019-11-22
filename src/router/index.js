// src/router/index.js
import Vue from 'vue'
import iView from 'view-design'
import { openNewPage } from 'utils'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
import { routers } from './router'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  routes: routers
}

export const router = new VueRouter(RouterConfig)

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
  openNewPage(router.app, to.name, to.params, to.query)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
