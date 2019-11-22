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
  component: () =>
    import ('@/pages/Login.vue')
}

/**
 * 404
 */
export const page404 = {
  path: '/error_404',
  name: 'error_404',
  meta: {
    title: '404-页面不存在'
  },
  component: () =>
    import ('@/pages/404.vue')
}

/**
 * 浏览器兼容
 */
export const notSupport = {
  path: '/not_support',
  name: 'not_support',
  meta: {
    title: '不支持当前浏览器'
  },
  component: () =>
    import ('@/pages/NotSupport.vue')
}

/**
 * 作为Main组件的子页面展示
 * 但不在左侧菜单显示的路由写在这里
 */
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  component: BasicLayout,
  children: [
    {
      path: '/home',
      name: 'home',
      title: '欢迎',
      component: () =>
        import ('@/pages/Home.vue')
    }
  ]
}

/**
 * 作为Main组件的子页面展示
 * 并且在左侧菜单显示的路由写在appRouter里
 */
export const appRouter = [
  {
    path: '/project',
    name: 'project',
    title: '项目管理',
    icon: 'md-bug',
    component: BasicLayout,
    children: [
      {
        path: '/project_list',
        name: 'project_list',
        icon: 'md-cube',
        access: 'admin',
        title: '项目列表',
        component: () =>
          import ('@/pages/project/List.vue')
      }
    ]
  },
  {
    path: '/resource',
    name: 'resource',
    title: '资源管理',
    icon: 'md-bug',
    component: BasicLayout,
    children: [
      {
        path: '/resource_list',
        name: 'resource_list',
        icon: 'md-images',
        title: '资源列表',
        component: () =>
          import ('@/pages/resource/List.vue')
      }
    ]
  }
]

export const routers = [
  login,
  page404,
  notSupport,
  otherRouter,
  ...appRouter
]
