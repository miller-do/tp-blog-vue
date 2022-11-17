<template>
	<el-col :span="24">
		<el-row>
			<el-col :span="24">
				<el-button type="primary" size="small" @click="addCate">新增</el-button>
				<el-button type="danger" size="small" @click="delCates">删除</el-button>
				<el-button type="success" size="small" @click="importCates">导入</el-button>
				<el-button type="warning" size="small" plain @click="sort">排序</el-button>
			</el-col>
		</el-row>
		<el-table
		      :data="cateList"
			  @selection-change="selectData"
		      style="width: 100%">
			  <el-table-column
			        type="selection"
			        width="55">
			  </el-table-column>
			  <el-table-column
			    prop="id"
			    label="id"
			    width="180">
			  </el-table-column>
			  <el-table-column
			    prop="catename"
			    label="栏目名称"
			    width="180">
			  </el-table-column>
			  <el-table-column
			    prop="pid"
			    label="上级菜单"
			    width="180">
			  </el-table-column>
			  <el-table-column
			    prop="url"
			    label="url"
			    width="180">
			  </el-table-column>
			  <el-table-column
			    prop="is_hide"
			    label="隐藏"
			    width="180">
			  </el-table-column>
		      <el-table-column
		        prop="create_time"
		        label="创建日期"
		        width="180">
		      </el-table-column>
		      <el-table-column
		        prop="sort"
		        label="排序">
		      </el-table-column>
			  <el-table-column
			    prop=""
			    label="操作">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="editCate(scope.row)">编辑</el-button>
					<el-button @click="delCate(scope.row)" type="text" size="small">删除</el-button>
				</template>
			  </el-table-column>
		    </el-table>
			
			<el-pagination
				  background
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
				  @prev-click="prevClick"
				  @next-click="nextClick"
			      :current-page="1"
			      :page-sizes="pageSizes"
			      :page-size="pageSize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="total">
			</el-pagination>
			
			<cate-action ref="dialogForm" @initList="initTableInfo"></cate-action>
	</el-col>
</template>

<script>
	import {catesLis,delCate} from '@/api/cateManage.js'
	import cateAction from './component/cateAction.vue'
	export default {
		components: {
			cateAction
		},
		data() {
			return {
				cateList: null,
				pageIndex:1,
				total:null,
				pageSize:null,
				pageSizes:[10, 20, 30, 40, 2],
				params:{
					pageIndex:1,
					pageSize:null,
					total:null,
				},
				catesPick:[],
			}
		},
		created() {
			this.params.pageSize=this.pageSizes[0];
			this.getlist(this.params);
		},
		methods: {
			initTableInfo(){
				this.getlist(this.params);
			},
			async getlist(pageIndex) {
				const {data}= await catesLis(pageIndex);
				console.log("res",data);
				if (data.code==200) {
					this.cateList=data.data.list;
					this.cateList.filter((item)=>{
						item.is_hide=item.is_hide==1?'是':'否'
					})
					this.total=data.data.total;
					this.pageSize=data.data.size
				}else{
					this.$message({
						type: 'error',
						message: data.msg
					});
				}
			},
			async addCate(){
				this.$refs['dialogForm'].editInfo();
			},
			
			async editCate(row){
				console.log("Data",row);
				this.$refs['dialogForm'].editInfo(row);
			},
			
			fetchData(){
				console.log('fetch-data');
			},
			
			//批量删除
			async delCates(data){
				if (this.catesPick.length>0) {
					// console.log("this.catesPick",this.catesPick);
					let ids=[];
					this.catesPick.forEach((item,index)=>{
						ids.push(item.id)
					})
					console.log(ids);
					const res = await delCate(ids);
					console.log("res",res);
					if (res.data.code==200) {
						this.$message({
							type: 'success',
							message: res.data.msg
						});
						this.initTableInfo();
					}else{
						this.$message({
							type: 'error',
							message: res.data.msg
						});
						this.initTableInfo();
					}
					
				}else{
					this.$message({
					  message: '请选择要删除数据',
					  type: 'warning'
					});
				}
			},
			importCates(){
				console.log("data122");
			},
			sort(){
				console.log("data133");
			},
			
			//单一删除
			delCate(data){
				console.log("Data",data);
				this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(async () => {
				  const res = await delCate(data.id);
				  console.log("Res",res);
				  this.$message({
					type: 'success',
					message: res.data.msg
				  });
				  setTimeout(()=>{
					  this.initTableInfo();
				  },500)
				  
				}).catch(() => {
				  this.$message({
					type: 'info',
					message: '已取消删除'
				  });          
				});
			},
			prevClick(data){
				this.params.pageIndex=data;
			},
			nextClick(data){
				this.params.pageIndex=data;
			},
			handleSizeChange(data){
				this.params.pageSize=data;
				console.log("this.params",this.params);
				this.getlist(this.params);
			},
			handleCurrentChange(data){
				this.params.pageIndex=data;
				this.getlist(this.params);
			},
			selectData(selection){
				this.catesPick = selection;
			}
		},
	}
</script>

<style scoped lang="scss">

</style>