<template>
	<view class="home-box">
		<view class="page-bg-gray"></view>
		<view class="search-box" @click="goSearch">
			<u-search placeholder="请输入关键字进行搜索"
			 :disabled="true" :show-action="false"
			v-model="keyword"></u-search>
		</view>
		 <diy-page ref="diyData" :data="diyData"></diy-page>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	import diyPage from '@/components/diy-page.vue'
	import { mapState, mapMutations } from 'vuex'
	export default {
		components:{
			diyPage
		},
		computed: {

		},
		data() {
			return {
				scrollTop:0,
				keyword: '',
				diyData: []
			}
		},
		onLoad() {
			this.initData()
		},
		onReachBottom(){
			this.$refs['diyData'].loadMore()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods:{
			initData(){
				let that = this
				// that.getHotGoods()
				that.$api.home.home().then(res => {
					that.diyData = res
				})
			},
			goSearch(){
				this.$myRouter.push({name:'goods/search'})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.search-box{
		padding: 10rpx;
		border-bottom: 1px solid #f5f5f5;
		background-color: #FFF;
		z-index: 999;
	}
	.picturew-box{
		display: flex;
		flex-wrap: wrap;
		.picturew-item{
			padding: 4rpx;
		}
	}
	.picturew-box.mode-1{
		.picturew-item{
			width: 100%;
		}
	}
	.picturew-box.mode-2{
		.picturew-item{
			width: 50%;
		}
	}
	.picturew-box.mode-3{
		.picturew-item{
			width: 33.333%;
		}
	}
	.picturew-box.mode-4{
		.picturew-item{
			width: 25%;
		}
	}
</style>
