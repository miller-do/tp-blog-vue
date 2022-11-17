<template>
	<el-col :span="24">
		<el-col :span="24">
			<el-button type="success" icon="el-icon-plus" size="small">添加</el-button>
			<el-button type="danger" icon="el-icon-minus" size="small">批量删除</el-button>
		</el-col>
		<el-table ref="multipleTable" :data="list" tooltip-effect="dark" style="width: 100%"
			@selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="id" label="id" width="120">
			</el-table-column>
			<el-table-column prop="username" label="账号" width="120">
			</el-table-column>
			<el-table-column label="管理级别" width="120">
				<template slot-scope="scope">{{ scope.row.is_super }}</template>
			</el-table-column>
			<el-table-column prop="create_time" label="创建时间" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="" label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					<!-- <el-button type="text" size="small" @click="editCate(scope.row)">编辑</el-button>
					<el-button @click="delCate(scope.row)" type="text" size="small">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="paginationOption.currentPage"
		      :page-sizes="paginationOption.pageSizes"
		      :page-size="paginationOption.pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="paginationOption.total">
		</el-pagination>
		<!-- <button ref="tar" type="button" name="button" @click="testClick">{{content}}</button> -->
	</el-col>
</template>

<script>
	import {
		getAdminList
	} from '@/api/user.js'
	export default {
		data() {
			return {
				content: '初始值',
				list: [],
				paginationOption:{
					pageSizes:[100, 200, 300, 400],
					pageSize:100,
					total:400,
					currentPage:1
				},
			}
		},
		created() {
			this.getlist();
		},
		methods: {
			async getlist() {
				const {
					data
				} = await getAdminList();
				console.log("Res", data);
				if (data.code == 200) {
					this.list = data.data
				} else {

				}
			},
			testClick() {
				this.content = '改变了的值'
				console.log("初始值", this.$refs.tar.innerText);
				//第一次点击，获取到的还是初始的dom数据
				//this.$nextTick 将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用它，然后等待DOM更新。
				// this.$nextTick这个方法作用是，当数据被修改后使用这个方法，会回调获取更新后的dom再渲染出来
				this.$nextTick(() => {
					// dom元素更新后执行，因此这里能正确打印更改之后的值
					console.log("改变了的值", this.$refs.tar.innerText)
				})
			},
			handleSelectionChange(data) {
				console.log('data', data);
			}
		},
	}
</script>

<style scoped>

</style>
