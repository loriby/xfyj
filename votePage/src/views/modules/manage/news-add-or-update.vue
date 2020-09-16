<template>
  <div class="mod-demo-ueditor">
    <div class="back-btn" @click="goBack">返回</div>

    <!-- <el-alert
      title="提示："
      type="warning"
      :closable="false">
      <div slot-scope="description">
        <p class="el-alert__description">1. 此Demo只提供UEditor官方使用文档，入门部署和体验功能。具体使用请参考：http://fex.baidu.com/ueditor/</p>
        <p class="el-alert__description">2. 浏览器控制台报错“请求后台配置项http错误，上传功能将不能正常使用！”，此错需要后台提供上传接口方法（赋值给serverUrl属性）</p>
      </div>
    </el-alert>-->

    <el-form
      ref="dataForm"
      :rules="rules"
      label-position="left"
      label-width="80px"
      :model="dataForm"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="新闻标题" prop="title">
            <el-input v-model="dataForm.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作者姓名" prop="name">
            <el-input v-model="dataForm.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="新闻图片" prop="imgs">
        <el-upload
          class="avatar-uploader"
          :action="this.$http.adornUrl('/proxyApi/upload.php')"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="dataForm.imgs" :src="this.$httpUrl+dataForm.imgs" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <script :id="ueId" class="ueditor-box" type="text/plain" style="width: 100%; height: 260px;">
  {{ueContent}}
    </script>

    <!-- 获取内容 -->
    <p>
      <el-button @click="dataFormSubmit()">保存</el-button>
    </p>
  </div>
</template>

<script>
import ueditor from 'ueditor'
export default {
  data () {
    return {
      ue: null,
      ueId: `J_ueditorBox_${new Date().getTime()}`,
      ueContent: '',
      dialogVisible: false,
      dataForm: {
        id: this.$route.query.id ? Number(this.$route.query.id) : 0,
        title: '',
        name: '',
        imgs: ''
      },

      rules: {
        title: [{
          required: true,
          message: '请输入新闻标题',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入作者姓名',
          trigger: 'blur'
        }],
        imgs: [{
          required: true,
          message: '请上传图片',
          trigger: 'change'
        }]
      }
    }
  },
  mounted () {
    this.ue = ueditor.getEditor(this.ueId, {
      serverUrl: 'http://210.16.188.29:8081', // 服务器统一请求接口路径
      zIndex: 3000
    })
  },
  methods: {
    getContent () {
      this.dialogVisible = true
      this.ue.ready(() => {
        this.ueContent = this.ue.getContent()
      })
    },

    // 获取详情
    getDetail () {
      this.$http({
        url: this.$http.adornUrl('proxyApi/detail.php?act=news'),
        method: 'get',
        params: this.$http.adornParams({
          id: this.dataForm.id
        })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          let dataHadnle = data && data.list
          this.dataForm.title = dataHadnle.title
          this.dataForm.name = dataHadnle.author_name
          this.dataForm.imgs = dataHadnle.imgs
          this.ueContent = dataHadnle.content
          this.ue.ready(() => {
            this.ue.setContent(dataHadnle.content)
          })
        } else { }
      })
    },

    // 提交数据
    dataFormSubmit () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`proxyApi/news.php?act=${!this.dataForm.id ? 'add' : 'update'}`),
            method: 'post',
            data: {
              ...this.dataForm,
              content: this.ue.getContent()
            }
          }).then(({ data }) => {
            if (data && data.code === 200) {
              this.$message.success(data.msg)
              history.go(-1)
            } else {
              this.$message.error(data.msg || '操作失败！')
            }
          })
        }
      })
    },

    handleAvatarSuccess (res, file) {
      if (res.code === 200) {
        this.dataForm.imgs = res.url
      }
    },

    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    goBack () {
      history.go(-1)
    }
  },
  created () {
    if (this.dataForm.id) {
      this.getDetail()
    }
  }
}
</script>

<style  lang="scss" scoped>
.mod-demo-ueditor {
  position: relative;
  z-index: 510;
  > .el-alert {
    margin-bottom: 10px;
  }
}

.back-btn {
  cursor: pointer;
  margin-bottom: 40px;
}

/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
