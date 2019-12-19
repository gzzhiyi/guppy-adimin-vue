import BaseLayout from '@/layouts/BaseLayout.vue'

export default [
  {
    path: '/list',
    name: 'list',
    title: '列表页',
    icon: 'md-list',
    component: BaseLayout,
    children: [
      {
        path: '/base_list',
        name: 'base_list',
        icon: 'md-list',
        title: '标准列表',
        component: () => import('@/pages/examples/list/BaseList.vue')
      }
    ]
  }
]
