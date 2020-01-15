import BaseLayout from '@/layouts/BaseLayout.vue'

export default [
  {
    path: '/form',
    name: 'form',
    title: '表单',
    icon: 'md-paper',
    component: BaseLayout,
    children: [
      {
        path: '/form_elements',
        name: 'form_elements',
        icon: 'md-paper',
        title: '表单组件',
        component: () => import('@/pages/examples/form/FormElements.vue')
      },
      {
        path: '/form_validation',
        name: 'form_validation',
        icon: 'md-paper',
        title: '表单验证',
        component: () => import('@/pages/examples/form/FormValidation.vue')
      },
      {
        path: '/editor',
        name: 'editor',
        icon: 'md-paper',
        title: '文本编辑',
        component: () => import('@/pages/examples/form/Editor.vue')
      }
    ]
  },
  {
    path: '/error',
    name: 'error',
    title: '错误异常',
    icon: 'md-bug',
    children: [
      {
        path: '/error_403',
        name: 'error_403',
        icon: 'md-bug',
        title: '错误-403',
        component: () => import('@/pages/error/403.vue')
      },
      {
        path: '/error_404',
        name: 'error_404',
        icon: 'md-bug',
        title: '错误-404',
        component: () => import('@/pages/error/404.vue')
      },
      {
        path: '/error_500',
        name: 'error_500',
        icon: 'md-bug',
        title: '错误-500',
        component: () => import('@/pages/error/500.vue')
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
        path: '/table_example',
        name: 'table_example',
        icon: 'md-list-box',
        title: '表格示例',
        component: () => import('@/pages/examples/table/TableExample.vue')
      },
      {
        path: '/standard_table',
        name: 'standard_table',
        icon: 'md-list-box',
        title: '标准表格',
        component: () => import('@/pages/examples/table/StandardTable.vue')
      }
    ]
  }
]
