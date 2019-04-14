<template>
  <div class="app-container">
    <!-- <el-alert
      title="成功提示的文案"
      type="success">
    </el-alert> -->
    <el-row>
      <!--eslint-disable-next-line no-irregular-whitespace -->
       <el-col :xs="24" :md="14" :lg="14">
        <div class="form-wrapper">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="只推给自己" prop="touser">
              <el-input v-model="form.touser"/>
            </el-form-item>
            <el-form-item class="diplayflex" label="模板ID" prop="templateId">
              <el-input v-model="form.templateId" style="width:200px" />
              <el-tooltip class="item" effect="dark" content="微信后台查看" placement="top-end">
                <i style="margin-left:20px;margin-right:10px;" class="el-icon-question"/>
              </el-tooltip>
              <!--eslint-disable-next-line vue/no-parsing-error -->
              <a target="_blank" href="https://mp.weixin.qq.com/advanced/tmplmsg?action=list&t=tmplmsg/list&token=1993711445&lang=zh_CN">前往选择模板</a>

            </el-form-item>
            <el-form-item label="first" prop="first" class="diplayflex">
              <el-input v-elInputColor="form.firstColor" v-model="form.first" class="selfInput"/>
              <el-color-picker v-model="form.firstColor" class="marginLeft10" size="mini"/>
            </el-form-item>
            <el-form-item label="keyword1" prop="keyword1" class="diplayflex">
              <el-input v-elInputColor="keyword1Color" v-model="form.keyword1" :style="'color:' + keyword1Color" class="selfInput" type="textarea"/>
              <el-color-picker v-model="keyword1Color" class="marginLeft10" size="mini"/>
            </el-form-item>
            <el-form-item label="keyword2" prop="keyword2" class="diplayflex">
              <el-input v-elInputColor="keyword2Color" v-model="form.keyword2" class="selfInput" type="textarea"/>
              <el-color-picker v-model="keyword2Color" class="marginLeft10" size="mini"/>
            </el-form-item>
            <el-form-item label="keyword3" prop="keyword3" class="diplayflex">
              <el-input v-elInputColor="keyword3Color" v-model="form.keyword3" class="selfInput" type="textarea"/>
              <el-color-picker v-model="keyword3Color" class="marginLeft10" size="mini"/>
            </el-form-item>
            <el-form-item label="keyword4" prop="keyword4" class="diplayflex">
              <el-input v-elInputColor="keyword4Color" v-model="form.keyword4" class="selfInput" type="textarea"/>
              <el-color-picker v-model="keyword4Color" class="marginLeft10" size="mini"/>
            </el-form-item>
            <el-form-item label="remark" prop="remark" class="diplayflex">
              <el-input v-elInputColor="form.remarkColor" v-model="form.remark" class="selfInput" type="textarea"/>
              <el-color-picker v-model="form.remarkColor" class="marginLeft10" size="mini"/>
            </el-form-item>
            <el-form-item label="url" prop="url">
              <el-input v-model="form.url"/>
            </el-form-item>
            <el-form-item label="推送方式" prop="range">
              <el-radio-group v-model="form.range" >
                <el-radio :label="1">个人</el-radio>
                <el-radio :label="2">所有</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button :disabled="btn" :loading="sendLoading" type="primary" @click="onSubmit('form')">推送</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { rules } from './rules.js'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      btn: false,
      sendLoading: false,
      rules,
      form: {
        touser: '',
        firstColor: '#409EFF',
        templateId: '-p6uQnR-dM_1h-6WQoMngg99Jn-31K_tdoEslQ8A-Ys',
        first: '',
        keyword1: '',
        keyword2: '',
        keyword3: '',
        keyword4: '',
        remark: '',
        url: '',
        remarkColor: '#409EFF',
        range: 1 // 1 个人 2所有
      },
      keyword1Color: '#409EFF',
      keyword2Color: '#409EFF',
      keyword3Color: '#409EFF',
      keyword4Color: '#409EFF',
      notifyTipStyle: 'display:inline-block;height:18px;width:18px;background:#409EFF;text-align:center;line-height:18px;color:white;'

    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.form.touser = this.userInfo.openId
    this.tip()
  },

  methods: {
    ...mapActions(['sendMeg']),
    tip() {
      this.$notify({
        title: '提示',
        offset: 60,
        dangerouslyUseHTMLString: true,
        message: `<div>输入框内字体颜色即为模板字体颜色,点击<span style=${this.notifyTipStyle}><i class="el-icon-arrow-down"></i></span>选择颜色</div>`
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.sendLoading = true
          const { firstColor, keyword1, keyword2, keyword3, templateId, first, remark, url, touser, keyword4, remarkColor } = this.form
          const { keyword1Color, keyword2Color, keyword3Color, keyword4Color } = this
          // const keywords = [keyword1, keyword2, keyword3, keyword4]
          const keywords = [
            {
              keyword: keyword1,
              color: keyword1Color
            }, {
              keyword: keyword2,
              color: keyword2Color
            }, {
              keyword: keyword3,
              color: keyword3Color
            }, {
              keyword: keyword4,
              color: keyword4Color
            }
          ]

          const params = {
            keywords,
            templateId,
            first,
            remark,
            url,
            touser,
            remarkColor,
            firstColor
          }
          console.log('params', params)
          // return
          this.sendMeg(params).then(res => {
            this.btn = true
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

<style scoped>
.selfInput{
  width: 80%;
}
.marginLeft10{
  margin-left :10px;
}
.line{
  text-align: center;
}
.form-wrapper{
  margin-left:2%;
  width: 100%;
}
</style>

