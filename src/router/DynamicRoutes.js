
import Layout from '../views/layout/Layout'
export const DynamicRoutes = [
  {
    path: '/weixinConfig',
    // eslint-disable-next-line no-undef
    component: Layout,
    redirect: '/weixinConfig/weixinConfig',
    name: 'WeixinConfig',
    meta: { title: '系统配置', icon: 'weixin' },
    alwaysShow: true,
    children: [
      {
        path: 'weixinConfig',
        name: 'WeixinConfig',
        component: () => import('@/views/weixinConfig/index'),
        meta: {
          title: '微信配置',
          icon: 'tuisong'
        }
      }
    ]
  }
]
