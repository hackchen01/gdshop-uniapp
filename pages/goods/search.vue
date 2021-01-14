<template>
	<view class="goods-search-page">
		<view class="search-box">
			<u-search placeholder="商品关键词" :focus="true" :clearabled="true" action-text="取消" 
			v-model="keyword"
			@custom="searchCustom" @search="searchSearch" @clear="searchClear"
			></u-search>
		</view>
		<view class="search-history-box">
			<view class="top">
				<view class="title">历史搜索</view>
				<view class="claer-icon">
					<u-icon name="trash" size="36"></u-icon>
				</view>
			</view>
			<view class="tags">
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
			</view>
		</view>
		<view class="search-hot-box">
			<view class="top">
				<view class="title">热门搜索</view>
				<view class="claer-icon">
					<u-icon name="eye" size="36"></u-icon>
				</view>
			</view>
			<view class="tags">
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
				<u-tag text="雪月夜" class="tag" type="info" shape="circle" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: ''
			}
		},
		methods:{
			searchCustom(_val){
				console.log(_val)
				this.searchClear()
				this.$myRouter.back()
			},
			searchSearch(_val){
				console.log(_val)
			},
			searchClear(){
				this.keyword = ''
			}
		}
	}
</script>

<style scoped lang="scss">
	.goods-search-page{
		padding: 30rpx;
	}
	.search-history-box{
		margin-top: 30rpx;
		.top{
			margin-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			
			.title{
				font-size: 30rpx;
				font-weight: 700;
			}
		}
		.tags{
			line-height: 70rpx;
			.tag{
				margin-right: 10rpx;
			}
		}
	}
	.search-hot-box{
		margin-top: 30rpx;
		.top{
			margin-bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			
			.title{
				font-size: 30rpx;
				font-weight: 700;
			}
		}
		.tags{
			line-height: 70rpx;
			.tag{
				margin-right: 10rpx;
			}
		}
	}
</style>
