<template>
    <div>
        <el-carousel height="400px">
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
            <el-row class="yun-box" :gutter="30">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                <a href="https://wxdc5079dd9cc75887.h5.xiaoe-tech.com/mp/eyJpZCI6ODc1NjExfQ">
                    <img src="~@/assets/img/yunketang.png" alt="">
                    <span>云课堂</span>
                </a>
                </div>
            </el-col>
            <el-col :span="8">
                <div @click="goList(1)" class="grid-content bg-purple">
                <img src="~@/assets/img/yunpingxuan.png" alt="">
                <span>云评选</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div @click="goList(2)" class="grid-content bg-purple">
                <img src="~@/assets/img/yunzhanlan.png" alt="">
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
</style>