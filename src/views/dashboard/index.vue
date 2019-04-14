<template>
  <div class="dashboard-container">
    <div class="dashboard-text">当前登录机构:{{ userInfo.companyName }}</div>
    <div class="dashboard-text">当前登录用户:{{ userInfo.phone }}</div>
    <!-- <el-button type="primary" @click="linkToConfig">微信配置</el-button> -->
    <!-- <p v-if="canAdd">
    </p> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'userInfo'
    ])
  },
  created() {
  },
  methods: {
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
