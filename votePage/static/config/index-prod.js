/**
 * 生产环境
 */
;(function () {
  window.SITE_CONFIG = {}

  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = 'http://210.16.188.29:8081/'
  window.SITE_CONFIG['imgUrl'] = 'http://210.16.188.29:8081/proxyApi/'

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain'] = './' // 域名
  window.SITE_CONFIG['version'] = ''   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl'] = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
})()
