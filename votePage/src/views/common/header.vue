<template>
  <div>
    <el-carousel height="480px">
      <el-carousel-item>
        <img src="~@/assets/img/d_banner1.png" alt />
      </el-carousel-item>
      <el-carousel-item>
        <img src="~@/assets/img/d_banner2.png" alt />
      </el-carousel-item>
      <el-carousel-item>
        <img src="~@/assets/img/d_banner3.png" alt />
      </el-carousel-item>
      <!-- <el-carousel-item>
        <img src="~@/assets/img/banner1.jpg" alt />
      </el-carousel-item>
      <el-carousel-item>
        <img src="~@/assets/img/banner2.jpg" alt />
      </el-carousel-item>
      <el-carousel-item>
        <img src="~@/assets/img/banner3.jpg" alt />
      </el-carousel-item> -->
    </el-carousel>
    <el-row class="liulan-list">
      <el-col :span="12">
        <span class="left"><i class="icon-left-border"></i>浏览量：{{viewsCount}}</span>
      </el-col>
      <el-col :span="12">
        <span class="right"><i class="icon-left-border"></i>总票数：{{voteCount}}</span>
      </el-col>
    </el-row>
    <el-row class="yun-box" :gutter="30">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <a
            href="https://wxdc5079dd9cc75887.h5.xiaoe-tech.com/v1/course/column/p_5f452a7ee4b0118787334afd?type=3"
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
    // 作品展示及投票
    goList (showFlag) {
      this.$router.push({ name: 'allList', query: { showFlag: showFlag } })
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-left-border{
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
  border: solid 2px #C20E23
}
.el-carousel__item {
  display: flex;
  align-items: center;
}
.el-carousel__item img {
  width: 100%;
  height:100%;
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