<template>
  <div class="content">
    <div class="detail-box">
      <div class="nav-bar">
        <span @click="goBack">返回</span>
        >
        <span>作品详细</span>
      </div>
      <h1>{{worksInfo.works_name}}</h1>
      <div class="detail-img">
        <img :src="$httpUrl+worksInfo.imgs" alt />
        <!-- <div class="oprbtn-box" v-if="$route.query.showFlag == 1">
          <em>投票已结束</em>
          <span>55032票</span>
        </div>-->
      </div>
      <el-row class="user-info">
        <el-col :span="8">
          <div class="grid-content name">{{worksInfo.area}}-{{worksInfo.author_name}}</div>
        </el-col>
        <el-col :span="$route.query.showFlag == 1 ? 8 : 16">
          <div class="grid-content" style="position: relative;">
            <div class="worksInfo">
              <div class="fix">
                <span>作品编号</span>
                <strong>{{worksInfo.id}}</strong>
              </div>
              <div class="fix">
                <span>作品分类</span>
                <strong>{{worksInfo.category}}</strong>
              </div>
              <div class="fix">
                <span>创作年代</span>
                <strong>{{worksInfo.years}}</strong>
              </div>
              <div class="fix">
                <span>作品尺寸</span>
                <strong>{{worksInfo.size}}</strong>
              </div>
              <div class="fix">
                <span>作品材质</span>
                <strong>{{worksInfo.texture}}</strong>
              </div>
              <div class="fix">
                <span>题材</span>
                <strong>{{worksInfo.theme}}</strong>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8" v-if="$route.query.showFlag == 1">
          <div style="border:none" class="grid-content server toupiao-box">
            <!-- <strong>400-601-8111</strong>
            <span>服务时间</span>
            <span>周一至周五 9:00 - 17:00</span>-->
            <a class="toupiao-btn" href="javascript:;" @click="sendVote()">投票</a>
            <span class="toupiao-count">票数：{{worksInfo.vote_count}}</span>
          </div>
        </el-col>
      </el-row>

      <el-row class="zuopin-info">
        <el-col :span="24">
          <div class="grid-content">
            <div class="worksTeacher">
              <h3>作品描述</h3>
              <div class="authorTxt">{{worksInfo.discribe}}</div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="graTit">
        <span class="graTitBox">
          <b>
            同类参展作品
            Similar Works
          </b>
          <br />
        </span>
      </div>
      <div class="item-content">
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
                <span
                  @click="goDetail(item.id,item.category_py)"
                  class="title"
                >{{item.texture || '-'}}</span>
                <span
                  v-if="$route.query.showFlag == 2"
                  class="miaoshu"
                >{{item.area}}-{{item.author_name}}</span>
                <div class="bottom clearfix">
                  <time
                    class="time"
                    v-if="$route.query.showFlag == 2"
                  >{{item.discribe?item.discribe.substring(0,20)+'...':'--'}}</time>
                  <time class="time" v-else>{{item.area}}-{{item.author_name}}</time>
                </div>

                <div v-if="$route.query.showFlag == 1" class="ticket-opr">
                  <div class="ticket-opr-item">
                    <el-button @click="sendVote(item.id)" :disabled="false" size="mini">投 票</el-button>
                    <span>{{item.vote_count}} 票</span>
                  </div>
                </div>

                <!-- <div class="ticket-opr">
                  <div class="ticket-opr-item">
                    <el-button :disabled="true" size="mini">投票结束</el-button>
                    <span>42552 票</span>
                  </div>
                </div>-->
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.query.id,
      worksList: [],
      worksInfo: {
        imgs: '',
        area: '',
        author_name: '',
        id: '',
        category: '', // 分类
        years: '',
        size: '',
        texture: '', // 作品材质
        theme: '', // 题材
        vote_count: '',
        discribe: ''
      }
    }
  },
  created () {
    this.getApiDetail()
    this.getWorksList()
  },
  methods: {
    goDetail (id, type) {
      this.$router.push({ name: 'detail', query: { active: this.$route.query.active, showFlag: this.$route.query.showFlag, path: this.$route.query.path, id: id, type: type } })
      this.getApiDetail()
      this.getWorksList()
    },
    goBack () {
      this.$router.push({
        name: this.$route.query.path,
        query: {
          active: this.$route.query.active ? 'fourth' : '',
          showFlag: this.$route.query.showFlag || '',
          path: this.$route.query.path || ''
        }
      })
    },
    handleClick () {
      this.$message({
        message: '投票成功',
        type: 'success'
      })
    },
    // 获取作品详情
    getApiDetail () {
      this.$http({
        url: this.$http.adornUrl('/proxyApi/detail.php?act=tp'),
        method: 'get',
        params: this.$http.adornParams({
          id: this.$route.query.id
        })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          let res = (data && data.list) || {}
          Object.keys(res).forEach(item => {
            this.worksInfo[item] = res[item]
          })
        } else {

        }
      })
    },

    getWorksList () {
      this.$http({
        url: this.$http.adornUrl('proxyApi/getList.php?act=type'),
        method: 'get',
        params: this.$http.adornParams({
          'page': 1,
          'limit': 10,
          'type': this.$route.query.type
        })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.worksList = data.info.list
        } else {
          this.worksList = []
        }
      })
    },

    sendVote (id) {
      this.$http({
        url: this.$http.adornUrl('/proxyApi/vote.php'),
        method: 'post',
        params: this.$http.adornParams({ 'id': id || this.id })
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
    }
  }

}
</script>

<style lang="scss" scoped>
.detail-box {
  background: #dbdbdb;
  width: 980px;
  margin: 0 auto;
  padding-top: 40px;
}
.detail-box h1 {
  font-size: 24px;
  text-align: center;
  font-weight: normal;
  padding: 47px 0 27px;
}

.detail-img {
  text-align: center;
}

.detail-img img {
  max-width: 800px;
  max-height: 600px;
  overflow: hidden;
}

/deep/.el-card__body {
  padding: 0;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
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

.user-info {
  height: 220px;
  background: #fff;
  margin-top: 50px;
  margin-bottom: 40px;
}

.user-info .el-col,
.user-info .el-col .grid-content {
  height: 100%;
}

.user-info .grid-content {
  border-right: 1px solid #eee;
  background: #fff;
}

.zuopin-info {
  padding: 33px 30px 32px;
  background-color: #fff;
}

.zuopin-info h3 {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  padding: 0 0 14px;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #dbdbdb;
}

.name {
  font-size: 36px;
  line-height: 220px;
  text-align: center;
}

.user-info div.fix {
  line-height: 20px;
  overflow: hidden;
  zoom: 1;
  font-size: 12px;
}

.worksInfo {
  width: 100px;
  height: 140px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -70px;
}

.server strong {
  text-align: center;
  display: block;
  font-size: 18px;
  font-family: Verdana;
  padding: 68px 0 7px;
  font-weight: normal;
}

.server span {
  text-align: center;
  display: block;
  color: #666;
  line-height: 20px;
  font-size: 12px;
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
  background: #dbdbdb;
  display: inline-block;
  _position: relative;
}

.graTit b {
  line-height: 40px;
  font-size: 24px;
  color: #939393;
  font-weight: normal;
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
  height: 100%;
  display: block;
  cursor: pointer;
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

.oprbtn-box {
  padding-top: 25px;
}

.oprbtn-box span {
  color: #999;
  font-size: 12px;
  display: inline;
  text-align: left;
  line-height: 18px;
}

.oprbtn-box .el-button:focus,
.oprbtn-box .el-button:hover {
  color: #606266;
  background: #fff;
  border: 1px solid #dcdfe6;
}

.oprbtn-box .el-button.is-disabled,
.oprbtn-box .el-button.is-disabled:focus,
.oprbtn-box .el-button.is-disabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
.toupiao-box {
  padding-top: 70px;
}
.toupiao-btn {
  display: block;
  width: 120px;
  background: #d7000f;
  color: #fff;
  font-size: 18px;
  text-align: center;
  margin: 0 auto;
  height: 40px;
  line-height: 40px;
}
.toupiao-count {
  font-size: 14px !important;
  text-align: center;
  color: #666666;
  padding-top: 15px;
}
.oprbtn-box em {
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #333;
  padding-right: 15px;
}
.miaoshu {
  font-size: 12px;
  color: #999;
  float: right;
}
</style>