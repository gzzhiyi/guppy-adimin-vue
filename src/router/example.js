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
  },
  {
    path: '/form',
    name: 'form',
    title: '表单页',
    icon: 'md-list',
    component: BaseLayout,
    children: [
      {
        path: '/base_form',
        name: 'base_form',
        icon: 'md-list',
        title: '标准表单',
        component: () => import('@/pages/examples/form/BaseForm.vue')
      },
      {
        path: '/step_form',
        name: 'step_form',
        icon: 'md-list',
        title: '标准表单',
        component: () => import('@/pages/examples/form/StepForm.vue')
      }
    ]
  },
  {
    path: '/detail',
    name: 'detail',
    title: '详情页',
    icon: 'md-list',
    component: BaseLayout,
    children: [
      {
        path: '/base_detail',
        name: 'base_detail',
        icon: 'md-list',
        title: '标准详情',
        component: () => import('@/pages/examples/detail/BaseDetail.vue')
      }
    ]
  }
]
