// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)
// const files = require.context('./modules', false, /\.js$/)
// const modules = {}
// console.log("files",files.keys());
// files.keys().forEach((key) => {
//   modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
// })
// console.log("Object.keys(modules)",Object.keys(modules));
// Object.keys(modules).forEach((key) => {
//   console.log("modules[key]",modules[key]);
//   modules[key]['namespaced'] = true
// })
// const store = new Vuex.Store({
//   modules,
// })
// export default store
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 导入vue x 持久化插件
import VuexPersistence from 'vuex-persist';

import state from './state.js';
const mutations = require('./mutations.js');
const getter = require('./getter.js');
import actions from './actions.js';

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer(val) {//方法1：使用reducer，这里的val是由store里面的所有state,不加reducer为存储所有，reducer为存储指定数据
    return {
	  accessToken:val.accessToken,
    }
  }
})
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getter,
  modules: {},
  plugins: [vuexLocal.plugin]
})

export default store