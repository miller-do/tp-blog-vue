<template>
	<el-col :span="24">
		<el-dialog 
		:title="title" 
		:visible.sync="isShowCateForm" 
		:close-on-click-modal="false"
		@close="close"
		>
		  <el-form :model="formData" ref="form">
			<el-form-item label="所属栏目" :label-width="formLabelWidth">
			   <!-- <el-input v-model="formData.cate" autocomplete="off"></el-input> -->
			   <el-select v-model="selectData" filterable placeholder="请选择" @change="handleSelect">
			      <el-option
			        v-for="item in catelist"
			        :key="item.value"
			        :label="item.label"
			        :value="item.value">
			      </el-option>
			    </el-select>
			</el-form-item>
			  
		    <el-form-item label="标题" :label-width="formLabelWidth">
		      <el-input placeholder="请输入标题" v-model="formData.title" autocomplete="off"></el-input>
		    </el-form-item>
			<el-form-item label="作者" :label-width="formLabelWidth">
			  <el-input placeholder="请输入作者" v-model="formData.author" autocomplete="off"></el-input>
			</el-form-item>
			
			<el-form-item label="内容" :label-width="formLabelWidth">
			  <quill-editor ref="text" v-model="formData.content" class="myQuillEditor ql-editor" :options="editorOption" />
			  <!-- <el-button type="primary" @click="submit">提交</el-button> -->
			</el-form-item>
			
			<el-form-item label="概要" :label-width="formLabelWidth">
			  <el-input type="textarea" :rows="2" autosize resize="none" placeholder="请输入概要" v-model="formData.desc" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="标签" :label-width="formLabelWidth">
			  <el-input placeholder="多个标签请用 , 间隔开" v-model="formData.tags" autocomplete="off"></el-input>
			</el-form-item>
			
			<el-form-item label="封面" :label-width="formLabelWidth">
			  <el-upload
			    class="avatar-uploader"
			    action="http://localhost/tp-yycms/public/index.php/admin/article/upload/"
				:http-request="getUploadUrl"
			    :show-file-list="false"
			    :on-success="handleAvatarSuccess"
			    :before-upload="beforeAvatarUpload">
				<el-image v-if="thumbChange" :src="thumbBlob" class="avatar" fit="cover"></el-image>
				<el-image v-else-if="formData.thumb" :src="formData.thumb" class="avatar" fit="cover"></el-image>
			    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			  </el-upload>
			</el-form-item>
			
			<el-form-item label="是否启用" :label-width="formLabelWidth">
			  <!-- <el-input v-model="formData.is_open" autocomplete="off"></el-input> -->
			  <el-switch
			    v-model="isopen"
			    active-color="#13ce66"
			    inactive-color="#ff4949"
				@change="handleOpen"
				>
			  </el-switch>
			</el-form-item>
			<el-form-item label="是否推荐" :label-width="formLabelWidth">
			  <!-- <el-select v-model="formData.isHide" placeholder="请选择活动区域">
			    <el-option label="是" value="0"></el-option>
				<el-option label="否" value="1"></el-option>
			  </el-select> -->
			  <el-switch
			    v-model="istop"
			    active-color="#13ce66"
			    inactive-color="#ff4949"
				@change="handleHide"
				>
			  </el-switch>
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
	import {addArticle,editArticle,uploadThumb,getcates} from '@/api/articleManage.js'
	import { quillEditor } from 'vue-quill-editor'
	let toolbar=[
		['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
		['blockquote', 'code-block'], //引用，代码块
		[{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
		[{ list: 'ordered' }, { list: 'bullet' }], //列表
		[{ script: 'sub' }, { script: 'super' }], // 上下标
		[{ indent: '-1' }, { indent: '+1' }], // 缩进
		[{ direction: 'rtl' }], // 文本方向
		[{ size: ['small', false, 'large', 'huge'] }], // 字体大小
		[{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
		[{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
		[{ font: [] }], //字体
		[{ align: [] }], //对齐方式
		['clean'], //清除字体样式
		['image'], //上传图片、上传视频 ['image', 'video']
	]
	export default {
		components: {
			quillEditor
		},
		data() {
			return {
				isShowCateForm:false,
				formLabelWidth: '120px',
				formData:{
					title:"",
					cate:"",
					is_open:0,
					is_top:0,
					content: '',
					thumb:'',
					fileData:'',
				},
				selectData:null,
				catelist:[],
				cateValue:'',
				thumbChange:false,
				thumbBlob:'',
				title:"",
				istop:false,
				isopen:false,
				editorOption: {//图片上传配置参数
					action: '/api/product/richtext_img_upload.do', // 必填参数 图片上传地址
					methods: 'post', // 必填参数 图片上传方式
					token: '', // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
					name: 'upload_file', // 必填参数 文件的参数名
					size: 500, // 可选参数 图片大小，单位为Kb, 1M = 1024Kb
					accept: 'multipart/form-data, image/png, image/gif, image/jpeg, image/bmp, image/x-icon,image/jpg' ,// 可选 可上传的图片格式
					// 编辑器配置
					placeholder: '请输入内容',
					// theme: "snow",
					modules: {
					  toolbar,
					},
				},
			}
		},
		created() {
			// console.log("this.formData",this.formData);
			this.getcates();
		},
		watch: {
			istop(newValue, oldValue) {
				newValue==true?this.formData.is_top="1":this.formData.is_top='0'
			},
			isopen(newValue, oldValue) {
				newValue==true?this.formData.is_open="1":this.formData.is_open='0'
			}
		},
		methods: {
			async getcates(){
				const {data}=await getcates();
				// const res=await getcates();
				// console.log("Res11111",res);
				this.catelist= data.data;
			},
			
			handleSelect(data){
				console.log("选中的value",data);
				// if (this.formData.cate.id) {
				// 	this.selectData=this.formData.cate.id
				// }else{
				// 	this.selectData=data
				// }
			},
			
			async getUploadUrl(params){
				console.log("params",params);
				let data={
					file:params.file,
					uid:params.file.uid
				}
			},
			handleAvatarSuccess(res,file){
				this.thumbChange=true;
				this.thumbBlob = URL.createObjectURL(file.raw);
				console.log("this.thumbBlob",this.thumbBlob);
			},
			
			async beforeAvatarUpload(file) {
				// const isJPG = file.type === 'image/jpeg';
				// const isLt2M = file.size / 1024 / 1024 < 2;
				// if (!isJPG) {
				//   this.$message.error('上传头像图片只能是 JPG 格式!');
				// }
				// if (!isLt2M) {
				//   this.$message.error('上传头像图片大小不能超过 2MB!');
				// }
				// return isJPG && isLt2M;
				let fd = new FormData()
				console.log('file', file);
				fd.append('file', file)
				fd.append('groupId', this.groupId)
				console.log("fd",file);
				this.formData.fileData=file;
				// const res=await uploadThumb(fd);
				// console.log("Res",res);
			},
			handleHide(data){
				this.istop=data;
				// console.log("handleHide",this.istop);
				// this.formData.is_hide=!this.formData.is_hide
			},
			handleOpen(data){
				this.isOpen=data;
			},
			editInfo(row){
				console.log("row111111111",row);
				if (row) {
					this.title="编辑文章";
					this.formData=Object.assign({},row);
					this.istop=this.formData.is_top=="1"?true:false;
					this.isopen=this.formData.is_open=="1"?true:false;
					if (this.formData.cate.id) {
						this.selectData=this.formData.cate.id
					}else{
						this.selectData=null
					}
					console.log("this.formData",this.formData);
				}else{
					this.title="新增文章";
					this.istop=false;
					this.isopen=false;
					this.formData.content='';
					this.selectData=null;
					// this.$refs['form'].resetFields();
					// console.log("this.$options.data().formData",this.$options.data().formData);
					this.formData = this.$options.data().formData;
				}
				this.isShowCateForm=true;
			},
			close() {
				// this.$refs['form'].resetFields();
				// this.formData = this.$options.data().formData;
				this.isShowCateForm=false;
				this.thumbChange=false;
				// this.$emit('initList');
			},
			async confirm(){
				console.log("this.formData2222222",this.formData);
				console.log("this.selectData",this.selectData);
				// return;
				let fd = new FormData();
				fd.append('id',this.formData.id);
				fd.append('title', this.formData.title);
				fd.append('cate', this.selectData);
				fd.append('file', this.formData.fileData);
				fd.append('content', this.formData.content);
				fd.append('is_open', this.formData.is_open);
				fd.append('is_top', this.formData.is_top);
				fd.append('author', this.formData.author);
				fd.append('desc', this.formData.desc);
				fd.append('tags', this.formData.tags);
				if (this.title.indexOf('新增')>=0) {
					const res = await addArticle(fd);
					// console.log("res",res);
					if (res.data.code==200) {
						this.$message({
						  message: res.data.msg,
						  type: 'success'
						});
						this.isShowCateForm=false;
						this.$emit('initList');
						this.formData = this.$options.data().formData;
					}else{
						this.$message({
						  message: res.data.msg+","+res.data.data,
						  type: 'error'
						});
					}
					
				}else if(this.title.indexOf('编辑')>=0){
					const res = await editArticle(fd);
					// console.log("data",res);
					if (res.data.code==200) {
						this.$message({
						  message: res.data.msg,
						  type: 'success'
						});
						this.isShowCateForm=false;
						this.$emit('initList');
						this.formData = this.$options.data().formData;
					}else{
						this.$message({
						  message: res.data.msg+","+res.data.data,
						  type: 'error'
						});
					}
				}
				
			}
		},
	}
</script>

<style scoped lang="scss">
	.quill-editor{
		/deep/ .ql-container{
			height: 200px;
		}
	}
	.avatar-uploader{
		/deep/ .el-upload{
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
	}
	
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 80px;
	    height: 80px;
	    line-height: 80px;
	    text-align: center;
	  }
	  .avatar {
	    width: 100px;
	    height: 100px;
	    display: block;
	  }
	.ql-snow .ql-picker.ql-size .ql-picker-label::before, .ql-snow .ql-picker.ql-size .ql-picker-item::before{
		position: absolute;
	}
	
</style>