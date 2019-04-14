
import { asyncRouterMap, constantRouterMap } from '@/router'
const permissionRouters = {
  state: {
    routers: constantRouterMap, // 一开始就有的路由 所有人都有权限
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers // 根据某个值动态添加的router
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, userInfo) { // 根据userInfo 去动态生成路由
      return new Promise(resolve => {
        // const { roles } = data
        // console.log('userInfo', userInfo)

        const accessedRouters = asyncRouterMap.filter(v => {
          return userInfo.phone === '15313855386' || userInfo.phone === '15658163361'
          // return true
          // if (roles.indexOf('admin') >= 0) return true
          // if (hasPermission(roles, v)) {
          //   if (v.children && v.children.length > 0) {
          //     v.children = v.children.filter(child => {
          //       if (hasPermission(roles, child)) {
          //         return child
          //       }
          //       return false
          //     })
          //     return v
          //   } else {
          //     return v
          //   }
          // }
          // return false
        })
        // console.log('accessedRoutersaccessedRouters', accessedRouters)

        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permissionRouters
