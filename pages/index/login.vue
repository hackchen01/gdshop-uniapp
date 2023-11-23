<template>
    <view class="container">
        <view class="wrapper">
            <view class="form">
				<u-form :model="form" ref="uForm" :error-type="['message']">
					<u-form-item label="账号" prop="emailOrName">
						<u-input v-model="form.emailOrName" placeholder="请输入邮箱或者用户名" />
					</u-form-item>
					<u-form-item label="密码" prop="password">
						<u-input type="password" v-model="form.password" placeholder="请输入密码" />
					</u-form-item>
				</u-form>
			</view>
            <button class="confirm-btn" :class="isDisable ? 'disable':''" @click="toSubmit">
				<u-loading mode="flower" :show="isLoading"></u-loading>	登录
			</button>
            <view style="margin-top: 32px;text-align: center">
                <view>
					没有账号？
                    <text style="color: #e10a07" @click="register()">立即注册</text>
                </view>
				<view style="margin-top: 30rpx;">
					忘记密码？
					<text style="color: #e10a07" @click="forget()">找回密码</text>
				</view>
            </view>
        </view>
		<!-- <view class="quick-login">
			<view class="title">
				<text>————— 快捷登陆 —————</text>
			</view>
			<view class="icons">
				<u-icon class="ql-icon" name="weixin-circle-fill" color="rgb(4,174,15)" size="86"></u-icon>
				<button open-type="chooseAvatar" @chooseavatar="chooseAvatar">123</button>
				<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" plain="true">手机号码</button>
				
				<u-icon class="ql-icon" name="qq-circle-fill" color="rgb(74,154,253)" size="86"></u-icon>
			</view>
		</view> -->
    </view>
</template>

<script>
import { Store } from 'vuex';
import utils from '@/utils/index.js';
	
    export default {
		computed:{
			isDisable(){
				return this.form.emailOrName.length < 6 || 
				!this.$u.test.rangeLength(this.form.password,[6,16]) || 
				this.isLoading;
			}
		},
		
        data() {
            return {
				rules:{
					emailOrName:[
						{
						required: true, 
						message: '请输入账号',
						trigger: ['change','blur']
					},
					{
						// 自定义验证函数
						validator: (rule, value, callback) => {
							// 匹配 username 规则和 email规则
							if(this.$u.test.email(value)){
								return true;
							}else if(RegExp(/^[a-zA-Z][a-zA-Z0-9]{5,11}$/).test(value)){
								return true;
							}
							return false;
						},
						message: '邮箱或者用户名格式不正确',
						// 触发器可以同时用blur和change
						trigger: ['change','blur'],
					}
					],
					password:{
						required: true, 
						message: '请输入密码',
						trigger: ['change','blur']
					},
				},
				form:{
					emailOrName: '295433295@qq.com',
					password: '295433295',
				},
				isLoading: false,
				session_key:'',
				openid:''
            }
        },
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
        methods: {
            forget() {
                this.$myRouter.push({name:'index/forget'})
            },
            register() {
                this.$myRouter.push({name:'index/register'})
            },
            toSubmit() {
				let that = this
				if(that.isDisable || that.isLoading){
					return false
				}
				that.isLoading = true
                that.$refs.uForm.validate(valid => {
					if (valid) {
						that.login()
					} else {
						console.log('验证失败');
					}
					
					setTimeout(function() {
						that.isLoading = false
					}, 3000);
				});
            },
			// 不整openid了, 后续在加上把
			login(){
				// console.log(this.form.emailOrName,this.form.password)
				this.$api.user.login({
					username:this.form.emailOrName,
					password:this.form.password
				})
				// 存取一下token expire
				.then(res=>{
					uni.setStorageSync("authorize",JSON.stringify(res.data))
					// uni.setStorageSync("expire",res.data.expire)
					this.$myRouter.pushTab({name:'index/index'})
					this.$forceUpdate()
					// console.log(res)
				})
				.catch(err=>{
					this.$u.toast(err.data.message);
					console.log(err)
				})
				
			},
			
			chooseAvatar(event){
				console.log(event)
			},
			getPhoneNumber(e){
				console.log(e)
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
