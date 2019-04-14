import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/weixin',
    component: Layout,
    redirect: '/weixin/weixinPush',
    name: 'Weixin',
    meta: { title: '微信', icon: 'weixin' },
    children: [
      {
        path: 'weixinPush',
        name: 'WeixinPush',
        component: () => import('@/views/weixinPush/index'),
        meta: {
          title: '微信推送',
          icon: 'tuisong'
        }
      },
      {
        path: 'useExplain',
        name: 'UseExplain',
        component: () => import('@/views/useExplain/index'),
        meta: { title: '使用说明', icon: 'yiwen' }
      }
    ]
  },
  {
    path: '/systemConfig',
    // hidden: true,
    component: Layout,
    redirect: '/systemConfig/weixinConfig',
    name: 'SystemConfig',
    meta: { title: '系统配置', icon: 'xitongguanli' },
    alwaysShow: true,
    children: [
      {
        path: 'weixinConfig',
        name: 'WeixinConfig',
        component: () => import('@/views/weixinConfig/index'),
        meta: {
          title: '微信配置',
          icon: 'peizhi'
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
// 根据权限动态去匹配的路由
export const asyncRouterMap = [
  {
    path: '/user',
    // hidden: true,
    component: Layout,
    redirect: '/user/userList',
    name: 'User',
    meta: { title: '机构', icon: 'jigou' },
    alwaysShow: true,
    children: [
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/views/user/userList'),
        meta: {
          title: '机构列表',
          icon: 'jigouliebiao'
        }
      }
    ]
  }
]
const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
router.beforeEach((to, from, next) => {
  if (store.getters.isLogin) { // 判断是否登陆
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (!store.getters.userInfo.phone) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取info
          // console.log('GetInfo', res.data)
          store.dispatch('GenerateRoutes', res.data).then(() => { // 生成可访问的路由表
            // console.log('store.getters.addRouters', store.getters.addRouters)
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ path: to.redirectedFrom }) // 先这样写 不知道为什么
            // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        next() // 当有个人信息 放行
      }
    }
  } else {
    if (to.path === '/login') { // 如果是登录页面路径，就直接next()
      next()
    } else { // 不然就跳转到登录；
      next('/login')
    }
  }
})
// router.beforeEach((to, from, next) => {

//   // if (!store.getters.userInfo.phone) { // 判断当前用户是否已拉取完user_info信息
//   //   store.dispatch('GetInfo').then(res => { // 拉取info
//   //     console.log('GetInfo', res.data)
//   //     store.dispatch('GenerateRoutes', res.data).then(() => { // 生成可访问的路由表
//   //       console.log('store.getters.addRouters', store.getters.addRouters)
//   //       router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//   //       next({ path: to.redirectedFrom }) // 先这样写 不知道为什么
//   //       // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//   //     })
//   //   }).catch(err => {
//   //     console.log(err)
//   //   })
//   // } else {
//   //   next() // 当有个人信息 放行
//   // }
// })
export default router
