<template>
  <div class="mod-home">
    <headerHtml></headerHtml>
    <div class="nav-box">
      <el-tabs class="tabs-body" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane flag="newsFlag" label="新闻动态" name="first">新闻动态</el-tab-pane>
        <el-tab-pane flag="activityFlag" label="活动详情" name="second">活动详情</el-tab-pane>
        <el-tab-pane flag="ruleFlag" label="投票规则" name="third">投票规则</el-tab-pane>
        <el-tab-pane flag="opusFlag" label="作品" name="fourth">作品</el-tab-pane>
      </el-tabs>
      <el-row v-if="activeName == 'fourth'">
        <el-col :span="24">
          <div style="text-align: center;" class="grid-content">
            <el-input
              @blur="searchByName()"
              @keyup.enter.native="searchByName()"
              class="search-box"
              prefix-icon="el-icon-search"
              v-model="input"
              placeholder="请输入作品名称或者作者姓名"
            ></el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 内容panls区 -->
    <div class="content-box">
      <div v-if="newsFlag" class="news-content">
        <div class>
          <div class="graTit">
            <span class="graTitBox">
              <b>新闻动态</b>
              <br />
            </span>
          </div>
        </div>
        <div class="item-content">
          <el-row v-for="(item,index) in newsArry" :key="index" class="news-item" :gutter="20">
            <el-col :span="4">
              <div @click="newsDetail(item.id)" class="grid-content">
                <img :src="$httpUrl+item.imgs" alt />
              </div>
            </el-col>
            <el-col :span="20">
              <div @click="newsDetail(item.id)" class="grid-content">
                <h5>{{item.title}}</h5>
                <div class="word-content-view" style="height: 50px;overflow: hidden;" v-html="item.content" />
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div v-if="newsDetailFlag" class="news-detail-content">
        <div class>
          <div class="graTit">
            <span class="graTitBox">
              <b>相关新闻</b>
              <br />
            </span>
          </div>
        </div>
        <div class="nav-bar">
          <span @click="goBack('newsFlag','newsDetailFlag')">新闻动态</span>
          >
          <span>正文</span>
        </div>
        <div class="item-content">
          <h1 class>{{dataForm.title}}</h1>
          <div class="info">
            <div>
              <span class="time">{{dataForm.create_time}}</span>
            </div>
          </div>
          <div class="detail" style="font-size: 18px;">
            <p style="text-align: center;">
              <img alt :src="$httpUrl+dataForm.imgs" />
            </p>
            <div v-html="dataForm.ueContent" />
          </div>
        </div>
      </div>
      <div v-if="activityFlag" class="activity-content">
        <div class>
          <div class="graTit">
            <span class="graTitBox">
              <b>活动详情</b>
              <br />
            </span>
          </div>
        </div>
        <div class="item-content">
          <eventDetailsHtml></eventDetailsHtml>
        </div>
      </div>

      <div v-if="ruleFlag" class="rule-content">
        <div class>
          <div class="graTit">
            <span class="graTitBox">
              <b>投票规则</b>
              <br />
            </span>
          </div>
        </div>
        <div class="item-content">
          <ruleHtml></ruleHtml>
        </div>
      </div>
      <div v-if="opusFlag" class="opus-content">
        <div class>
          <div class="graTit">
            <span class="graTitBox">
              <b>作品</b>
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
        <div class="item-content" v-loading="dataListLoading">
          <el-row :gutter="20">
            <el-col :span="8" v-for="(item, index) in worksList" :key="index">
              <el-card :body-style="{ padding: '0px' }">
                <a class="picCon" href="javascript:;">
                  <img
                    @click="goDetail(item.id,item.category_py)"
                    class="image"
                    :src="$httpUrl+item.imgs"
                    alt
                  />
                </a>
                <div style="padding: 14px;position: relative;">
                  <span @click="goDetail(item.id,item.category_py)" class="title">
                    {{item.category+item.id}}
                    <i>{{item.area + '-' +item.author_name}}</i>
                  </span>
                  <div class="bottom clearfix">
                    <time class="time">{{item.discribe?item.discribe.substring(0,20)+'...':'-'}}</time>
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
import ruleHtml from './rule.vue'
import eventDetailsHtml from './eventDetails.vue'
import headerHtml from './header'
export default {
  data () {
    return {
      input: '',
      activeName: this.$route.query.active ? this.$route.query.active : 'first',
      newsDetailFlag: false,
      dataListLoading: false,
      newsFlag: true,
      activityFlag: false,
      ruleFlag: false,
      opusFlag: false,
      pageObj: {
        pageIndex: 1,
        pageSize: 9,
        totalPage: 0
      },
      worksList: [],
      newsArry: [],
      flagArry: ['newsFlag', 'activityFlag', 'ruleFlag', 'opusFlag'],
      opusArry: [
        { name: '全部', id: '', type: '', isActive: true },
        { name: '书法', id: '', type: 'shufa', isActive: false },
        { name: '绘画', id: '', type: 'huihua', isActive: false },
        { name: '摄影', id: '', type: 'sheying', isActive: false }
      ],

      dataForm: {
        title: '',
        name: '',
        imgs: '',
        ueContent: '',
        create_time: ''
      }
    }
  },
  components: {
    ruleHtml,
    eventDetailsHtml,
    headerHtml
  },
  created () {
    if (this.$route.query.active === 'fourth') {
      this.flagArry.forEach(item => {
        if (item === 'opusFlag') {
          this[item] = true
          this.getWorksList()
        } else {
          this[item] = false
        }
      })
    }
    this.getDataList()
  },
  methods: {
    // tabs切换
    handleClick (tab, event) {
      this.newsDetailFlag = false
      this.flagArry.forEach(item => {
        if (tab.$attrs.flag === item) {
          this[item] = true
          if (item === 'opusFlag') {
            this.getWorksList()
          }
        } else {
          this[item] = false
        }
      })
    },
    // 条件查询
    searchByName () {
      if (!this.input) {
        this.getWorksList()
        return
      }
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('proxyApi/getList.php?act=search'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageObj.pageIndex,
          'limit': this.pageObj.pageSize,
          'key': this.input
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

    // 无条件查询
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
    // 查看作品详情
    goDetail (id, type) {
      this.$router.push({ name: 'detail', query: { active: true, path: 'home', id: id, type: type } })
    },

    // 新闻列表查询
    getDataList () {
      this.$http({
        url: this.$http.adornUrl('proxyApi/getList.php?act=news'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 20
        })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.newsArry = data.info.list
        } else {
          this.newsArry = []
        }
      })
    },

    // 详情后返回对应页面
    goBack (backFlag, NowFlag) {
      this.flagArry.forEach(item => {
        if (backFlag === item) {
          this[item] = true
        } else {
          this[item] = false
        }
      })
      this[NowFlag] = false
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

    // 获取新闻详情
    newsDetail (id) {
      this.flagArry.forEach(item => {
        this[item] = false
      })
      this.newsDetailFlag = true
      this.$http({
        url: this.$http.adornUrl('proxyApi/detail.php?act=news'),
        method: 'get',
        params: this.$http.adornParams({
          id: id
        })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          let dataHadnle = data && data.list
          this.dataForm.title = dataHadnle.title
          this.dataForm.name = dataHadnle.author_name
          this.dataForm.imgs = dataHadnle.imgs
          this.dataForm.ueContent = dataHadnle.content
          this.dataForm.create_time = dataHadnle.create_time
        } else { }
      })
    },

    // 根据分类查询
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
  height: 400px;
  // opacity: 0.75;
  margin: 0;
}

h3.small img {
  /* height: 100%; */
  width: 100%;
  height: 100%;
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
  background: #FDF9F1;
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
.nav-box {
  background: #C20E23;
  // height: 143px;
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
  cursor: pointer;
}

.content-box {
  width: 980px;
  margin: 0 auto;
  min-height: 147px;
  padding-top: 82px;
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
  padding: 20px 90px 90px;
  background: #fff;
}
.rule-content .item-content p,
.activity-content .item-content p {
  color: #333333;
}

.el-col-5 {
  width: 20%;
  margin-bottom: 20px;
}
.grid-content {
  padding-bottom: 20px;
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
  background: #C20E23;
  border: 1px solid #C20E23;
}

.el-col-8 {
  margin-bottom: 20px;
}

.time {
  color: #999;
  font-size: 12px;
  line-height: 18px;
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
.grid-content h5 {
  font-size: 14px;
  line-height: 30px;
}
.grid-content img {
  width: 140px;
  height: 130px;
}
.title {
  cursor: pointer;
  i {
    font-style: normal;
    float: right;
    font-size: 14px;
    color: #666666;
  }
}
.title:hover {
  text-decoration: underline;
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

.news-detail-content h1 {
  padding: 68px 0px 40px;
  font-family: "微软雅黑", "宋体";
  font-size: 24px;
  line-height: 30px;
  font-weight: normal;
  text-align: center;
}

.news-detail-content em {
  font-style: normal;
  font-weight: normal;
  color: #999999;
  font-size: 12px;
  line-height: 24px;
}

.news-detail-content .time {
  color: #999999;
  margin-right: 30px;
  font-size: 12px;
  line-height: 24px;
}
.news-detail-content .item-content {
  padding: 0 140px 20px;
}

.news-detail-content .info {
  padding-bottom: 10px;
  border-bottom: 1px solid #f4f4f4;
}

.news-detail-content .detail img {
  max-width: 700px;
  // width: auto;
  overflow: hidden;
}

.news-detail-content .detail p {
  margin-bottom: 30px;
  line-height: 30px;
  color: #333333;
  font-size: 18px;
}
.news-item {
  cursor: pointer;
}
.bg-purple img {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  margin-top: 20px;
}
.bg-purple a {
  text-decoration: none;
}
.bg-purple span {
  display: block;
  color: #666666;
  font-style: normal;
  font-size: 18px;
}
.yun-box {
  margin-top: 20px;
  margin-bottom: 0px;
}

.is-active-type {
  color: #fff;
  background: #C20E23;
  border: 1px solid #C20E23;
}
.word-content-view{
  p{
    display: none;
    padding: 0;
    margin: 0;
  }
  p.first-view-text{
    display:block;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>

