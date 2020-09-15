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
          <el-row class="news-item" :gutter="20">
            <el-col :span="4">
              <div @click="newsDetail()" class="grid-content">
                <img src="~@/assets/img/newsimg1.jpeg" alt />
              </div>
            </el-col>
            <el-col :span="20">
              <div @click="newsDetail()" class="grid-content">
                <h5>国企退休人员年底纳入社会化管理后，退休福利待遇会变吗？</h5>近日，市人力社保局发布消息，今年年底前，本市要将尚未实行社会化管理的国有企业已退休人员移交街道和社区实行社会化管理，届时，社会化管理退休人员总量将从目前的114
              </div>
            </el-col>
          </el-row>
          <el-row class="news-item" :gutter="20">
            <el-col :span="4">
              <div @click="newsDetail()" class="grid-content">
                <img src="~@/assets/img/news_img2.jpg" alt />
              </div>
            </el-col>
            <el-col :span="20">
              <div @click="newsDetail()" class="grid-content">
                <h5>210余万企退人员家门口享无差别服务</h5>前半生奋斗在企业，后半生养老在社区，退休后离开了企业，退休待遇会不会降低、办事方不方便、生活有困难谁来管等等，类似这样的问题是很多企业退休人员关心的事儿。
              </div>
            </el-col>
          </el-row>
          <el-row class="news-item" :gutter="20">
            <el-col :span="4">
              <div @click="newsDetail()" class="grid-content">
                <img src="~@/assets/img/news_img3.jpg" alt />
              </div>
            </el-col>
            <el-col :span="20">
              <div @click="newsDetail()" class="grid-content">
                <h5>北京市劳动服务管理中心——致社会化管理退休人员的一封信</h5>亲爱的“战疫”老年朋友们：您们辛苦啦！突如其来的新冠肺炎疫情，打破了新春的祥和与安宁，为打赢疫情防控的人民战争、总体战、阻击战，您们主动请缨、挺身而出，不顾个人安危，舍小家为大家，在志愿
              </div>
            </el-col>
          </el-row>
          <el-row class="news-item" :gutter="20">
            <el-col :span="4">
              <div @click="newsDetail()" class="grid-content">
                <img src="~@/assets/img/news_img4.jpg" alt />
              </div>
            </el-col>
            <el-col :span="20">
              <div @click="newsDetail()" class="grid-content">
                <h5>今年底企退人员社会化管理总量将达210余万</h5>打破地域和户籍限制，家门口即可享受无差别服务供稿人北京市劳动服务管理中心2020年7月1日前半生奋斗在企业，后半生养老在社区，退休后离开了企业，退休待遇会不会降低、办事方不方便、生活有困难谁来管等等，类似这样的问题是
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
          <h1 class>国企退休人员年底纳入社会化管理后，退休福利待遇会变吗？</h1>
          <div class="info">
            <div>
              <span class="time">2016-05-12 11:04:55</span>
            </div>
          </div>
          <div class="detail" style="font-size: 18px;">
            <p style="text-align: center;">
              <img alt src="~@/assets/img/newsimg1.jpeg" />
            </p>

            <p>近日，市人力社保局发布消息，今年年底前，本市要将尚未实行社会化管理的国有企业已退休人员移交街道和社区实行社会化管理，届时，社会化管理退休人员总量将从目前的114.1万人增加到210.4万人。</p>
            <p>移交街道和社区管理，跟原来的企业管理有什么不一样？退休待遇会不会降低？办事方不方便？怎么参加活动？一些老年人对此一头雾水，甚至因为担心待遇降低、“没人管”而对社会化管理心生抵触。</p>
            <p>老人们的退休待遇会不会发生变化？市人力社保局相关人员对此明确表示：退休人员原享受的补充医疗保险、医疗互助帮困等相关待遇仍然继续由移交企业按照原时间、原渠道、原标准继续予以保障。企业须在移交承诺书上盖章确认。</p>
            <h6>新闻词条：何为“企业退休人员社会化管理服务”？</h6>
            <p>企业退休人员社会化管理服务是指职工办理退休手续后，其管理服务工作与原企业分离，养老金实行社会化发放，人员移交城市街道和社区实行属地管理，由社区服务组织提供相应管理服务。</p>
            <p>这项制度是独立于企业事业单位之外的社会保障体系的重要内容，也是深化国企改革，解决企业办社会问题的重要措施。</p>
            <p>退休人员实行社会化管理之后，退休人员的养老金实行社会化发放，人事档案由属地集中保管，如果涉及到医保的手工报销、领取社会保险（保障）待遇资格认证、死亡之后家属申领丧葬补助等事宜，都可由街道政务服务中心负责办理。</p>
            <h6>报销医药费：不用跑单位 家门口就能办</h6>
            <p>“谁来管理我们其实不重要，我只是担心，离开了厂子，我们的待遇就没保障了。我们的厂子有补充医保，过年过节都有慰问品，好多福利呢。现在把我们分出去，交给街道管理，这些福利是不是就没了？我不愿去街道，我就想一辈子待在厂子里。”杨大妈在一家炼油企业工作了30多年，从她入厂那天起，自己的生老病死就跟厂子捆绑在了一起。现在要进行社会化管理，跟企业“解绑”，杨大妈一时难以接受，害怕没了依靠。</p>
            <p>其实，退休人员大可不必担心，为确保退休人员的权益，本市推行企业“承诺制”，要求对退休人员原来享受的补充医疗保险、医疗互助帮困等相关待遇仍然继续由移交企业按照原时间、原渠道、原标准继续予以保障，并在移交承诺书上盖章确认。</p>
            <p>李大妈现在住在八里庄街道，工作单位却在石景山。几年前，她参加了退休人员社会化管理，将关系转移到八里庄街道，有什么事就到家门口的便民中心办理就行了。前不久,她的医保卡不小心弄丢了，需要补办。要是按照以前企业管理的办法，她补办社保卡期间的医药费需要到原单位手工报销。这一东一西，单程就要将近30公里。退休关系移交便民服务中心以后，她再也不用坐几十公里公交车去单位跑报销了。步行几分钟就走到了便民中心，经过工作人员耐心细致的引导，她在街道社会化退休窗口拿到了报销款，逢人就说：“退休社会化以后办起事来真方便，在家门口就能办，工作人员工作效率非常高，服务态度也非常好，对我们老年人来说真是件大好事”。</p>
            <h6>退休福利待遇： 不受影响 办事查询更便利</h6>
            <p>张芳是一家央企的人事专员，负责退休人员服务及管理工作。她告诉记者，他们公司规模很大，在职职工有几万人，这么多年来，积累了大量退休人员，达到了几千人。负担这几千名退休人员的管理，是一项极其艰巨的任务。领取养老金、调整就诊医院、开具各类证明、开展文化娱乐活动……涉及到方方面面的工作，事无巨细，要占用一个人专职来做这项服务，而且人事、财务、后勤等很多部门都要跟着一起忙活，对企业来说管理成本很高。</p>
            <p>“有些退休职工住得离公司很远，岁数长了，身体也不太好，有时候还要因为一些小事往公司跑。比如，有人大老远来趟公司，其实就是想变更一下医保定点医院，为此要来回奔波几十公里。如果关系转移到居住地，社保所一般就在家门口不远的地方，他们去那里变更医院、查询信息都很便捷。”</p>
            <p>所以，张芳认为，从企业的角度，很希望通过国企退休人员社会化管理的方式，在保障现有退休职工福利待遇不受影响的情况下，让他们享受更便捷的办事服务。</p>
            <h6>档案管理服务：不用来回跑腿 手机操作一下就搞定</h6>
            <p>退休人员转为社会化管理之后，还有一件很重要的事情就是档案管理。从企业转出来以后，退休人员的档案也将随之转移到街道，今后涉及到档案事务也会通过街道来办理。</p>
            <p>一些央国企通过与第三方公司的合作，将退休人员的档案进行托管。专业的档案保管库房有智能库房管理系统，确保恒温恒湿，做到防火防盗防尘，保障安全保密性。再通过数字化加工，退休人员想要办理与档案相关的事务，就可以通过线上服务来办理了，在手机上操作一下，就能开好所需证明，省去了来回跑腿的麻烦。</p>
            <p>“昨天一天我们就接收到了合作企业移交的1000多份退休人员档案，这一批总共有6000多份。”中智外企服务分公司党委书记、总经理李云峰介绍，目前中智已与在京40余家央国企签订合作协议，在退休人员社会化管理方面，使用专业的第三方档案管理服务，既能保障专业性、规范性、安全性，也能帮助企业相关部门减轻事务性工作压力。</p>
            <h6>退休生活不耽误： “十分钟生活圈”更加丰富多彩</h6>
            <p>除了这些，退休人员社会化管理的另一个重要功能就是组织退休人员的文化教育活动，让退休人员在家门口享受到“老有所乐、老有所为”的退休生活。</p>
            <p>王大爷是个“文艺青年”，在原来单位里，退休职工的文体生活特别丰富，他很担心社会化了以后没人组织他们活动了，生活会比较单调。转移到街道以后，他发现原来的担心都是多余的。街道的便民中心将辖区内的文艺爱好者根据居住社区还有爱好特长组织到一起，定期开展爬山、歌唱、广场舞、诗朗诵等活动，不仅丰富了生活，还能让老年人能够在“十分钟生活圈”内找到志同道合的玩伴。</p>
            <p>66岁的朱小萍大妈是和平街街道便民服务中心一名社会化退休人员，来自北京汽车摩托车联合制造公司的破产企业。退休后朱大妈依然活跃在社会舞台，奉献自己的爱心。通过街道搭桥，2004年至2016年间，朱大妈分别在北京农业技术学校和劳动保障职业学院教学，培养了几百名学生取得了机械加工资格证，并在技能大赛比赛中取得了好成绩，为学生今后就业铺平了道路。</p>
            <p>
              朱大妈还一直热衷公益事业，参加街道组织的慰问活动，到太阳宫养老院探望老人们，为他们做心理疏导、慰问演出、包饺子、聊家常，让老人们感觉到家的温暖。今年疫情期间，朱大妈还主动报名社区志愿者，不畏严冬酷暑在社区楼宇路口执勤。
              <br />忙起来，自己不觉得闷了，也为社会做了贡献，朱大妈觉得，在街道管理下的退休生活，要比在原单位更加丰富多彩。
            </p>
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
      flagArry: ['newsFlag', 'activityFlag', 'ruleFlag', 'opusFlag'],
      opusArry: [
        { name: '全部', id: '', type: '', isActive: true },
        { name: '书法', id: '', type: 'shufa', isActive: false },
        { name: '绘画', id: '', type: 'huihua', isActive: false },
        { name: '摄影', id: '', type: 'sheying', isActive: false }
      ]
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
      this.$router.push({ name: 'detail', query: { path: 'home', id: id, type: type } })
    },

    // 查看新闻详情
    newsDetail () {
      this.flagArry.forEach(item => {
        this[item] = false
      })
      this.newsDetailFlag = true
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
  background: #f1dfef;
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
  background: #b50103;
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
  background: #000;
  border: 1px solid #000000;
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
  width: auto;
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
  width: 60px;
  height: 60px;
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
  background: #000;
  border: 1px solid #000000;
}
</style>

