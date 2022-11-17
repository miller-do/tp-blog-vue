<template>
	<el-col class="tab-content-wrap" :span="24" v-if="routerView">
		<!-- <div class="sys-ad">
			通知公告
		</div> -->
		<transition mode="out-in" name="fade-transform">
		  <keep-alive :include="cachedRoutes" max="99">
			<router-view :key="key" class="app-main-height" />
		  </keep-alive>
		</transition>
		<!-- <el-col :span="24" class="tab-content">
			<el-scrollbar class="scrollbar" style="height:100%">
				<transition mode="out-in" name="fade-transform">
				  <keep-alive :include="cachedRoutes" max="99">
				    <router-view :key="key" class="app-main-height" />
				  </keep-alive>
				</transition>
			</el-scrollbar>	
		</el-col> -->
	</el-col>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				routerView:true,
			}
		},
		created() {
			//重载所有路由
			this.$baseEventBus.$on('reload-router-view', () => {
			  this.routerView = false
			  // console.log("全局事件总线",this.routerView);
			  this.$nextTick(() => {
				//在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
			    this.routerView = true
			  })
			})
			console.log("this.$baseEventBus",this.$baseEventBus);
			//调用: this.$baseEventBus.$emit('reload-router-view')
		},
		computed: {
			...mapState(['visitedRoute']),
			key() {
			  return this.$route.path
			},
			cachedRoutes() {
			  const cachedRoutesArr = []
			  this.visitedRoute.forEach((item) => {
			    if (!item.meta.noKeepAlive) {
			      cachedRoutesArr.push(item.name)
			    }
			  })
			  return cachedRoutesArr
			},
		},
	}
</script>

<style scoped lang="scss">
	.tab-content-wrap {
		// padding: 4px 6px;
	}
	
	/deep/ .el-tabs--card>.el-tabs__header {
		border-bottom: 0;
	}
	
	/deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav {
		border-bottom: 1px solid #E4E7ED;
	}
</style>