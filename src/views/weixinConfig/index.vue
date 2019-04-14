<template>
  <div class="app-container wxConfig">
    <el-row>
      <el-col :xs="24" :md="14" :lg="14">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="appId" prop="appId">
            <el-input v-model="form.appId"/>
          </el-form-item>
          <el-form-item label="secret" prop="secret">
            <el-input v-model="form.secret"/>
          </el-form-item>
          <el-form-item label="backUrl">
            <el-input v-model="form.backUrl"/>
          </el-form-item>
          <el-form-item label="token">
            <el-input v-model="form.token"/>
          </el-form-item>
          <el-form-item>
            <el-button v-if="wxConfig" type="primary" @click="update('form')">更新</el-button>
            <el-button v-else type="primary" @click="submit('form')">提交</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      form: {
        appId: '',
        backUrl: '',
        secret: '',
        token: ''
      },
      rules: {
        appId: [
          { required: true, message: '请输入appId', trigger: 'blur' }
        ],
        backUrl: [
          { required: true, message: '请输入backUrl', trigger: 'blur' }
        ],
        secret: [
          { required: true, message: '请输入secret', trigger: 'blur' }
        ],
        token: [
          { required: true, message: '请输入token', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['wxConfig'])
  },
  created() {
    this.getWxConfig().then(res => {
      this.form = res.data
    })
  },
  methods: {
    ...mapActions(['addWxConfig', 'getWxConfig', 'updateWxConfig']),
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addWxConfig(this.form).then(res => {
            Message({
              message: res.msg,
              type: 'success',
              duration: 1 * 1000
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateWxConfig(this.form).then(res => {
            Message({
              message: res.msg,
              type: 'success',
              duration: 1 * 1000
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
