// src/router/router.js
import BasicLayout from '@/layouts/BasicLayout.vue'

/**
 * 登录
 */
export const login = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: () => import ('@/pages/accounts/Login.vue')
}

/**
 * 404
 */
export const page403 = {
  path: '/error_403',
  name: 'error_403',
  meta: {
    title: '403-没有权限'
  },
  component: () => import ('@/pages/error/403.vue')
}

export const page404 = {
  path: '/error_404',
  name: 'error_404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import ('@/pages/error/404.vue')
}

/**
 * 作为Main组件的子页面展示，但不在左侧菜单显示的路由写在这里
 */
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  component: BasicLayout,
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      title: '首页',
      component: () => import ('@/pages/Dashboard.vue')
    }
  ]
}

/**
 * 作为Main组件的子页面展示，并且在左侧菜单显示的路由写在appRouter里
 */
export const appRouter = [
  {
    path: '/list',
    name: 'list',
    title: '列表页',
    icon: 'md-list',
    component: BasicLayout,
    children: [
      {
        path: '/basic_list',
        name: 'basic_list',
        icon: 'md-list',
        title: '标准列表',
        component: () => import ('@/pages/examples/list/BasicList.vue')
      },
      {
        path: '/search_list',
        name: 'search_list',
        icon: 'md-list',
        title: '搜索列表',
        component: () => import ('@/pages/examples/list/SearchList.vue')
      }
    ]
  }
]

export default [
  login,
  page404,
  otherRouter,
  ...appRouter
]
