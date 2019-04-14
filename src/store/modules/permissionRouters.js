const permissionRouters = {
  state: {
    routers: [
      {
        path: '/',
        component: 'Layout',
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [{
          path: 'dashboard',
          component: () => import('@/views/dashboard/index')
        }]
      }
    ]
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = routers
    }
  },
  actions: {
  }
}

export default permissionRouters
