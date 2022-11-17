<template>
	<el-col :span="24">
		<el-row>
			<el-col :span="24">
				<el-button type="primary" size="small" @click="addArticle">新增</el-button>
				<el-button type="danger" size="small" @click="delCates">删除</el-button>
				<el-button type="success" size="small" @click="importlist">导入</el-button>
				<el-button type="warning" size="small" plain @click="sort">排序</el-button>
			</el-col>
		</el-row>
		<el-table
		      :data="dataList"
			  @selection-change="selectData"
		      style="width: 100%">
			  <el-table-column
			        type="selection"
			        width="55">
			  </el-table-column>
			  <el-table-column
			    prop="id"
			    label="id"
			    width="55">
			  </el-table-column>
			  <el-table-column
			    prop="thumb"
			    label="缩略图"
			    width="120">
					<template slot-scope="scope">
						<!-- <el-image :src="scope.row.thumb" class="avatar" fit="cover" style="width:44px;"></el-image> -->
						<el-popover placement="top-start" trigger="click"> <!--trigger属性值：hover、click、focus 和 manual-->
						      <a :href="scope.row.thumb" target="_blank" title="查看最大化图片">
						        <el-image :src="scope.row.thumb" style="width: 300px;"></el-image>
						      </a>
						    <el-image slot="reference" :src="scope.row.thumb"  class="avatar" fit="cover" style="width: 44px;height: 44px; cursor:pointer"></el-image>
						</el-popover>
					</template>
			  </el-table-column>
			  <el-table-column
			    prop="title"
				:show-overflow-tooltip="true"
			    label="标题">
			  </el-table-column>
			  <el-table-column
			    prop="author"
				width="80"
			    label="作者">
			  </el-table-column>
			  <!-- <el-table-column
			    prop="desc"
			    label="文章概要">
			  </el-table-column> -->
			  <el-table-column
			    prop="cate.catename"
			    label="所属栏目"
			    width="180">
			  </el-table-column>
			  <el-table-column
			    prop="clickcount"
			    label="点击次数"
				width="180">
			  </el-table-column>
			  <el-table-column
			    prop="is_open"
			    label="是否启用"
				:formatter="formatterOpen"
			    width="100">
			  </el-table-column>
			  <el-table-column
			    prop="is_top"
				label="是否推荐"
				:formatter="formatterTop"
				width="100">
			  </el-table-column>
		      <el-table-column
		        prop="create_time"
		        label="创建时间"
		        width="160">
		      </el-table-column>
			  <el-table-column
			    prop=""
			    label="操作"
				width="100">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="editArticle(scope.row)">编辑</el-button>
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
	import {articleLis,delArticle} from '@/api/articleManage.js'
	import cateAction from './component/cateAction.vue'
	export default {
		components: {
			cateAction
		},
		data() {
			return {
				dataList: [],
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
			async getlist(params) {
				const {data}= await articleLis(params);
				console.log("res",data);
				if (data.code==200) {
					this.dataList=data.data.list;
					this.total=data.data.total;
					this.pageSize=data.data.size;
				}else{
					this.$message({
						type: 'error',
						message: data.msg
					});
				}
			},
			
			formatterOpen(row, column, cellValue, index){
				if (row.is_open==0){
				    return "否";
				}else if (row.is_open==1){
				    return "是";
				}
			},
			formatterTop(row, column, cellValue, index){
				if (row.is_top==0){
				    return "否";
				}else if (row.is_top==1){
				    return "是";
				}
			},
			
			async addArticle(){
				this.$refs['dialogForm'].editInfo();
			},
			
			async editArticle(row){
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
					const res = await delArticle(ids);
					// console.log("res",res);
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
			importlist(){
				console.log("data122");
			},
			sort(){
				console.log("data133");
			},
			
			//单一删除
			async delCate(data){
				console.log("Data",data);
				this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(async () => {
				  const res = await delArticle(data.id);
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
	.el-table{
		/deep/ .el-table__cell{
			padding: 8px 0;
		}
	}
</style>