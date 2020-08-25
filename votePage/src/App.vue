<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    created() {
      var browser = {
        versions: (function () {
          var u = navigator.userAgent
          return { // 移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, // IE内核
            presto: u.indexOf('Presto') > -1, // opera内核
            webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
            mobile: !!u.match(/Mobile/), // 是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1 // 是否iPad
          }
        })(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
      }
      if (browser.versions.mobile) {
        window.location.href = 'http://www.91hesuan.com/yijiaDemo'
      }
    }
  }
</script>
<style lang="scss">
.picCon{
  width: 310px;
  height: 310px;
  display: block;
  overflow: hidden;
}
.picCon img{
  -webkit-transition: -webkit-transform 0.4s ease;
  -moz-transition: -moz-transform 0.4s ease;
  -ms-transition: -ms-transform 0.4s ease;
  transition: transform 0.4s ease;
  vertical-align: middle;
}
.picCon:hover img{
    -webkit-transition: -webkit-transform 0.4s ease;
    -moz-transition: -moz-transform 0.4s ease;
    -ms-transition: -ms-transform 0.4s ease;
    transform: scale(1.04, 1.04);
    -ms-transform: scale(1.04, 1.04);
    -webkit-transform: scale(1.04, 1.04);
}
</style>