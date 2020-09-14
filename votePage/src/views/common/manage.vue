<template>
  <div class="mod-role">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-form-item label="区域选择" prop="wareId">
          <el-cascader
            size="large"
            :options="options_"
            v-model="selectedOptions"
            @change="handleChange"
            placeholder="请选择区域"
          ></el-cascader>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="作者姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.roleName" placeholder="作品编号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.category" placeholder="作品分类" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <!-- <el-button
          type="danger"
          @click="deleteHandle()"
          :disabled="dataListSelections.length <= 0"
        >批量删除</el-button>-->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
    >
      <el-table-column prop="id" header-align="center" align="center" label="作品编号"></el-table-column>
      <el-table-column prop="area" header-align="center" align="center" label="区域"></el-table-column>
      <el-table-column prop="author_name" header-align="center" align="center" label="作者姓名"></el-table-column>
      <el-table-column prop="category" header-align="center" align="center" label="作品分类"></el-table-column>
      <el-table-column prop="years" header-align="center" align="center" label="创作年代"></el-table-column>
      <el-table-column prop="size" header-align="center" align="center" label="作品尺寸"></el-table-column>
      <el-table-column prop="texture" header-align="center" align="center" label="作品材质"></el-table-column>
      <el-table-column prop="theme" header-align="center" align="center" label="作品题材"></el-table-column>
      <el-table-column prop="discribe" header-align="center" align="center" label="作品描述"></el-table-column>
      <el-table-column prop="discribe" header-align="center" align="center" label="图片">
        <template slot-scope="scope">
          <span class="el-button--text" @click="viewImgFun(scope.row.imgs)">查看图片</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.roleId)">查看</el-button> -->
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id, scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <el-dialog title="查看作品" :visible.sync="viewImg.popShow" :close-on-click-modal="false" width="60%">
      <div class="s-img">
          <img :src="viewImg.data" alt="">
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import AddOrUpdate from './manage-add-or-update'
export default {
  data () {
    return {
      dataForm: {
        roleName: ''
      },
      options_: regionData,
      selectedOptions: [],
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      viewImg: {
        popShow: false,
        data: ''
      },
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  activated () {
    this.getDataList()
  },
  methods: {
    // 查看图片
    viewImgFun(data) {
      this.viewImg.popShow = true
      this.viewImg.data = data
    },
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/proxyApi/getlist.php?act=tp'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize
        })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.dataList = data.info.list
          this.totalPage = data.info.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id, row) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id, row)
      })
    },
    // 日期选择
    handleChange (rst) {
      console.log(rst)
    },
    // 删除
    deleteHandle (id) {
      // var ids = id ? [id] : this.dataListSelections.map(item => {
      //   return item.roleId
      // })
      this.$confirm(`确定对作品编号 “${id}” 进行删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/proxyApi/delete.php?act=tp'),
          method: 'get',
          params: this.$http.adornParams({'id': id})
        }).then(({ data }) => {
          console.log(data)
          if (data && data.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => { })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button--text{
  cursor: pointer;
}
</style>
