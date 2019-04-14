<template>
  <div class="app-container userList">
    <el-row>
      <!--eslint-disable-next-line no-irregular-whitespace -->
       <el-col :xs="24" :md="14" :lg="14">
        <el-button type="primary" @click="dialogVisible = true">新增机构</el-button>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="phone"
            label="手机号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="openid"
            label="openid"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="handleClick(scope.row)" >查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
import { mapActions } from 'vuex'
import { rules } from './rules.js'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      rules,
      dialogVisible: false,
      form: {
      },
      tableData: [
        {
          phone: 'mockdata',
          openid: '1212'
        }
      ]
    }
  },
  methods: {
    ...mapActions(['addUser']),
    handleClick() {

    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addUser(this.form).then(res => {
            console.log('res', res)
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
