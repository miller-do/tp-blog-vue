<template>
	<el-menu-item :index="handlePath(routerChildren.path)">
		<i :class="routerChildren.meta.icon"></i>
	    <span slot="title">{{routerChildren.meta.title}}</span>
	</el-menu-item>
</template>

<script>
	import path from 'path';
	export default {
		props: {
			routerChildren:{
				type: Object,
				default: null
			},
			item: {
				type: Object,
				default: null
			},
			fullPath:{
				type: String,
				default: null
			}
		},
		data() {
			return {
				// key: value
			}
		},
		mounted() {
			// console.log("routerChildren",this.routerChildren.path);
			// console.log("path",path);
		},
		methods: {
			handlePath(routePath){
			  // if (isExternal(routePath)) {
			  //   return routePath
			  // }
			  // if (isExternal(this.fullPath)) {
			  //   return this.fullPath
			  // }
			  return path.resolve(this.fullPath, routePath)
			},
		},
	}
</script>

<style scoped>

</style>