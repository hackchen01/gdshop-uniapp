<template>
	<view class="register-box">
		<view class="wrapper">
		    <view class="form">
				<u-form :model="form" ref="uForm" label-width="180" label-align="right" :error-type="['message']">
					<u-form-item label="用户名" prop="username">
						<u-input v-model="form.username" placeholder="请输入用户名" />
					</u-form-item>
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
					<u-form-item label="密码" prop="password">
						<u-input type="password" v-model="form.password" placeholder="请输入密码" />
					</u-form-item>
				</u-form>
			</view>
			<view class="agree-box">
				<u-checkbox active-color="#F00"
					v-model="isAgree"
				>同意</u-checkbox>
				<!-- 协议地址 -->
				<!-- <view class="text" @click="gotoArticle('privacy_policy')">《隐私政策》</view> -->
				<!-- <view class="text">和</view> -->
				<!-- <view class="text" @click="gotoArticle('agreement')">《用户服务协议》</view> -->
				<view class="text" >《隐私政策》</view>
				<view class="text">和</view>
				<view class="text" >《用户服务协议》</view>
			</view>
			
			<button class="confirm-btn" :class="isDisable ? 'disable':''" @click="toSubmit()">
				<u-loading mode="flower" :show="isLoading"></u-loading>	注册
			</button>
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
			// 这个地方需要判定是否都验证ok才能放行
			isDisable(){
				return !this.$u.test.email(this.form.email) ||
				!this.$u.test.code(this.form.vcode, 6) || 
				!RegExp(/^[a-zA-Z][a-zA-Z0-9]{5,11}$/).test(this.form.username) ||
				// !this.$u.test.rangeLength(this.form.vcode,[6,7]) ||
				// 上面限制位数并且这里使用区间位数来限制字符串长度
				!this.isAgree ||
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
					username:[
						{
							required: true,
							message: '请输入用户名',
							trigger: ['change','blur']
						},
						{
							// 自定义验证函数
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								// 邮箱验证码吧,手机验证码要钱
								return RegExp(/^[a-zA-Z][a-zA-Z0-9]{5,11}$/).test(value);
							},
							message: '必须是字母开头的数字和字母的组合,长度在6-11范围内',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
					],
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
							// 邮箱验证码吧,手机验证码要钱
							return this.$u.test.email(value);
						},
						message: '邮箱格式不符合',
						// 触发器可以同时用blur和change
						trigger: ['change','blur'],
					}
					],
					vcode:
					[
						{
							required: true,
							message: '请输入验证码',
							trigger: ['change','blur'],
						},
						{
							type: 'number',
							message: '验证码只能为数字',
							trigger: ['change','blur'],
						}
					],
					password:
					[
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
					username:'',
					email: '',
					vcode: '',
					password: '',
				},
				isLoading: false
	        }
	    },
		// 页面初始化时候需要获取小程序的openid
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			// this.getOpenId()
		},
	    methods: {
			codeChange(text) {
				this.tips = text;
			},
			getOpenId(){
				// uni.login({
				// 	"provider": "weixin",
				// 	success: (res) => {
				// 		const code = res.code
						
				// 		uni.request({
				// 			method:"GET",
				// 			url: "https://api.weixin.qq.com/sns/jscode2session", //仅为示例，并非真实接口地址。
				// 			data: {
				// 				js_code: code,
				// 				appid:"wx16c25684cd81aa01",
				// 				secret:"f1e6c5b98f6328cd0a1a13a23359ce81",
				// 				grant_type: 'authorization_code'
				// 			},
				// 			success: (res) => {
				// 				console.log(res)
				// 				// this.session_key = res.data.session_key
				// 				// this.openid = res.data.openid
				// 			}
				// 		})
				// 	}
				// })
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
						this.$u.toast('验证码已发送,请在三分钟内输入验证码');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
						this.$api.user.askCode(this.form.email,'register')
						.then(res =>{
							console.log(res)
						}).catch(err => {
							
							console.error(err)
						});
						
					}, 2000);
				} else {
					this.$u.toast('验证码已发送,请稍后重试');
				}
			},
	        register() {
				this.$api.user.register({
					username: this.form.username,
					password: this.form.password,
					email: this.form.email,
					code: this.form.vcode
				})
				.then(res =>{
					console.log(res)
					this.$u.toast("注册成功,准备跳转登录页面");
					setTimeout(()=>{
						this.$myRouter.push({name:'index/login'})
					}, 2000);
				}).catch(err => {
					console.error(err)
					this.$u.toast(err.data.message);
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
	        			that.register();
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
