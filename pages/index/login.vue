<template>
    <view class="container">
        <view class="wrapper">
            <view class="form">
				<u-form :model="form" ref="uForm" :error-type="['border-bottom','toast']">
					<u-form-item label="账号" prop="mobile">
						<u-input v-model="form.mobile" placeholder="请输入账号" />
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
		<view class="quick-login">
			<view class="title">
				<text>————— 快捷登陆 —————</text>
			</view>
			<view class="icons">
				<u-icon class="ql-icon" name="weixin-circle-fill" color="rgb(4,174,15)" size="86"></u-icon>
				<u-icon class="ql-icon" name="qq-circle-fill" color="rgb(74,154,253)" size="86"></u-icon>
			</view>
		</view>
    </view>
</template>

<script>
    export default {
		computed:{
			isDisable(){
				return this.form.mobile.length < 1 || 
				this.form.password.length < 1 || this.isLoading;
			}
		},
        data() {
            return {
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
					password:{
						required: true, 
						message: '请输入密码',
						trigger: ['change','blur']
					},
				},
				form:{
					mobile: '',
					password: '',
				},
				isLoading: false
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
						that.$api.member.login({
							account:that.form.mobile,
							password:that.form.password,
						}).then(res => {
							that.isLoading = false
							console.log(res)
							// 设置 store状态
							that.$store.commit('setMemberLogin',res)
							that.$u.toast('登陆成功')
							that.$myRouter.back()
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
                
            }
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
