<template>
	<view class="personal-box">
		<u-form :model="form" ref="uForm" label-width="160"
		label-align="right">
			<u-form-item label="昵称" v-if="type == 'nickname'">
				<u-input v-model="form.nickname" />
				</u-form-item>
			<u-form-item label="手机号码" v-if="type == 'mobile'">
				<u-input v-model="form.mobile" />
			</u-form-item>
			<u-form-item label="验证码" v-if="type == 'mobile'">
				<u-input v-model="form.vcode" />
				<view class="" slot="right">
					<u-button size="mini" @tap="getCode">{{tips}}</u-button>
				</view>
			</u-form-item>
		</u-form>
		<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
		change-text="X秒后重新获取"
				@change="codeChange"></u-verification-code>
		<view class="addSite" @tap="savePersonal">
			<view class="add">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				form: {
					nickname: '',
					mobile: '',
					vcode:''
				},
				tips: '',
				seconds: 10,
			};
		},
		onLoad() {
			this.type = this.$Route.query.type
			this.changeTitle(this.type)
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
			savePersonal(){
				
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
