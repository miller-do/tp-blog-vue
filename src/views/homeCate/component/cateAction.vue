<template>
	<el-col :span="24">
		<el-dialog 
		:title="title" 
		:visible.sync="isShowCateForm" 
		:close-on-click-modal="false"
		@close="close"
		>
		  <el-form :model="formData" ref="form">
		    <el-form-item label="菜单名称" :label-width="formLabelWidth">
		      <el-input v-model="formData.catename" autocomplete="off"></el-input>
		    </el-form-item>
			<el-form-item label="上级菜单" :label-width="formLabelWidth">
			  <el-input v-model="formData.pid" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="url" :label-width="formLabelWidth">
			  <el-input v-model="formData.url" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="隐藏" :label-width="formLabelWidth">
			  <!-- <el-select v-model="formData.isHide" placeholder="请选择活动区域">
			    <el-option label="是" value="0"></el-option>
				<el-option label="否" value="1"></el-option>
			  </el-select> -->
			  <el-switch
			    v-model="ishide"
			    active-color="#13ce66"
			    inactive-color="#ff4949"
				@change="handleHide"
				>
			  </el-switch>
			</el-form-item>
		    <el-form-item label="排序" :label-width="formLabelWidth">
				<el-input v-model="formData.sort" autocomplete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="close">取 消</el-button>
		    <el-button type="primary" @click="confirm">确 定</el-button>
		  </div>
		</el-dialog>
	</el-col>
</template>

<script>
	import {addCate,editCate} from '@/api/cateManage.js'
	export default {
		data() {
			return {
				isShowCateForm:false,
				formLabelWidth: '120px',
				formData:{
					catename:"",
					pid:"",
					url:null,
					is_hide:null,
					sort:null,
				},
				title:"",
				ishide:false,
			}
		},
		created() {
			// console.log("this.formData",this.formData);
		},
		methods: {
			handleHide(data){
				this.ishide=data;
				// console.log("handleHide",this.ishide);
				// this.formData.is_hide=!this.formData.is_hide
			},
			editInfo(row){
				if (row) {
					this.title="编辑菜单";
					this.formData=Object.assign({},row);
					this.ishide=this.formData.is_hide=="是"?true:false;
				}else{
					this.title="新增菜单";
					this.ishide=false;
					// this.$refs['form'].resetFields();
					this.formData = this.$options.data().formData;
				}
				this.isShowCateForm=true;
			},
			close() {
				// this.$refs['form'].resetFields();
				// this.formData = this.$options.data().formData;
				this.isShowCateForm=false;
				// this.$emit('initList');
			},
			async confirm(){
				this.formData.is_hide = this.ishide;
				if (this.title.indexOf('新增')>=0) {
					const res = await addCate(this.formData);
					// console.log("res",res);
					if (res.data.code==200) {
						this.$message({
						  message: res.data.msg,
						  type: 'success'
						});
					}else{
						this.$message({
						  message: res.data.msg+","+res.data.data,
						  type: 'error'
						});
					}
					
				}else if(this.title.indexOf('编辑')>=0){
					const res = await editCate(this.formData);
					// console.log("data",res);
					if (res.data.code==200) {
						this.$message({
						  message: res.data.msg,
						  type: 'success'
						});
					}else{
						this.$message({
						  message: res.data.msg+","+res.data.data,
						  type: 'error'
						});
					}
				}
				this.formData = this.$options.data().formData;
				this.isShowCateForm=false;
				this.$emit('initList');
			}
		},
	}
</script>

<style scoped lang="scss">

</style>