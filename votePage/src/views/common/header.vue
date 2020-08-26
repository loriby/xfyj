<template>
    <div>
        <el-carousel height="400px">
            <el-carousel-item>
                <img src="~@/assets/img/d_banner1.png" alt/>
            </el-carousel-item>
            <el-carousel-item>
                <img src="~@/assets/img/d_banner2.png" alt/>
            </el-carousel-item>
            <el-carousel-item>
                <img src="~@/assets/img/d_banner3.png" alt/>
            </el-carousel-item>
            <el-carousel-item>
                <img src="~@/assets/img/banner1.jpg" alt/>
            </el-carousel-item>
            <el-carousel-item>
                <img src="~@/assets/img/banner2.jpg" alt/>
            </el-carousel-item>
            <el-carousel-item>
                <img src="~@/assets/img/banner3.jpg" alt/>
            </el-carousel-item>
        </el-carousel>
        <el-row class="liulan-list">
            <el-col :span="12">
                <span class="left">浏览量：189098</span>
            </el-col>
            <el-col :span="12">
                <span class="right">总票数：2098373</span>
            </el-col>
        </el-row>
        <el-row class="yun-box" :gutter="30">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                <a href="https://wxdc5079dd9cc75887.h5.xiaoe-tech.com/mp/eyJpZCI6ODc1NjExfQ">
                    <img src="~@/assets/img/yunketang1.png" alt="">
                    <span>云课堂</span>
                </a>
                </div>
            </el-col>
            <el-col :span="8">
                <div @click="goList(1)" class="grid-content bg-purple">
                <img src="~@/assets/img/yunpingxuan2.png" alt="">
                <span>云评选</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div @click="goList(2)" class="grid-content bg-purple">
                <img src="~@/assets/img/yunzhanlan3.png" alt="">
                <span>云展览</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    // 作品展示及投票
    goList (showFlag) {
      this.$router.push({ name: 'allList', query: { showFlag: showFlag } })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-carousel__item img{
    width: 100%;
    height:100%;
}
.liulan-list span{ color: #666666}
.liulan-list .right{float: right;}
.liulan-list {
    width: 90%;
    margin: 20px auto 0;
}
</style>