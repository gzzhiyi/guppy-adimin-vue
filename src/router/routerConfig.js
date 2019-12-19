import BaseLayout from '@/layouts/BaseLayout.vue'
import account from './account'
import examples from './example'

/**
 * 非 Layout 组件页面需要单独配置路由
 */
export const login = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: () => import('@/pages/Login.vue')
}

export const page403 = {
  path: '/error_403',
  name: 'error_403',
  meta: {
    title: '403-没有权限'
  },
  component: () => import('@/pages/error/403.vue')
}

export const page404 = {
  path: '/error_404',
  name: 'error_404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/pages/error/404.vue')
}

export const page500 = {
  path: '/error_500',
  name: 'error_500',
  meta: {
    title: '500-服务器出错'
  },
  component: () => import('@/pages/error/500.vue')
}

/**
 * 作为 BaseLayout 组件的子页面展示
 * 但不在左侧菜单显示的路由写在这里
 */
export const otherRoute = {
  path: '/',
  name: 'other',
  component: BaseLayout,
  children: [
    {
      path: '/home',
      name: 'home',
      title: '首页',
      component: () => import('@/pages/Home.vue')
    },
    ...account
  ]
}

/**
 * 作为 BaseLayout 组件的子页面展示
 * 并且在左侧菜单显示的路由写在这里
 */
export const appRoute = [
  ...examples
]

export default [
  login,
  page403,
  page404,
  page500,
  otherRoute,
  ...appRoute
]
