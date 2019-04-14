<template>
  <div class="dashboard-container">
    <div class="dashboard-text">当前登录机构:{{ userInfo.companyName }}</div>
    <div class="dashboard-text">当前登录用户:{{ userInfo.phone }}</div>
    <!-- <el-button type="primary" @click="linkToConfig">微信配置</el-button> -->
    <p v-if="canAdd">
      <el-button type="primary" @click="dialogVisible = true">新增机构</el-button>
    </p>

    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      title="新增机构"
      @close="colseDialog">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="机构名" prop="companyName">
          <el-input v-model="form.companyName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="openId" prop="openId">
          <el-input v-model="form.openId" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="appId" prop="appId">
          <el-input v-model="form.appId" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { rules } from './rules.js'
import { Message } from 'element-ui'

export default {
  name: 'Dashboard',
  data() {
    return {
      rules,
      dialogVisible: false,
      form: {

      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'userInfo'
    ]),
    canAdd() {
      return this.userInfo.phone === '15313855386' || this.userInfo.phone === '15658163361'
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['addUser']),
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUser(this.form).then(res => {
            Message({
              message: res.msg,
              type: 'success',
              duration: 1 * 1000
            })
            this.dialogVisible = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    colseDialog() {
      this.$refs.form.resetFields()
    },
    getUserInfo() {
      this.$store.dispatch('GetInfo')
    },
    linkToConfig() {
      this.$router.push({
        path: '/weixinConfig'
      })
    },
    linkToUserList() {
      this.$router.push({
        path: '/user/userList'
      })
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
