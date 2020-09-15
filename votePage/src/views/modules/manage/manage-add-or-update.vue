<template>
  <div class="opr-content">
    <el-dialog
      :lock-scroll="true"
      :title="!dataForm.id ? '新增1' : '编辑'"
      :close-on-click-modal="false"
      :visible.sync="visible"
      @close="getCloseDataForm"
    >
      <el-form
        :model="dataForm"
        :rules="dataRule"
        label-position="left"
        ref="dataForm"
        @keyup.enter.native="dataFormSubmit()"
        label-width="90px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="作者姓名" prop="name">
              <el-input clearable v-model="dataForm.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作品分类" prop="category_py">
              <el-select @change="handleChange" v-model="dataForm.category_py" placeholder="请选择">
                <el-option
                  v-for="item in goodsHouse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="作品编号" prop="shelfName">
              <el-input clearable v-model="dataForm.shelfName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="区域选择" prop="area">
              <el-select v-model="dataForm.area" placeholder="请选择">
                <el-option
                  v-for="item in areaArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创作年代" prop="years">
              <el-input @input="shelfCodeHadnle" v-model="dataForm.years"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作品尺寸" prop="size">
              <el-input @input="shelfCodeHadnle" v-model="dataForm.size"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作品材质" prop="texture">
              <el-input @input="shelfCodeHadnle" v-model="dataForm.texture"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作品题材" prop="theme">
              <el-input @input="shelfCodeHadnle" v-model="dataForm.theme"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="作品描述" prop="discribe">
              <el-input type="textarea" v-model="dataForm.discribe"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传作品" prop="imageUrl">
              <el-upload
                class="avatar-uploader"
                :action="this.$http.adornUrl('/proxyApi/upload.php')"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="getCloseDataForm()">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      areaArr: [
        { label: '东城区', value: '东城区' },
        { label: '西城区', value: '西城区' },
        { label: '海淀区', value: '海淀区' },
        { label: '朝阳区', value: '朝阳区' },
        { label: '丰台区', value: '丰台区' },
        { label: '门头沟区', value: '门头沟区' },
        { label: '石景山区', value: '石景山区' },
        { label: '房山区', value: '房山区' },
        { label: '通州区', value: '通州区' },
        { label: '顺义区', value: '顺义区' },
        { label: '昌平区', value: '昌平区' },
        { label: '大兴区', value: '大兴区' },
        { label: '怀柔区', value: '怀柔区' },
        { label: '平谷区', value: '平谷区' },
        { label: '延庆区', value: '延庆区' },
        { label: '密云区', value: '密云区' }
      ],
      selectedOptions: [],
      tableData: [],
      goodsHouse: [
        { label: '书法', value: 'shufa' },
        { label: '绘画', value: 'huihua' },
        { label: '摄影', value: 'sheying' }
      ],
      wareCode: 0, // 货架编码开头字母
      imageUrl: '',
      dataForm: {
        id: 0,
        name: '', // 名字
        category: '', // 作品分类
        area: '', // 区域
        years: '', // 创作年代
        size: '', // 作品尺寸
        texture: '', // 作品材质
        theme: '', // 作品题材
        discribe: '', // 作品描述
        imgs: '',
        category_py: '' // 分类拼音
      },
      dataRule: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        area: [{ required: true, message: '请选择区域', trigger: 'change' }],
        category_py: [{ required: true, message: '请选择分类', trigger: 'change' }]
      }
    }
  },
  created () {
  },
  methods: {
    init (id, row) {
      console.log(row)
      this.dataForm.id = id || 0
      this.visible = true
      if (id) {
        this.dataForm = row
        this.dataForm.name = row.author_name
      }
    },
    getCloseDataForm () {
      this.visible = false
      this.imageUrl = ''
      this.$refs['dataForm'].resetFields()
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          let url = ''
          if (!this.dataForm.id) {
            url = this.$http.adornUrl('/proxyApi/save.php?act=add')
          } else {
            url = this.$http.adornUrl('/proxyApi/save.php?act=updata')
          }
          this.$http({
            url: url,
            method: 'post',
            // headers: {
            //   'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
            // },
            data: this.dataForm
            // params: this.$http.adornParams(this.dataForm)
          }).then(({ data }) => {
            if (data && data.code === 200) {
              this.getCloseDataForm()
              this.$refs['dataForm'].resetFields()
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    },

    // 分类选择
    handleChange (val) {
      this.goodsHouse.forEach(item => {
        if (item.value === val) {
          this.dataForm.category = item.label
        }
      })
    },

    // 编码操作
    shelfCodeHadnle (val) {
      let regStr = val.substring(0, 2)
      if (this.wareCode !== regStr) {
        this.dataForm.shelfCode = this.wareCode
      }
    },

    handleAvatarSuccess (res, file) {
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.opr-content .el-dialog {
  width: 649px !important;
  margin-top: 13vh !important;
  // height: 560px;
}
/deep/.opr-content .el-dialog__body {
  padding: 30px;
  padding-bottom: 0;
}

/deep/.opr-content input {
  width: 191px;
  height: 32px !important;
  border: 1px solid #dcdfe6;
}

/deep/.opr-content .el-select {
  width: 191px;
}

/deep/.opr-content .el-form-item__label {
  font-size: 12px;
}

/deep/.opr-content .el-dialog__header {
  height: 38px;
  line-height: 1px;
  padding-left: 20px;
  background: #17b3a3;
}

/deep/.opr-content .el-dialog__title {
  font-size: 14px;
  line-height: 1px;
  color: #ffffff;
}

/deep/.opr-content .el-dialog__headerbtn {
  top: 10px;
}

/deep/.opr-content .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}

/deep/.opr-content .password .el-input--suffix {
  width: 170px;
}

/deep/.opr-content .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.opr-content .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.opr-content .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.opr-content .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
