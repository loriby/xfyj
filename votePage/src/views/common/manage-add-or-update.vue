<template>
  <div class="opr-content">
    <el-dialog
      :title="!dataForm.id ? '新增' : '编辑'"
      :close-on-click-modal="false"
      :visible.sync="visible"
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
            <el-form-item label="作者姓名" prop="shelfName">
              <el-input clearable v-model="dataForm.shelfName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作品编号" prop="shelfName">
              <el-input clearable v-model="dataForm.shelfName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作品分类" prop="wareId">
              <el-select @change="wareChange" v-model="dataForm.wareId" placeholder="请选择">
                <el-option
                  v-for="item in goodsHouse"
                  :key="item.wareId"
                  :label="item.wareName"
                  :value="item.wareId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="区域选择" prop="wareId">
              <el-cascader
                size="large"
                :options="options_"
                v-model="selectedOptions"
                @change="handleChange"
                placeholder="请选择区域"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="创作年代" prop="shelfCode">
              <el-input @input="shelfCodeHadnle" v-model="dataForm.shelfCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作品尺寸" prop="shelfCode">
              <el-input @input="shelfCodeHadnle" v-model="dataForm.shelfCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作品材质" prop="shelfCode">
              <el-input @input="shelfCodeHadnle" v-model="dataForm.shelfCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作品题材" prop="shelfCode">
              <el-input @input="shelfCodeHadnle" v-model="dataForm.shelfCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="作品描述" prop="desc">
              <el-input type="textarea" v-model="dataForm.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="上传作品" prop="shelfCode">
              <el-upload
                class="avatar-uploader"
                action="http://xriml.com/shortvideo/upload.php"
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
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
export default {
  data () {
    var validateShelfCode = (rule, value, callback) => {
      if (value.length > 2) {
        let regStr = value.substring(0, 2)
        if (regStr !== this.wareCode) {
          callback(new Error('货架编码格式错误'))
        } else {
          callback()
        }
      } else {
        callback(new Error('货架编码格式错误'))
        this.dataForm.shelfCode = this.wareCode
      }
    }

    var validateMaxShelfNum = (rule, value, callback) => {
      console.log(value)
      if (/^[0-9]+$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正整数'))
      }
    }

    return {
      visible: false,
      options_: regionData,
      selectedOptions: [],
      tableData: [],
      goodsHouse: [],
      wareCode: 0, // 货架编码开头字母
      imageUrl: '',
      dataForm: {
        id: 0,
        shelfName: '', // 货架名字
        shelfCode: '', // 货架编码
        status: '', // 状态 1可用2禁用
        maxShelfNum: '', // 最大货架数量
        wareId: '', // 仓库Id
        desc: '' // 作品描述
      },
      dataRule: {
        shelfName: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        wareId: [{ required: true, message: '请选择仓库', trigger: 'blur' }],
        shelfCode: [{ required: true, validator: validateShelfCode, trigger: 'blur' }],
        status: [{ required: true, message: '请选择货架状态', trigger: 'change' }],
        maxShelfNum: [{ required: true, validator: validateMaxShelfNum, trigger: 'blur' }]
      }
    }
  },
  created () { },
  methods: {
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      new Promise((resolve, reject) => {
        resolve(
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        )
      }).then(() => {
        if (this.dataForm.id) {

        }
      })
    },

    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const params = {
            url: `/ware/shelf/${!this.dataForm.id ? 'save' : 'update'}`,
            data: {
              ...this.dataForm
            },
            isLoading: true,
            callback: res => {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            },
            errcallback: msg => { }
          }
          this.$https.sendRequest(params)
        }
      })
    },

    // 日期选择
    handleChange (rst) {
      console.log(rst)
    },

    // 仓库选择
    wareChange (res) {
      this.goodsHouse.forEach(item => {
        if (item.wareId === res) {
          this.wareCode = item.wareCode + '-'
          this.dataForm.shelfCode = item.wareCode + '-'
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
