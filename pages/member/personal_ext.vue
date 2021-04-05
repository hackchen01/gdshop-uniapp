<template>
	<view class="personal-box">
		<u-form :model="form" ref="uForm" label-width="160"
		label-align="right">
			<u-form-item label="昵称" prop="nickname" v-if="type == 'nickname'">
				<u-input v-model="form.nickname" />
				</u-form-item>
			<u-form-item label="新手机号码" prop="mobile" v-if="type == 'mobile'">
				<u-input v-model="form.mobile" />
			</u-form-item>
			<u-form-item label="验证码" prop="vcode" v-if="type == 'mobile'">
				<u-input v-model="form.vcode" />
				<view class="" slot="right">
					<u-button size="mini" @click="getCode">{{tips}}</u-button>
				</view>
			</u-form-item>
		</u-form>
		<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
		change-text="X秒后重新获取"
				@change="codeChange"></u-verification-code>
		<view class="addSite" @click="savePersonal">
			<view class="add">
				<u-loading mode="flower" :show="isLoading"></u-loading> 保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				isLoading:false,
				form: {
					nickname: '',
					mobile: '',
					vcode:''
				},
				tips: '',
				seconds: 10,
				rules:{
					'nickname':{
						nickname:[{
							required: true, 
							message: '请输入昵称',
							trigger: ['change','blur']
						}],
					},
					'mobile':{
						mobile:[{
							required: true, 
							message: '请输入新手机号码',
							trigger: ['change','blur']
						},
						{
							// 自定义验证函数
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '新手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
						],
						vcode:[{
							required: true, 
							message: '请输入验证码',
							trigger: ['change','blur']
						}],
					},
				},
			};
		},
		onLoad() {
			this.type = this.$Route.query.type
			this.changeTitle(this.type)
		},
		onReady() {
			this.changeRules(this.type)
		},
		methods:{
			changeTitle(_type){
				switch (_type){
					case 'nickname':
						uni.setNavigationBarTitle({
							title:'编辑昵称'
						})
						break;
					case 'mobile':
						uni.setNavigationBarTitle({
							title:'编辑手机'
						})
						break;
					default:
						break;
				}
			},
			changeRules(_type){
				switch (_type){
					case 'nickname':
					case 'mobile':
						this.$refs.uForm.setRules(this.rules[_type]);
						break;
					default:
						break;
				}
			},
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
						scene:'mod_pass'
					}).then(res => {
						uni.hideLoading();
						that.$u.toast('验证码已发送');
						that.$refs.uCode.start();
					}).catch(err => {
						uni.hideLoading();
						console.log(err)
						that.$u.toast(err.message);
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
			savePersonal(){
				let that = this
				that.$refs.uForm.validate(valid => {
					if (!valid) {
						// 验证失败
						console.log('验证失败')
						return false
					}
					that.isLoading = true
					that.$api.home.register(that.form).then(res => {
						that.isLoading = false
						that.$u.toast('注册成功')
						setTimeout(function() {
							that.$myRouter.back()
						}, 2000);
					})
					.catch(err => {
						that.isLoading = false
						that.$u.toast('注册失败，' + err.message)
					})
					
					setTimeout(function() {
						that.isLoading = false
					}, 3000);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.personal-box{
		padding: 30rpx;
	}
	.addSite {
		display: flex;
		justify-content: space-around;
		width: 600rpx;
		line-height: 100rpx;
		position: absolute;
		bottom: 30rpx;
		left: 80rpx;
		background-color: red;
		border-radius: 60rpx;
		font-size: 30rpx;
		.add{
			display: flex;
			align-items: center;
			color: #ffffff;
			.icon{
				margin-right: 10rpx;
			}
		}
	}
</style>
