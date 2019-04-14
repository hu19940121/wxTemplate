const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  isLogin: state => state.user.isLogin,
  wxConfig: state => state.push.wxConfig,
  routers: state => state.permissionRouters.routers,
  addRouters: state => state.permissionRouters.addRouters
}
export default getters
