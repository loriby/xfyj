<template>
  <div>
    <el-carousel height="480px" :autoplay="false">
      <el-carousel-item>
        <img src="~@/assets/img/d_banner1.png" alt />
      </el-carousel-item>
      <el-carousel-item>
        <img v-show="!playFlag" v-on:click="playVideo()" src="~@/assets/img/d_banner2.png" alt />
        <div v-show="playFlag">
          <video
            controls
            style="width: 100%;margin-top:-50px"
            src="~@/assets/media/video.mp4"
            id="videoPlay"
            class="video"
          >您的浏览器不支持 video 视屏播放。</video>
        </div>
      </el-carousel-item>
      <!-- <el-carousel-item>
        <img src="~@/assets/img/d_banner2.png" alt />
      </el-carousel-item>
      <el-carousel-item>
        <img src="~@/assets/img/d_banner3.png" alt />
      </el-carousel-item>-->
      <!-- <el-carousel-item>
        <img src="~@/assets/img/banner1.jpg" alt />
      </el-carousel-item>
      <el-carousel-item>
        <img src="~@/assets/img/banner2.jpg" alt />
      </el-carousel-item>
      <el-carousel-item>
        <img src="~@/assets/img/banner3.jpg" alt />
      </el-carousel-item>-->
    </el-carousel>
    <el-row class="liulan-list">
      <el-col :span="12">
        <span class="left">
          <i class="icon-left-border"></i>
          浏览量：{{viewsCount}}
        </span>
      </el-col>
      <el-col :span="12">
        <span class="right">
          <i class="icon-left-border"></i>
          总票数：{{voteCount}}
        </span>
      </el-col>
    </el-row>
    <el-row class="yun-box" :gutter="30">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <a
            href="https://wxdc5079dd9cc75887.h5.xiaoe-tech.com/content_page/eyJ0eXBlIjozLCJyZXNvdXJjZV90eXBlIjoiIiwicmVzb3VyY2VfaWQiOiIiLCJwcm9kdWN0X2lkIjoicF81ZjYyMWZkNGU0YjBkNTljODdiNjUyYjEiLCJhcHBfaWQiOiJhcHBQVEZGd2toUTIyMDYifQ"
          >
            <img src="~@/assets/img/yunketang1.png" alt />
            <span>云课堂</span>
          </a>
        </div>
      </el-col>
      <el-col :span="8">
        <div @click="goList(1)" class="grid-content bg-purple">
          <img src="~@/assets/img/yunpingxuan2.png" alt />
          <span>云评选</span>
        </div>
      </el-col>
      <el-col :span="8">
        <div @click="goList(2)" class="grid-content bg-purple">
          <img src="~@/assets/img/yunzhanlan3.png" alt />
          <span>云展览</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      playFlag: false,
      viewsCount: 100, // 浏览量
      voteCount: 100 // 总票数
    }
  },
  mounted () {
    this.getTotal()
  },
  methods: {
    getTotal () {
      this.$http({
        url: this.$http.adornUrl('/proxyApi/index.php?act=total'),
        method: 'get'
        // headers: {
        //   'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        // },
        // params: this.$http.adornParams(this.dataForm)
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.viewsCount = data.info.viewsCount
          this.voteCount = data.info.voteCount
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    playVideo () {
      this.playFlag = true
      this.$nextTick(() => {
        let vdo = document.getElementById('videoPlay')
        vdo.play()
        // vdo.addEventListener('pause', function () { //暂停开始执行的函数
        // });
        vdo.addEventListener('ended', function () { // 结束
          this.playFlag = false
        }, false)
      })
    },
    // 作品展示及投票
    goList (showFlag) {
      this.$router.push({ name: 'allList', query: { showFlag: showFlag } })
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-left-border {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
  border: solid 2px #c20e23;
}
.el-carousel__item {
  display: flex;
  align-items: center;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
.liulan-list span {
  color: #666666;
}
.liulan-list .right {
  float: right;
}
.liulan-list {
  width: 90%;
  margin: 20px auto 0;
}
</style>