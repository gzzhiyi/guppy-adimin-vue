import BaseLayout from '@/layouts/BaseLayout.vue'

export default [
  {
    path: '/form',
    name: 'form',
    title: '表格',
    icon: 'md-paper',
    component: BaseLayout,
    children: [
      {
        path: '/form_elements',
        name: 'form_elements',
        icon: 'md-paper',
        title: '表单组件',
        component: () => import('@/pages/examples/form/FormElements.vue')
      }
    ]
  },
  {
    path: '/table',
    name: 'table',
    title: '表格',
    icon: 'md-list-box',
    component: BaseLayout,
    children: [
      {
        path: '/basic_table',
        name: 'basic_table',
        icon: 'md-list-box',
        title: '标准表格',
        component: () => import('@/pages/examples/table/BasicTable.vue')
      },
      {
        path: '/general_table',
        name: 'general_table',
        icon: 'md-list-box',
        title: '综合表格',
        component: () => import('@/pages/examples/table/GeneralTable.vue')
      }
    ]
  }
]
