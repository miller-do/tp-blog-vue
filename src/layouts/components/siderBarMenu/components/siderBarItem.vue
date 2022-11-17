<template>
	<component
	:is="menuComponent"
	:item="item"
	v-if="!item.hidden"
	:full-path="fullPath"
	:router-children="routeChildren"
	>
		<template v-if="item.children">
			<sider-bar-item
			v-for="route in item.children"
			:key="route.path"
			:item="route"
			:full-path="handleFullPath(route.path)"
			></sider-bar-item>
		</template>
	</component>
</template>

<script>
	import siderBarItem from '@/layouts/components/siderBarMenu/components/siderBarItem.vue'
	import menuItem from '@/layouts/components/siderBarMenu/components/menuItem.vue'
	import submenu from '@/layouts/components/siderBarMenu/components/submenu.vue'
	import path from 'path'
	export default {
		name:"siderBarItem",//没有将报warn:Unknown custom element: <sider-bar-item> - did you register the component correctly? For recursive components, make sure to provide the "name" option.
		props: {
			item: {
				type: Object,
				default: null
			},
			fullPath:{
				type: String,
				default: null
			},
		},
		components: {
			siderBarItem,
			menuItem,
			submenu
		},
		computed: {
			menuComponent() {
				if (this.handleChildren(this.item.children,this.item) && (!this.routeChildren.children || this.routeChildren.notShowChildren)) {
					return 'menuItem'
				}else{
					return 'submenu'
				}
				
			},
		},
		mounted() {
			// console.log("this.item",this.item);
			// console.log("this.fullPath111111111111",this.fullPath);
		},
		methods: {
			//操作子路由
			handleChildren(children,parent){
				if (!children) children = []
				const showChildren=children.filter(item=>{
					if (item.hidden) {
						return false;
					}else{
						this.routeChildren=item;
						return true;
					}
				})
				if (showChildren.length==1) {
					return true;
				}
				if (showChildren.length==0) {
					this.routeChildren = {
					  ...parent,
					  path: '',
					  notShowChildren: true,
					}
					return true
				}
				return false;
			},
			handleFullPath(routePath){
				// console.log("fullpath111111111111",routePath);
				// console.log("path",this.item.path);
				let fatherPath=this.item.path;
				return path.resolve(fatherPath,routePath);
			}
		},
	}
</script>

<style scoped>

</style>