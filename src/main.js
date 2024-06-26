// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/config/permission'
import ElementUI from 'element-ui';             //全局引入element
import 'element-ui/lib/theme-chalk/index.css';    //全局引入element的样式
import * as lodash from 'lodash'

//富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import 'imagehover.css/css/imagehover.min.css'
import 'skitter-slider/dist/skitter.css'

import '../static/css/common.css'
Vue.use(ElementUI);     //全局注入element

import qs from 'qs'
Vue.prototype.$qs = qs

Vue.config.productionTip = false
Vue.prototype.$baseUrl = process.env.baseUrl

/* 全局lodash */
// Vue.prototype.$baseLodash = lodash
/* 全局事件总线 */
Vue.prototype.$baseEventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
