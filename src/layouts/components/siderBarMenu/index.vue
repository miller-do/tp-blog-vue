<template>
	<el-scrollbar class="scrollbar" style="height:100%">
		<el-menu :default-active="activeMenu" class="el-menu-vertical-demo" background-color="#545c64"
			text-color="#fff" active-text-color="#ffd04b" router @open="handleOpen" @close="handleClose"
			@select="handleSelect">
			<template v-for="item in listSiderMenu">
				<sider-bar-item
				:item="item"
				:full-path="item.path"
				></sider-bar-item>
			</template>
			
			<!-- <el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span>配置</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/personalManage/userManage">用户管理</el-menu-item>
					<el-menu-item index="/personalManage/roleManage" route="">角色管理</el-menu-item>
					<el-menu-item index="1-3">菜单管理</el-menu-item>
				</el-menu-item-group>
				<el-submenu index="1-4">
					<template slot="title">选项4</template>
					<el-menu-item index="1-4-1">选项1</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-menu-item index="2">
				<i class="el-icon-menu"></i>
				<span slot="title">导航二</span>
			</el-menu-item> -->
		</el-menu>
	</el-scrollbar>
</template>

<script>
	import {mapState} from 'vuex'
	import siderBarItem from '@/layouts/components/siderBarMenu/components/siderBarItem.vue'
	export default {
		components: {
			siderBarItem
		},
		props: {
			activeMenu: {
				type: String,
				default: null
			},
		},
		data() {
			return {
				// key: value
			}
		},
		computed: {
			...mapState(['listSiderMenu'])
		},
		mounted() {
			// console.log("activeMenu-----",this.activeMenu);
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			handleSelect(data) {
				// console.log("handleSelect11111111", data)
			},
		},
	}
</script>

<style scoped lang="scss">
	.scrollbar{
		/deep/ .el-scrollbar__wrap{
			overflow-x: hidden;
		}
	}
</style>