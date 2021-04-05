<template>
    <view class="container">
        <view class="wrapper">
            <view class="form">
				<u-form :model="form" ref="uForm" label-width="180" label-align="right">
					<u-form-item label="手机号" prop="mobile">
						<u-input v-model="form.mobile" placeholder="请输入手机号" />
					</u-form-item>
					<u-form-item label="验证码" prop="vcode">
						<u-input v-model="form.vcode" placeholder="请输入验证码" />
						<view class="" slot="right">
							<u-button size="mini" shape="circle" 
							type="error" :disabled="!mobileIsOk"
							@tap="getCode">{{tips}}</u-button>
						</view>
					</u-form-item>
				</u-form>
			</view>
			<view class="agree-box">
				<u-checkbox active-color="#F00"
					v-model="isAgree"
				>同意</u-checkbox>
				<!-- 协议地址 -->
				<view class="text" @click="utils.article.gotoArticlePrivacyPolicy()">《隐私政策》</view>
				<view class="text">和</view>
				<view class="text" @click="utils.article.gotoArticleAgreement()">《用户服务协议》</view>
			</view>
			
            <button class="confirm-btn" :class="isDisable ? 'disable':''" @click="toSubmit">
				<u-loading mode="flower" :show="isLoading"></u-loading>	登录
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
				this.form.vcode.length < 1 || this.isLoading || !this.isAgree;
			}
		},
        data() {
            return {
				tips: '',
				seconds: 10,
				isAgree:true,
				utils:utils,
				rules:{
					mobile:[{
						required: true, 
						message: '请输入手机号',
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
				},
				form:{
					mobile: '',
					vcode: '',
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
				const that = this
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					that.$api.home.send_vcode({
						mobile:that.form.mobile,
						scene:'login'
					}).then(res => {
						uni.hideLoading();
						that.$u.toast('验证码已发送');
						that.$refs.uCode.start();
					}).catch(err => {
						uni.hideLoading();
						console.log(err)
					})
					setTimeout(() => {
						uni.hideLoading();
					}, 3000);
				} else {
					that.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				
			},
			start() {
				
			},
            toSubmit() {
				let that = this
				if(that.isDisable || that.isLoading){
					return false
				}
                that.$refs.uForm.validate(valid => {
					if (valid) {
						that.isLoading = true
						that.$api.member.login({
							account:that.form.mobile,
							vcode:that.form.vcode,
							type:'vcode'
						}).then(res => {
							that.isLoading = false
							console.log(res)
							// 设置 store状态
							that.$store.dispatch('setMemberLogin',res)
							that.$u.toast('登陆成功')
							that.$myRouter.back(2)
						}).catch(err => {
							that.isLoading = false
							that.$u.toast(err.message)
						})
					} else {
						console.log('验证失败');
					}
				});
            },
            getUserInfo(userId, token) {
                
            },
        },

    }
</script>

<style lang='scss'>
    @import '@/static/css/login.scss';
	
	.quick-login{
		.title{
			color: #AAA;
		}
		.icons{
			margin-top: 30rpx;
			.ql-icon{
				margin-left: 30rpx;
				&:first-child{
					margin-left: 0;
				}
			}
		}
	}
</style>
