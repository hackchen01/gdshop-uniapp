<template>
	<view class="">
		<u-cell-group>
			<u-cell-item title="隐私权政策" @click="gotoArticle('privacy_policy')"></u-cell-item>
			<u-cell-item title="用户服务协议" @click="gotoArticle('agreement')"></u-cell-item>
			<u-cell-item title="关于我们" @click="gotoArticle('about_us')"></u-cell-item>
		</u-cell-group>
		
		<view class="addSite" @click="logout">
			<view class="add">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/utils/index.js'
	export default {
		methods:{
			gotoArticle(_type){
				utils.article.gotoArticle(_type)
			},
			logout(){
				this.$api.user.logout()
				.then(res=>{
					setTimeout(()=>{
						this.$myRouter.pushTab({name:'index/index'})
					}, 1000);
					this.$u.toast("退出登录成功,正在返回首页");
				})
				.catch(err=>{
					console.log(err)
				})
				// this.$myRouter.push({name:'index/login'})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
