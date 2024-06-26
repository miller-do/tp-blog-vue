import Vue from 'vue'
import axios from 'axios'
// import {
//   baseURL,
//   contentType,
//   debounce,
//   invalidCode,
//   noPermissionCode,
//   requestTimeout,
//   successCode,
//   tokenName,
//   loginInterception,
// } from '@/config'
// import store from '@/store'
import qs from 'qs'
import router from '@/router'
// import { isArray } from '@/utils/validate'
let loadingInstance

// const handleCode = (code, msg) => {
//   switch (code) {
//     case invalidCode:
//       Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, 'error')
//       store.dispatch('user/resetAccessToken').catch(() => {})
//       if (loginInterception) {
//         location.reload()
//       }
//       break
//     case noPermissionCode:
//       router.push({ path: '/401' }).catch(() => {})
//       break
//     default:
//       Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, 'error')
//       break
//   }
// }
console.log('process.env',process.env);
const instance = axios.create({
  //baseURL,// @/config.baseURL: process.env.NODE_ENV === 'development'? 'vab-mock-server': 'vab-mock-server',
  // baseURL:"http://localhost:80/tp-blog/public/index.php/api/common",
  // 如果 axios 的 baseURL 配置的是绝对路径，例如 ‘http://192.168.1.45:8085/’，axios 会直接发送请求而不经过 devServer.proxy
  // 如果 axios 的 baseURL 设置为相对路径 ‘/api’，则可以正常使用 devserver.proxy 进行请求转发。也不会有跨域问题。
  baseURL: process.env.baseUrl,//'/admin',//'/index.php/admin'
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',//contentType,
  },
})

instance.interceptors.request.use(
  (config) => {
    // if (store.getters['user/accessToken']) {
    //   config.headers[tokenName] = store.getters['user/accessToken']
    // }
    // //这里会过滤所有为空、0、false的key，如果不需要请自行注释
    // if (config.data)
    //   config.data = Vue.prototype.$baseLodash.pickBy(
    //     config.data,
    //     Vue.prototype.$baseLodash.identity
    //   )
    // if (
    //   config.data &&
    //   config.headers['Content-Type'] ===
    //     'application/x-www-form-urlencoded;charset=UTF-8'
    // )
    // config.data = qs.stringify(config.data)
    // if (debounce.some((item) => config.url.includes(item)))
    loadingInstance = Vue.prototype.$loading({
		lock: true,
		text: '加载中',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)'
	})
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
	if (response.status === 200) {
		if (loadingInstance) loadingInstance.close()
		return Promise.resolve(response);
	} else {
		if (loadingInstance) loadingInstance.close()
		return Promise.reject(response);
	}
	

    // const { data, config } = response
    // const { code, msg } = data
    // // 操作正常Code数组
    // const codeVerificationArray = isArray(successCode)
    //   ? [...successCode]
    //   : [...[successCode]]
    // // 是否操作正常
    // if (codeVerificationArray.includes(code)) {
    //   return data
    // } else {
    //   handleCode(code, msg)
    //   return Promise.reject(
    //     'vue-admin-beautiful请求异常拦截:' +
    //       JSON.stringify({ url: config.url, code, msg }) || 'Error'
    //   )
    // }
  },
  (error) => {
    // if (loadingInstance) loadingInstance.close()
    // const { response, message } = error
    // if (error.response && error.response.data) {
    //   const { status, data } = response
    //   handleCode(status, data.msg || message)
    //   return Promise.reject(error)
    // } else {
    //   let { message } = error
    //   if (message === 'Network Error') {
    //     message = '后端接口连接异常'
    //   }
    //   if (message.includes('timeout')) {
    //     message = '后端接口请求超时'
    //   }
    //   if (message.includes('Request failed with status code')) {
    //     const code = message.substr(message.length - 3)
    //     message = '后端接口' + code + '异常'
    //   }
    //   Vue.prototype.$baseMessage(message || `后端接口未知异常`, 'error')
    //   return Promise.reject(error)
    // }
  }
)

export default instance
