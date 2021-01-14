<template>
	<view class="">
		<u-cell-group>
			<u-cell-item title="隐私权政策" @click="gotoArticle('privacy_policy')"></u-cell-item>
			<u-cell-item title="用户服务协议" @click="gotoArticle('agreement')"></u-cell-item>
			<u-cell-item title="关于我们" @click="gotoArticle('about_us')"></u-cell-item>
		</u-cell-group>
		
		<view class="addSite" @tap="layout">
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
			layout(){
				this.$myRouter.push({name:'index/login'})
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
