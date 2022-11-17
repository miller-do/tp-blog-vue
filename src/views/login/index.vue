<template>
	<div class="customize-size page-wrap">
		<div  class="customize-size">
			<video ref="video" src="../../assets/video/birds.mp4" muted="muted" loop="loop" preload="" autoplay="autoplay" style="width: 100%;height: 100%;"></video>
		</div>
		<el-row class="nav-wrap">
			<el-col :span="12" class="logo">
				<img src="../../assets/images/begood.png" alt="" style="width: 50px;">
				<span class="logo-name">比谷科技</span>
			</el-col>
			<el-col :span="12">
				<el-button-group class="action-wrap">
					<el-button type="primary">登录</el-button>
					<el-button type="warning">注册</el-button>
				</el-button-group>
			</el-col>
		</el-row>
		<el-row class="">
			
		</el-row>
		<div class="login-form">
			<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="账号登录" name="first">
					<el-form ref="form" :model="form" label-position="right" label-width="80px">
					   <el-form-item label="用户名">
					     <el-input v-model="form.username" placeholder="请输入用户名/手机号"></el-input>
					   </el-form-item>
					   <el-form-item label="密码">
					     <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
					   </el-form-item>
					</el-form>
				</el-tab-pane>
			    <el-tab-pane label="手机登录" name="second">
					<el-form ref="form" :model="form" label-position="right" label-width="80px">
					   <el-form-item label="手机号">
					     <el-input v-model="formTel.tel" placeholder="请输入手机号"></el-input>
					   </el-form-item>
					   <el-form-item label="验证码">
					     <el-input v-model="formTel.captcha" placeholder="请输入验证码"></el-input>
					   </el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
			<el-row style="margin-bottom: 22px;">
				<el-row style="margin-bottom: 22px;">
				  <el-col :span="12">
					  <el-checkbox v-model="checked">下次自动登录</el-checkbox>
				  </el-col>
				  <el-col :span="12">
					  <span>忘记密码?</span>
				  </el-col>
				</el-row>
				<el-button type="primary" style="width:100%;" @click="login">登录</el-button>
			</el-row>
			<div class="">
				<el-row>
					<el-col :span="12">
						<span>第三方登录</span><span>wechat</span><span>QQ</span>
					</el-col>
					<el-col :span="12">
						<span>注册帐号</span>
					</el-col>
				</el-row>
			</div>
			
		</div>
		<div class="bottom-info">
			<div>联系邮箱sohump@sohu-inc.com</div>
			<div>
				关于我们 修炼指南 服务协议 侵权投诉 联系方式 Copyright © 2019 Begu All Rights Reserved.
			</div>
		</div>
	</div>
</template>

<script>
	import { loginApi } from '@/api/user'
	export default {
		data() {
			return {
				form: {
					username:"",
					password:""
				},
				formTel:{
					username:"",
					password:""
				},
				activeName:null,
				checked:false,
				redirect:null,
			}
		},
		watch: {
		  $route: {
		    handler(route) {
			  console.log("route",route)
		      this.redirect = (route.query && route.query.redirect) || '/'
		    },
		    immediate: true,
		  },
		},
		mounted() {
			this.activeName="first";
		},
		methods: {
			async login(){
				// let param={
				// 	username:"admin",
				// 	password:"admin"
				// }
				// console.log("this.form",this.form);
				const res=await loginApi(this.form);
				if (res.data.code==200) {
					this.$message({
					  message: res.data.msg,
					  type: 'success'
					});
					const {data}=res.data;
					this.$store.commit('setAccessToken', data)
					// console.log("this.$store",this.$store.state.accessToken);
					const routerPath ='index'//this.redirect === '/404' || this.redirect === '/401'? '/': this.redirect
					console.log("routerPath",routerPath);
					this.$router.push(routerPath).catch(() => {})
				}else{
					this.$message({
					  message: res.data.msg,
					  type: 'error'
					});
				}
			},
			handleClick(d){
				console.log("2222",d);
			}
		},
	}
</script>

<style scoped lang="scss">
	.bottom-info{
		position: absolute;
		left: 50%;
		bottom: 10px;
		margin-left: -322.3px;
	}
	.nav-wrap{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		width: 100%;
		background-color: rgba(255,255,255,0.5);
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0px 1px 3px #cdcdcd;
	}
	.logo{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 6px 30px;
		.logo-name{
			color: red;
		}
	}
	.logo-name{
		font-size: 20px;
		font-weight: bolder;
		/* color: #fff; */
	}
	.action-wrap{
		display: flex;
		justify-content: flex-end;
		padding: 0 30px;
	}
	.page-wrap{
		position: relative;
	}
	.login-form{
		position: absolute;
		top: 20%;
		right: 16%;
		padding: 20px 40px;
		background-color: rgba(255,255,255,0.5);
		border-radius: 6px;
		font-size: 14px;
		user-select: none;
	}
	.customize-size{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}
	video{
		object-fit: cover;
	}
</style>