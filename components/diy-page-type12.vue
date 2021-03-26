<template>
	<view class="you-like-box">
		<view class="title">
			<u-image src="http://gdshop-img.winlo.net//static/recommend.png" class="img"
			mode="widthFix">
			</u-image>
		</view>
		<view class="goods-box">
			<goods-list :goodsList="productList"></goods-list>
			<view style="padding: 30rpx;">
				<u-loadmore :status="goodsStatus" />
			</view>
		</view>
	</view>
</template>

<script>
	import goodsList from '@/components/goods-list.vue'
	export default {
		name: "diy-page-type12",
		components:{
			goodsList
		},
		props: {
			// DIY页面类型
			typeId: {
				type: Number,
				default: 0
			},
			//页面数据
			data: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				goodsPage:0,
				goodsStatus:'loadmore',
				productList: [],
			};
		},
		watch: {

		},
		computed: {

		},
		mounted(){
			this.getGoods()
		},
		methods: {
			gotoClick(_index){
				console.log(_index)
				let row = this.getClickRow(_index)
				if(!row){
					return false
				}
				
				if (!row.link){
					// 未设置跳转
					return false
				}
				
				console.log(row)
			},
			getClickRow(_index){
				return this.data.data_list[_index]
			},
			getGoods(){
				let that = this
				that.goodsPage++
				that.goodsStatus = 'loading'
				that.$api.goods.list({page:that.goodsPage}).then(res => {
					that.productList = that.productList.concat(res.list)
					if (res.page_info.has_more) {
						that.goodsStatus = 'loadmore'
					}
					else{
						that.goodsStatus = 'nomore'
					}
				})
			},
			loadMore(){
				if (this.goodsStatus != 'nomore'){
					this.getGoods()
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
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
