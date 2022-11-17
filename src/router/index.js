import Vue from 'vue'
import Router from 'vue-router'

//1.Vue.use(插件) 安装插件
Vue.use(Router)

//2.创建vueRouter对象
export const routes=[
	// {
	//   path: '/',
	//   name: 'HelloWorld',
	//   component: () => import("@/components/HelloWorld"),
	// },
	{
		path: '/login',
		name: 'Login',
		component: () => import("@/views/login/index.vue"),
		hidden: true,
		meta: {
			title: "登录"
		}
	},
	{
		path: '/',
		redirect: 'index',
		component: () => import("@/layouts/index.vue"),
		children: [{
			path: 'index',
			name: 'Index',
			component: () => import('@/views/index/index'),
			meta: {
				title: '首页',
				icon: 'el-icon-s-home',
				affix: true,
			},
		}, ],
	},
	{
		path: '/contentManage',
		name: 'ContentManage',
		redirect: 'contentManage/content',
		component: () => import("@/layouts/index.vue"),
		children:[
			{
				path: 'content',
				name: 'Content',
				component: () => import("@/views/content/index"),
				meta: {
					title: '文章管理',
					icon: 'el-icon-reading',
				},
			},
		]
	},
	{
		path:'/officeCenter',
		name:'OfficeCenter',
		meta:{
			title:'工作中心',
			icon:'el-icon-suitcase'
		},
		component: () => import("@/layouts/index.vue"),
		children:[
			{
				path: 'myTodo',
				name: 'MyTodo',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '我的待办',
					icon: '',
				},
			},
			{
				path: 'myFinished',
				name: 'MyFinished',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '我的已办',
					icon: '',
				},
			},
			{
				path: 'myToRead',
				name: 'MyToRead',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '我的待阅',
					icon: '',
				},
			},
			{
				path: 'myReaded',
				name: 'MyReaded',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '我的已阅',
					icon: '',
				},
			},
		]
	},
	{
		path: '/personalManage',
		redirect: 'PersonalManage',
		name: 'personalManage',
		meta: {
			title: '配置',
			icon: 'el-icon-s-tools'
		},
		component: () => import("@/layouts/index.vue"),
		children: [{
				path: 'userManage',
				name: 'UserManage',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '用户管理',
					icon: 'home',
				},
			},
			// {
			// 	path: 'managerInfo',
			// 	name: 'ManagerInfo',
			// 	component: () => import('@/views/managerInfo/index'),
			// 	meta: {
			// 		title: '管理员管理',
			// 		icon: 'home',
			// 	},
			// },
			{
				path: 'roleManage',
				name: 'RoleManage',
				component: () => import('@/views/roleManage/index'),
				meta: {
					title: '角色管理',
					icon: 'home',
				},
			},
			{
				path: 'dictManage',
				name: 'DictManage',
				component: () => import('@/views/roleManage/index'),
				meta: {
					title: '字典管理',
					icon: 'home',
				},
			},
			{
				path: 'apiManage',
				name: 'ApiManage',
				component: () => import('@/views/roleManage/index'),
				meta: {
					title: '接口管理',
					icon: 'home',
				},
			},
			{
				path: 'mailDeploy',
				name: 'MailDeploy',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '邮件配置',
					icon: '',
				},
			},
			{
				path: 'messageDeploy',
				name: 'MessageDeploy',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '短信配置',
					icon: '',
				},
			},
			{
				path: 'userInfo',
				name: 'UserInfo',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '个人信息',
					icon: '',
				},
			},
			{
				path: 'updatePassword',
				name: 'UpdatePassword',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '修改密码',
					icon: '',
				},
			}
		],
	},
	{
		path:'/cateManage',
		name:'CateManage',
		meta:{
			title:'菜单管理',
			icon:'el-icon-menu'
		},
		component: () => import("@/layouts/index.vue"),
		children:[
			{
				path: 'homeCate',
				name: 'HomeCate',
				component: () => import('@/views/homeCate/index'),
				meta: {
					title: '前台菜单',
					icon: '',
				},
			},
			{
				path: 'adminCate',
				name: 'AdminCate',
				component: () => import('@/views/homeCate/index'),
				meta: {
					title: '后台菜单',
					icon: '',
				},
			},
		]
	},
	{
		path:'/logManage',
		name:'LogManage',
		meta:{
			title:'日志管理',
			icon:'el-icon-menu'
		},
		component: () => import("@/layouts/index.vue"),
		children:[
			{
				path: 'homeLog',
				name: 'HomeLog',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '前台日志',
					icon: '',
				},
			},
			{
				path: 'adminLog',
				name: 'AdminLog',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '后台日志',
					icon: '',
				},
			},
		]
	},
	{
		path:'/portalManage',
		name:'portalManage',
		meta:{
			title:'门户管理',
			icon:'el-icon-menu'
		},
		component: () => import("@/layouts/index.vue"),
		children:[
			{
				path: 'articleManage',
				name: 'ArticleManage',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '文章管理',
					icon: '',
				},
			},
			{
				path: 'comment',
				name: 'Comment',
				component: () => import('@/views/userManage/index'),
				meta: {
					title: '评论管理',
					icon: '',
				},
			},
		]
	},
	{
		path: '/orderManage',
		name: 'OrdereManage',
		meta: {
			title: '订单管理',
			icon: 'el-icon-shopping-cart-full',
		},
		component: () => import("@/layouts/index.vue"),
	},
	{
		path: '/goodsManage',
		name: 'GoodsManage',
		meta: {
			title: '商品管理',
			icon: 'el-icon-sell',
		},
		component: () => import("@/layouts/index.vue"),
	},
	
]

//配置路由和组件之间的对应关系
export const routerCustom= new Router({
	// base: publicPath,
	// mode: routerMode,
	scrollBehavior: () => ({
		y: 0,
	}),
	routes,
})

export function resetRouter() {
	router.matcher = new Router({
		// base: publicPath,
		// mode: routerMode,
		scrollBehavior: () => ({
			y: 0,
		}),
		// routes: constantRoutes,
	}).matcher
}

//3.将router对象传入到Vue实例
export default routerCustom
