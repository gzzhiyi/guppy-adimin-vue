export default [
  {
    path: '/user_center',
    name: 'user_center',
    title: '个人中心',
    component: () => import('@/pages/account/UserCenter.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    title: '个人设置',
    component: () => import('@/pages/account/Settings.vue')
  }
]
