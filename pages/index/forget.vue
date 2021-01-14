<template>
	<view class="register-box">
		<view class="wrapper">
		    <view class="form">
				<u-form :model="form" ref="uForm" label-width="180" label-align="right" :error-type="['border-bottom','toast']">
					<u-form-item label="手机号" prop="mobile">
						<u-input v-model="form.mobile" placeholder="请输入账号" />
					</u-form-item>
					<u-form-item label="验证码" prop="vcode">
						<u-input v-model="form.vcode" placeholder="请输入验证码" />
						<view class="" slot="right">
							<u-button size="mini" shape="circle"
							type="error" :disabled="!mobileIsOk"
							@tap="getCode">{{tips}}</u-button>
						</view>
					</u-form-item>
					<u-form-item label="密码" prop="password">
						<u-input type="password" v-model="form.password" placeholder="请输入密码" />
					</u-form-item>
					<u-form-item label="确认密码" prop="password2">
						<u-input type="password" v-model="form.password2" placeholder="请输入确认密码" />
					</u-form-item>
				</u-form>
			</view>
			
			<button class="confirm-btn" :class="isDisable ? 'disable':''" @click="toSubmit">
				<u-loading mode="flower" :show="isLoading"></u-loading>	找回密码
			</button>
		</view>
		<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode"
		change-text="X秒后重新获取"
				@change="codeChange"></u-verification-code>
	</view>
</template>

<script>
	import utils from '@/utils/index.js'
	export default {
		computed:{
			mobileIsOk(){
				return this.$u.test.mobile(this.form.mobile)
			},
			isDisable(){
				return this.form.mobile.length < 1 || 
				this.form.vcode.length < 1 || 
				this.form.password.length < 1 || 
				this.form.password2.length < 1 || 
				this.isLoading;
			}
		},
	    data() {
	        return {
				tips: '',
				seconds: 10,
				isAgree:true,
				rules:{
					mobile:[{
						required: true, 
						message: '请输入账号',
						trigger: ['change','blur']
					},
					{
						// 自定义验证函数
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change
						trigger: ['change','blur'],
					}
					],
					vcode:{
						required: true, 
						message: '请输入验证码',
						trigger: ['change','blur']
					},
					password:{
						required: true, 
						message: '请输入密码',
						trigger: ['change','blur']
					},
					password2:[
						{
							required: true, 
							message: '请输入确认密码',
							trigger: ['change','blur']
						},
						{
							// 自定义验证函数
							validator: (rule, value, callback) => {
								return this.form.password == this.form.password2
							},
							message: '二次密码不一致',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						},
					],
				},
				form:{
					mobile: '',
					vcode: '',
					password: '',
					password2: '',
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
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						this.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				this.$u.toast('倒计时结束');
			},
			start() {
				this.$u.toast('倒计时开始');
			},
	        forget() {
	            uni.navigateTo({
	                url: '/pages/public/pwd'
	            });
	        },
	        register() {
	            uni.navigateTo({
	                url: '/pages/public/register'
	            });
	        },
	        toSubmit() {
	        	let that = this
	        	if(that.isDisable || that.isLoading){
	        		return false
	        	}
	        	that.isLoading = true
	            that.$refs.uForm.validate(valid => {
	        		if (valid) {
	        			console.log('验证通过');
	        		} else {
	        			console.log('验证失败');
	        		}
	        		
	        		setTimeout(function() {
	        			that.isLoading = false
	        		}, 3000);
	        	});
	        },
			gotoArticle(_type){
				utils.article.gotoArticle(_type)
			},
	    },
	
	}
</script>

<style lang="scss" scoped>
    @import '@/static/css/login.scss';
</style>
