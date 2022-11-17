<template>
	<el-container>
	  <el-aside width="256px" ref="asideObj">
		  <el-col :span="24" class="side-bar">
		  	<el-col class="sys-logo" ref="logoObj">
		  		<img src="../assets/images/begood.png" alt="" style="width: 50px;">
		  		<span class="">begooAdmin</span>
		  	</el-col>
		  	<el-col class="sider-bar-wrap" :style="{height:siderMenuclientHeight}">
		  		<el-col :span="24" class="sider-bar-wrap-inner" style="height: 100%;">
		  			<siderBarMenu
		  			:active-menu="activeMenu"
		  			></siderBarMenu>
		  		</el-col>
		  	</el-col>
		  </el-col>
	  </el-aside>
	  
	  <el-container>
	    <el-header height="115px">
			<el-col class="fixed-header">
				<div class="nav-bar">
					<div class="breadcrumb-wrap">
						<div><i class="el-icon-s-fold"></i></div>
						<div class="breadcrumb">
							<el-breadcrumb separator-class="el-icon-arrow-right" separator=">">
								<el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
									{{item.meta.title}}
								</el-breadcrumb-item>
							</el-breadcrumb>
						</div>
					</div>
					<div class="right-element">
						<el-col :span="24" class="userAction">
							<el-tooltip class="item" effect="light" content="进入全屏" placement="top">
								<i class="el-icon-rank" @click="screenCtrl"></i>
							</el-tooltip>
							<el-tooltip class="item" effect="light" content="主题配置" placement="bottom">
								<i class="el-icon-view"></i>
							</el-tooltip>	
							<el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
								<i class="el-icon-refresh-left" title="刷新" :pulse="pulse" @click="refreshPage"></i>
							</el-tooltip>
						</el-col>
						<el-col :span="24">
							<el-col :span="24" class="avatar">
								<el-col :span="24">
									<el-dropdown trigger="click" @command="handleCommandUser">
										<el-col :span="24" class="user-info">
											<el-col>
												<el-avatar
													src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
												</el-avatar>
											</el-col>
											<el-col class="avatar-button">
												<el-col>
													admin
												</el-col>
												<el-col class="el-dropdown-link">
													<i class="el-icon-arrow-down el-icon--right"></i>
												</el-col>
											</el-col>
										</el-col>
			
										<el-dropdown-menu slot="dropdown">
											<el-dropdown-item command="a">个人中心</el-dropdown-item>
											<el-dropdown-item command="b">退出登录</el-dropdown-item>
											<!-- <el-dropdown-item command="c" disabled>双皮奶</el-dropdown-item>
											<el-dropdown-item command="d" divided>蚵仔煎</el-dropdown-item> -->
										</el-dropdown-menu>
									</el-dropdown>
			
								</el-col>
							</el-col>
						</el-col>
			
					</div>
				</div>
				<div class="tab-bar">
					<el-col class="tabs-wrap">
						<el-tabs v-model="activeTab" type="card" @tab-remove="removeTab"
							@tab-click="handleTabclick">
							<el-tab-pane v-for="(item, index) in visitedRoute" :key="item.name" :closable="!isAffix(item)" :label="item.meta.title"
								:name="item.name">
								<!-- {{item.name}} -->
							</el-tab-pane>
						</el-tabs>
					</el-col>
					<el-col class="tabs-more-action">
						<!-- 更多操作
						<i class="el-icon-arrow-down"></i> -->
						<el-dropdown trigger="click" @command="handleCommand">
							<el-col class="el-dropdown-link">
								<!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
								<el-col>更多操作</el-col>
								<el-col>
									<i class="el-icon-arrow-down el-icon--right"></i>
								</el-col>
							</el-col>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="closeTabOther">关闭其他</el-dropdown-item>
								<el-dropdown-item command="closeTabLeft">关闭左侧</el-dropdown-item>
								<el-dropdown-item command="closeTabRight">关闭右侧</el-dropdown-item>
								<el-dropdown-item command="closeTabAll">关闭全部</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
				</div>
			</el-col>
		</el-header>
		<el-scrollbar class="scrollbar" style="height:100%">
			<el-main ref="mainObj">
				<app-main></app-main>
			</el-main>
		</el-scrollbar>
	    <!-- <el-footer>Footer</el-footer> -->
	  </el-container>
	</el-container>
	
</template>

<script>
	import screenfull from "screenfull";
	import {resetRouter} from '@/router';
	import {mapState} from 'vuex';
	import siderBarMenu from '@/layouts/components/siderBarMenu/index.vue'
	import appMain from '@/layouts/components/appMain/index.vue'
	export default {
		data() {
			return {
				breadcrumbList:this.getBreadcrumbList(),
				activeMenu:"index",
				activeTab: 'home',
				tabIndex: 2,
				menuList: [{
					name: "工作中心"
				}],
				affixtabs: null,
				pulse:true,
				siderMenuclientHeight:null
			}
		},
		components: {
			siderBarMenu,appMain
		},
		watch: {
			//computed默认第一次加载的时候就开始监听；watch默认第一次加载不做监听，如果需要第一次加载做监听，添加immediate属性，设置为true（immediate:true）
			$route: {
				handler(route) {
					// console.log("route",route);
					this.breadcrumbList = this.getBreadcrumbList();
					this.initTabs(route);
					this.addtabs();
					this.activeTab = route.name;
					this.activeMenu = route.path;
				},
				immediate: true,
			},
		},
		computed: {
			...mapState(['visitedRoute']),
		},
		mounted() {
			console.log("mainObjHeight",this.$refs.mainObj.$el.offsetHeight);
			console.log("this.siderMenuclientHeight",this.menuList);
			this.siderMenuclientHeight=this.$refs.asideObj.$el.offsetHeight-this.$refs.logoObj.$el.offsetHeight+'px';
			this.$nextTick(()=>{
				console.log("2222222",this.siderMenuclientHeight);
			})
			console.log("clientHeight",this.siderMenuclientHeight);
		},
		methods: {
			screenCtrl(){
				if (!screenfull.isEnabled) { // 如果不允许进入全屏，发出不允许提示
					this.$message({
					  message: '不支持全屏',
					  type: 'warning'
					})
					return false
				}
				screenfull.toggle()
			},
			getBreadcrumbList(){
				let list = this.$route.matched.filter(item=>item.name&&item.meta.title)
				return list;
			},
			initTabs(route) {
				let routeIndex={
					path:"/index",
					name:"Index",
					meta:{
						title:"首页",
						icon:"Index",
						affix:true
					}
				}
				if (!this.hasTab(routeIndex)) {
					this.$store.commit('addVisitedRoute', routeIndex)
				}
			},
			addtabs() {
				const {name} = this.$route;
				if (!this.hasTab(this.$route) && name) {
					if (!this.$route.meta||!this.$route.meta.affix) {
					this.$store.commit('addVisitedRoute', this.$route)
					}
				}
				return false
			},
			hasTab(route){
				let hasTab=this.visitedRoute.filter((item,index)=>{
					if (route.name==item.name) {
						return item
					}
				})[0]
				return hasTab;
			},
			isAffix(route){
				if (route.meta.affix) {
					return true;
				}else{
					return false;
				}
				
			},
			removeTab(tabName) {
				this.visitedRoute.forEach((item, index) => {
					if (tabName === item.name) {
						this.visitedRoute.splice(index,1)
					}
				})
				let latestTab=this.visitedRoute.slice(-1)[0];
				// console.log("latestTab",latestTab);
				this.$router.push(latestTab)
			},
			handleCommand(command) {
				switch (command){
					case 'closeTabOther':
						this.closeTabOther();
						break;
					case 'closeTabLeft':
						this.closeTabLeft();
						break;
					case 'closeTabRight':
						this.closeTabRight();
						break;
					case 'closeTabAll':
						this.closeTabAll();
						break;
				}
			},
			handleCommandUser(command){
				if (command == "b") {
					this.$store.commit('setAccessToken', null);
					sessionStorage.removeItem('vuex');
					console.log("this.$store.state.accessToken", this.$store.state.accessToken);
					this.$router.push('/login'); //重置路由
				}
			},
			
			// 关闭其它
			async closeTabOther(){
				const view = await this.handleCurTag();
				this.$store.commit('closeTabOther',view);
			},
			// 关闭左侧
			async closeTabLeft(){
				const view = await this.handleCurTag();
				this.$store.commit('closeTabLeft',view);
			},
			// 关闭其它
			async closeTabRight(){
				const view = await this.handleCurTag();
				this.$store.commit('closeTabRight',view);
			},
			
			// 关闭左侧
			async closeTabAll(){
				const view = await this.handleCurTag();
				this.$store.commit('closeTabAll',view);
				this.$router.push('/')
			},
			//处理当前路由
			async handleCurTag(){
				const view=this.visitedRoute.filter((item)=>{
					if (this.$route.path==item.path) {
						return item
					}
				})[0]
				if (this.$route.path !== view.path) this.$router.push(view)
				return view
			},
			handleTabclick(tab) {
				const route = this.visitedRoute.filter((item, index) => {
					if (tab.index == index) {
						return item;
					}
				})[0];
				if (route.name!=this.$route.name) {
					this.visitedRoute.forEach(item => {
						if (item.name == this.activeTab) {
							this.$router.push(item.path)
						}
					})
				}
			},
			refreshPage(){
				this.$baseEventBus.$emit('reload-router-view')
				this.pulse = true
				setTimeout(() => {
				  this.pulse = false
				}, 1000)
			}
		},
	}
</script>

<style scoped lang="scss">
	.el-scrollbar{
		/deep/ .el-scrollbar__wrap{
			overflow-x: hidden;
		}
	}
	.el-container{
		height: 100%;
		.el-aside{
			background-color: #2f3447;
			.side-bar{
				.sys-logo{
					display: flex;
					justify-content: center;
					align-items: center;
					height: 8%;
					padding: 4px 6px;
					box-sizing: border-box;
					color: #fff;
				}
				.sider-bar-wrap{
					.el-scrollbar{
						/deep/ .el-scrollbar__wrap{
							margin-bottom:0 !important;
						}
					}
					
				}
			}
		}
		.el-container{
			.el-header{
				z-index: 9;
				box-shadow: 0 1px 4px #bbbbbb;
				.fixed-header {
					// height: 115px;
					// padding: 4px 6px;
					// box-shadow: 0 1px 4px #bbbbbb;
					// background-color: #efefef;
					.nav-bar {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 60px;
						// padding: 6px 8px;
				
						.breadcrumb-wrap {
							display: flex;
							justify-content: start;
							align-items: center;
				
							.breadcrumb {
								padding-left: 0.625rem;
				
								ul {
									display: flex;
									justify-content: start;
									list-style: none;
									padding: 0;
				
									li {
										box-sizing: border-box;
										padding: 6px 10px;
										border: 1px solid #999;
									}
								}
							}
						}
				
						.right-element {
							display: flex;
							align-items: center;
							justify-content: end;
							.userAction{
								display: flex;
								// justify-content: space-around;
								i{
									cursor: pointer;
									padding: 4px;
									box-sizing: border-box;
								}
							}
							// div {
							// 	padding: 0 4px;
							// 	&:hover {
							// 		background-color: #999;
							// 		transition: border-color .3s, background-color .3s, color .3s;
							// 	}
							// }
				
							.avatar {
								display: flex;
								align-items: center;
								cursor: pointer;
								&:hover {
									background-color: unset;
								}
				
								.user-info {
									display: flex;
									align-items: center;
									.avatar-button{
										display: flex;
										justify-content: start;
										align-items: center;
									}
								}
							}
						}
				
					}
				
					.tab-bar {
						display: flex;
						// justify-content: space-between;
						align-items: center;
						border-top: 1px solid #e8e8e8;
						box-sizing: border-box;
				
						.tabs-wrap {
							padding: 6px 0px;
							width: calc(100% - 85px);
							/deep/ .el-tabs__header {
								margin: 0;
							}
							/deep/ .el-tabs__item.is-active{
								border: 1px solid #409EFF;
							}
							.el-tabs{
								/deep/ .el-tabs__header{
									border: none;
									.el-tabs__nav{
										border: 1px solid #E4E7ED;
									}
								}
							}
						}
						.tabs-more-action{
							width: 75px;
							padding-left: 10px;
						}
						.el-dropdown{
							white-space: nowrap;
							cursor: pointer;
							.el-dropdown-link{
								display: flex;
								justify-content: start;
								align-items: center;
							}
						}
					}
					
				}
			}
		}
	}
	
	.layout-wrap {
		position: relative;
		height: 100%;

		.side-bar {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 256px;
			color: #fff;
			background-color: #2f3447;

			.sys-logo {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 8%;
				padding: 4px 6px;
				box-sizing: border-box;
				span {
					font-size: 26px;
				}
			}
			.sider-bar-wrap{
				height: 92%;
				.sider-bar-wrap-inner{
					height: 100%;
				}
			}
		}

		.main-content {
			padding-left: 256px;
			height: 100%;

			
		}
	}
</style>
