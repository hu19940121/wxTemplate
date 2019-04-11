<template>
  <div class="dashboard-container">
    <div class="dashboard-text">当前登录机构:{{ userInfo.companyName }}</div>
    <div class="dashboard-text">当前登录用户:{{ userInfo.phone }}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'userInfo'
    ])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('GetInfo')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    padding: 20px;
    margin: 30px;
    min-height: 500px;
    background: url('./images/welcome.jpg') no-repeat;
    background-size: cover;
    background-position: center;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
