<template>
  <div class="app-container useExplain">
    <p class="address" style="color:blue;">
      <!--eslint-disable-next-line vue/no-parsing-error -->
      <a target="_blank" href="https://mp.weixin.qq.com/advanced/tmplmsg?action=list&t=tmplmsg/list&token=1993711445&lang=zh_CN">点击前往选择模板</a>
    </p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>使用说明</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="img item">
        <p>1.前往后台模板入口</p>
        <img width="50%;" src="./iamges/01.jpg" alt="">
      </div>
      <div class="img item">
        <p>2.选择推送模板</p>
        <img width="50%;" src="./iamges/1.png" alt="">
      </div>
      <div class="img item">
        <p>3.填写推送文案</p>
        <img width="50%;" src="./iamges/2.png" alt="">
      </div>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.useExplain{
  .box-card{
    .img{
      display: block;
      margin-top:10px;
      padding :20px 0;
    }
  }
}
</style>
