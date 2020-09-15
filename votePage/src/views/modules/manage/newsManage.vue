<template>
  <div>
    <div v-if="!routerViewFlag" class="mod-role">
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
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
        </el-form-item>
      </el-form>
      <el-table :data="dataList" v-loading="dataListLoading" style="width: 100%;">
        <el-table-column prop="title" header-align="center" align="center" label="新闻标题"></el-table-column>
        <el-table-column prop="author_name" header-align="center" align="center" label="新闻作者"></el-table-column>
        <el-table-column prop="content" header-align="center" align="center" label="内容">
          <template slot-scope="scope">
            <span class="content-box" v-html="scope.row.content"></span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" header-align="center" align="center" label="创建时间"></el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="addOrUpdateHandle(scope.row.id, scope.row)"
            >修改</el-button>
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
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
        roleName: ''
      },
      routerViewFlag: false,
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  activated () {
    if (this.$route.name === 'news-ueditor') {
      this.routerViewFlag = true
    } else {
      this.routerViewFlag = false
      this.getDataList()
    }
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('proxyApi/getList.php?act=news'),
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

    // 新增 / 修改
    addOrUpdateHandle (id, row) {
      this.$router.push({
        name: 'news-ueditor',
        query: {
          id: id,
          title: row.title,
          name: row.author_name,
          content: row.content
        }
      })
    },
    // 日期选择
    handleChange (rst) {
      console.log(rst)
    },
    // 删除
    deleteHandle (id) {
      this.$confirm(`确定对作品编号 “${id}” 进行删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/proxyApi/delete.php?act=news'),
          method: 'get',
          params: this.$http.adornParams({ 'id': id })
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
.el-button--text {
  cursor: pointer;
}

.content-box {
  display: block;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
