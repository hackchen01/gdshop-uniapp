<template>
	<view class="register-box">
		<view class="wrapper">
		    <view class="form">
				<u-form :model="form" ref="uForm" label-width="180" label-align="right" :error-type="['message']">
					<u-form-item label="邮箱" prop="email">
						<u-input v-model="form.email" placeholder="请输入邮箱" />
					</u-form-item>
					<u-form-item label="验证码" prop="vcode">
						<u-input v-model="form.vcode" placeholder="请输入验证码" maxlength="6"/>
						<view class="" slot="right">
							<u-button size="mini" shape="circle"
							type="error" :disabled="!emailIsOk"
							@click="getCode">{{tips}}</u-button>
						</view>
					</u-form-item>
					<u-form-item label="新密码" prop="password">
						<u-input type="password" v-model="form.password" placeholder="请输入新密码" />
					</u-form-item>
				</u-form>
			</view>
			
			<button class="confirm-btn" :class="isDisable ? 'disable':''" @click="toSubmit">
				<u-loading mode="flower" :show="isLoading"></u-loading>	确定
			</button>
			<view style="margin-top: 32px;text-align: center">
				<view style="margin-top: 30rpx;">
					<text style="color: #e10a07" @click="login()">返回登录</text>
				</view>
			</view>
		</view>
		<u-verification-code :seconds="seconds" ref="uCode"
		change-text="X秒后重新获取"
				@change="codeChange"></u-verification-code>
	</view>
</template>

<script>
	import utils from '@/utils/index.js'
	export default {
		computed:{
			emailIsOk(){
				return this.$u.test.email(this.form.email)
			},
			isDisable(){
				return !this.$u.test.email(this.form.email) ||
				!this.$u.test.code(this.form.vcode, 6) ||
				!this.$u.test.rangeLength(this.form.password,[6,16]) || 
				this.isLoading;
			}
		},
	    data() {
	        return {
				tips: '',
				seconds: 60,
				isAgree:false,
				rules:{
					email:[{
						required: true, 
						message: '请输入邮箱',
						trigger: ['change','blur']
					},
					{
						// 自定义验证函数
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
							return this.$u.test.email(value);
						},
						message: '邮箱格式不符合',
						// 触发器可以同时用blur和change
						trigger: ['change','blur'],
					}
					],
					vcode:[
						{
							required: true, 
							message: '请输入验证码',
							trigger: ['change','blur']
						},
						{
							type: 'number',
							message: '验证码只能为数字',
							trigger: ['change','blur'],
						}
					],
					password:[
						{
							required: true, 
							message: '请输入密码',
							trigger: ['change','blur']
						},
						{
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								// 邮箱验证码吧,手机验证码要钱
								return this.$u.test.rangeLength(value,[6,16]);
							},
							message: '密码长度在6-15个字符之间',
							trigger: ['change','blur'],
						}
					]

				},
				form:{
					email: '',
					vcode: '',
					password: '',
				},
				isLoading: false
	        }
	    },
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
	    methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在发送验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						// 通知验证码组件内部开始倒计时
						this.$api.user.askCode(this.form.email,'reset')
						.then(res =>{
							this.$refs.uCode.start();
							this.$u.toast('验证码已发送,请在三分钟内输入验证码');
							console.log(res)
						}).catch(err =>{
							// 邮箱不存在则发送不了邮件 catch error
							this.$u.toast(err.data.message);
							console.log(err)
						})
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
	        login() {
	           this.$myRouter.push({name:'index/login'})
	        },
			resetPassword(){
				this.$api.user.resetPassword({
					email:this.form.email,
					code:this.form.vcode,
					password:this.form.password
				})
				.then(res=>{
					this.$u.toast("重置密码成功,准备跳转登录页面");
					setTimeout(()=>{
						this.$myRouter.push({name:'index/login'})
					}, 3000);
				})
				.catch(err =>{
					this.$u.toast(err.data.message);
				})
			},
	        toSubmit() {
	        	let that = this
	        	if(that.isDisable || that.isLoading){
	        		return false
	        	}
	        	that.isLoading = true
	            that.$refs.uForm.validate(valid => {
	        		if (valid) {
						that.resetPassword()
	        			// console.log('验证通过');
	        		} else {
	        			console.log('验证失败');
	        		}
	        		
	        		setTimeout(function() {
	        			that.isLoading = false
	        		}, 3000);
	        	});
	        },
	    },
	
	}
</script>

<style lang="scss" scoped>
    @import '@/static/css/login.scss';
</style>
