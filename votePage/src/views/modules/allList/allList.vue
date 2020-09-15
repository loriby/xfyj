<template>
  <div class="mod-home">
    <!-- <headerHtml></headerHtml> -->
    <div class="top-box">
      <el-row>
        <el-col :span="24">
          <div style="text-align: center;" class="grid-content">
            <el-input
              class="search-box"
              prefix-icon="el-icon-search"
              v-model="input"
              placeholder="请输入作品名称或者作者姓名"
            ></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="nav-bar">
      <span @click="goBack">返回</span>
      >
      <span v-if="$route.query.showFlag == 2">云展览</span>
      <span v-else>云评选</span>
    </div>
    <!-- 内容panls区 -->
    <div class="content-box">
      <div class="opus-content">
        <div class>
          <div class="graTit">
            <span class="graTitBox">
              <b>作品分类</b>
              <br />
            </span>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col v-for="(item, index) in opusArry" :key="index" :span="5">
            <div class="grid-content">
              <el-button
                :class="item.isActive?'is-active-type':''"
                @click="typeSearch(item.type)"
              >{{item.name}}</el-button>
            </div>
          </el-col>
        </el-row>
        <div class="item-content">
          <el-row :gutter="20" v-loading="dataListLoading">
            <el-col :span="8" v-for="(item, index) in worksList" :key="index">
              <el-card :body-style="{ padding: '0px' }">
                <a class="picCon" href="javascript:;">
                  <img
                    @click="goDetail($route.query.showFlag,item.id,item.category_py)"
                    class="image"
                    :src="$httpUrl+item.imgs"
                    alt
                  />
                </a>
                <div style="padding: 14px;position: relative;">
                  <span
                    @click="goDetail($route.query.showFlag,item.id,item.category_py)"
                    class="title"
                  >{{item.category+item.id}}</span>
                  <span
                    v-if="$route.query.showFlag == 2"
                    class="miaoshu"
                  >{{item.area + '-' +item.author_name}}</span>

                  <div class="bottom clearfix">
                    <time
                      class="time"
                      v-if="$route.query.showFlag == 2"
                    >{{item.discribe.substring(0,20)+'...'}}</time>
                    <time class="time" v-else>{{item.area + '-' +item.author_name}}</time>
                  </div>

                  <div v-if="$route.query.showFlag == 1" class="ticket-opr">
                    <div class="ticket-opr-item">
                      <el-button @click="handleClick(item.id)" :disabled="false" size="mini">投 票</el-button>
                      <span>{{item.vote_count}}票</span>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageObj.pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageObj.pageSize"
            :total="pageObj.totalPage"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerHtml from '@/views/common/header.vue'
export default {
  data () {
    return {
      input: '',
      dataListLoading: false,
      worksList: [],
      pageObj: {
        pageIndex: 1,
        pageSize: 9,
        totalPage: 0
      },
      opusArry: [
        { name: '全部', id: '', type: '', isActive: true },
        { name: '书法', id: '', type: 'shufa', isActive: false },
        { name: '绘画', id: '', type: 'huihua', isActive: false },
        { name: '摄影', id: '', type: 'sheying', isActive: false }
      ]
    }
  },
  components: {
    headerHtml
  },
  mounted () {
    this.getWorksList()
  },
  methods: {
    goDetail (flag, id, type) {
      this.$router.push({
        name: 'detail',
        query: {
          path: 'allList',
          showFlag: flag,
          id: id,
          type: type
        }
      })
    },
    goBack () {
      this.$router.push({ name: 'home' })
    },
    handleClick (id) {
      this.sendVote(id)
    },
    sendVote (id) {
      this.$http({
        url: this.$http.adornUrl('/proxyApi/vote.php'),
        method: 'post',
        // data: {'id': id}
        params: this.$http.adornParams({ 'id': id })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.$message({
            message: '投票成功',
            type: 'success'
          })
          this.viewsCount = data.info.viewsCount
          this.voteCount = data.info.voteCount
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    getWorksList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('proxyApi/getList.php?act=tp'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageObj.pageIndex,
          'limit': this.pageObj.pageSize
        })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.worksList = data.info.list
          this.pageObj.totalPage = data.info.total
        } else {
          this.worksList = []
          this.pageObj.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    typeSearch (type) {
      this.opusArry.forEach(item => {
        if (item.type === type) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
      if (type) {
        this.handleGetWorksList(type)
      } else {
        this.getWorksList()
      }
    },
    handleGetWorksList (type) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('proxyApi/getList.php?act=type'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageObj.pageIndex,
          'limit': this.pageObj.pageSize,
          'type': type
        })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.worksList = data.info.list
          this.pageObj.totalPage = data.info.total
        } else {
          this.worksList = []
          this.pageObj.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageObj.pageSize = val
      this.pageObj.pageIndex = 1
      this.getWorksList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageObj.pageIndex = val
      this.getWorksList()
    }
  }
}
</script>

<style lang="scss">
.mod-home {
  line-height: 1.5;
  width: 980px;
  margin: 0 auto;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 188px;
  height: 188px;
  margin: 0;
}

.el-carousel__item h3 img {
  /* height: 100%; */
  width: 100%;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.top-box {
  background: #b50103;
  padding: 10px;
}

.el-tab-pane {
  display: none;
}

.tabs-body {
  width: 980px;
  margin: 0 auto;
}
.el-tabs__nav-scroll {
  text-align: center;
}
.el-tabs__item {
  color: #fff;
  opacity: 0.5;
  font-size: 14px;
  font-weight: normal;
}

.el-tabs__nav {
  float: none;
}

.el-tabs__nav-wrap::after {
  background: #fff;
  height: 1px;
  opacity: 0.3;
}

.el-tabs__item.is-active {
  color: #fff;
  opacity: 1;
}

.el-tabs__active-bar {
  display: none;
}

.el-tabs__item:hover {
  color: #fff;
  opacity: 1;
}

.el-tabs__header {
  padding-top: 10px;
}

.search-box {
  width: 280px;
}

.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border: none;
}

.el-input--medium .el-input__inner {
  height: 30px;
  line-height: 30px;
  outline: none;
}

.el-input--medium .el-input__icon {
  line-height: 30px;
}

.content-box {
  width: 980px;
  margin: 0 auto;
  min-height: 147px;
  padding-top: 50px;
}

.graTit {
  height: 20px;
  text-align: center;
  border-bottom: 1px solid #cfcfcf;
  _overflow: hidden;
  margin-bottom: 45px;
}

.graTitBox {
  padding: 0 30px;
  background: #ffffff;
  display: inline-block;
  _position: relative;
}

.graTit b {
  line-height: 40px;
  font-size: 24px;
  color: #939393;
  font-weight: normal;
}

.item-content img {
  width: 100%;
  height: 100%;
}

.rule-content .item-content,
.activity-content .item-content {
  padding: 60px 90px 90px;
  background: #f2f2f2;
}
.rule-content .item-content p,
.activity-content .item-content p {
  color: #333333;
}

.el-col-5 {
  width: 20%;
  margin-bottom: 20px;
}

.opus-content .grid-content button {
  width: 178px;
  height: 38px;
  text-align: center;
  font-size: 16px;
}

.grid-content .el-button:focus,
.grid-content .el-button:hover {
  color: #fff;
  background: #000;
  border: 1px solid #000000;
}

.el-col-8 {
  margin-bottom: 20px;
}

.time {
  color: #999;
  font-size: 12px;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
  cursor: pointer;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.ticket-opr {
  position: absolute;
  right: 10px;
  top: 10px;
}

.ticket-opr button {
  margin-bottom: 7px;
}
.ticket-opr span {
  display: block;
  text-align: center;
}

.ticket-opr-item {
  position: relative;
}

.ticket-opr-item::after {
  content: "";
  position: absolute;
  width: 1px;
  background: #f2f2f2;
  top: 0;
  bottom: 0;
  left: -10px;
}

.ticket-opr .el-button:focus,
.ticket-opr .el-button:hover {
  color: #606266;
  background: #fff;
  border: 1px solid #dcdfe6;
}

.ticket-opr .el-button.is-disabled,
.ticket-opr .el-button.is-disabled:focus,
.ticket-opr .el-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}

.yun-box .grid-content {
  text-align: center;
  line-height: 36px;
  cursor: pointer;
}

.title {
  font-size: 16px;
  cursor: pointer;
}
.title:hover {
  text-decoration: underline;
}

.miaoshu {
  font-size: 12px;
  color: #999;
  float: right;
}

.nav-bar {
  color: #999999;
  font-size: 12px;
  line-height: 34px;
  text-align: center;
}

.nav-bar span {
  padding: 0 10px;
  cursor: pointer;
}

.nav-bar span:last-child {
  cursor: default;
}

.nav-bar span:last-child:hover {
  color: #999999;
}
.nav-bar span:hover {
  color: #000;
}

.is-active-type {
  color: #fff;
  background: #000;
  border: 1px solid #000000;
}
</style>

