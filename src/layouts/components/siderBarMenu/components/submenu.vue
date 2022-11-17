<template>
	<el-submenu :index="item.name" v-if="item.name">
      <template slot="title">
		  <i :class="item.meta.icon"></i>
		  <span>{{item.meta.title}}</span>
	  </template>
      <!-- <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item> -->
	  <slot />
    </el-submenu>
</template>

<script>
	import siderBarItem from '@/layouts/components/siderBarMenu/components/siderBarItem.vue'
	export default {
		props: {
			item: {
				type: Object,
				default: null
			},
		},
		components: {
			siderBarItem
		},
		data() {
			return {
				// key: value
			}
		},
		mounted() {
			// console.log("sub",this.item);
		}
		
	}
</script>

<style scoped>

</style>