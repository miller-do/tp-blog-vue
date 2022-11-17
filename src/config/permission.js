import router from '@/router'
import VabProgress from 'nprogress'
// import store from 'vuex'
import store from '@/store/index.js'
import 'nprogress/nprogress.css'
import {routes} from '@/router'
VabProgress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
})
//添加一个导航守卫，在导航即将解析之前执行。在这个状态下，所有的组件都已经被获取，并且其他导航守卫也已经成功。返回一个删除已注册守卫的函数。
router.beforeResolve(async (to, from, next) => {
	VabProgress.start();
	let hasToken=store.state.accessToken;
	if (hasToken) {
		if (to.path === '/login') {
			next({ path: '/' })
			VabProgress.done()
		}else{
			store.commit('setListSiderMenu',routes)
			// console.log("listSiderMenu111111",store.state.listSiderMenu);
			let hasPermissions=true;
			if (hasPermissions) {
				next()
			}else{
				//获取permission
				next()
			}
			VabProgress.done()
			// const hasPermissions =
			//   store.getters['user/permissions'] &&
			//   store.getters['user/permissions'].length > 0
			// if (hasPermissions) {
			//   next()
			// } else {
			//   try {
			//     let permissions
			//     if (!loginInterception) {
			//       //settings.js loginInterception为false时，创建虚拟权限
			//       await store.dispatch('user/setPermissions', ['admin'])
			//       permissions = ['admin']
			//     } else {
			//       permissions = await store.dispatch('user/getUserInfo')
			//     }
			//     let accessRoutes = []
			//     if (authentication === 'intelligence') {
			//       accessRoutes = await store.dispatch('routes/setRoutes', permissions)
			//     } else if (authentication === 'all') {
			//       accessRoutes = await store.dispatch('routes/setAllRoutes')
			//     }
			//     router.addRoutes(accessRoutes)
			//     next({ ...to, replace: true })
			//   } catch {
			//     await store.dispatch('user/resetAccessToken')
			//     if (progressBar) VabProgress.done()
			//   }
			// }
		}
	}else{
		if (to.path=='/login') {
			next()
		}else{
			let recordRoute=true;//是否开启历史路由
			if (recordRoute) {
				// console.log("to.path",to.path);
				next(`/login?redirect=${to.path}`)
			} else {
			  next('/login')
			}
		}
		
		VabProgress.done()
	}
	
})