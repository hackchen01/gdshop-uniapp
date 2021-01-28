<template>
	<view class="goods-list">
		<view class="goods-item" v-for="(item, index) in goodsList" :key="index"
		@click="gotoGoodsDetails(item.id)">
			<view class="goods-item-img">
				<u-image :src="item.cover_photo" class="img"
				mode="widthFix">
					<u-loading slot="loading"></u-loading>
					<view slot="error" class="error-box">
						<u-icon name="warning" size="80" class="icon"></u-icon>
					</view>
				</u-image>
			</view>
			<view class="goods-item-content">
				<view class="title">{{ item.goods_name }}</view>
				<view class="bottom">
					<view class="price">
						<text class="sale-price">￥{{ getPrice(item.sell_price) }}</text>
						<text class="factory-price">￥{{ getPrice(item.market_price) }}</text>
					</view>
					<view class="buy-num">{{ (item.sales+item.virtual_sales) }}人付款</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'goods-list',
		props:{
			goodsList:{
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods:{
			gotoGoodsDetails(_goodsId){
				this.$myRouter.push({name:'goods/details',params:{id:_goodsId}})
			},
			getPrice(_price){
				return (_price / 100).toFixed(2);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		background-color: #f5f5f5;
	
		.goods-item{
			background-color: #FFF;
			flex: 1 0 40%;
			margin: 10rpx;
			border-radius:12rpx;
			overflow:hidden;
			transition:all 0.15s ease-in-out;
	
			.goods-item-img{
				padding: 8rpx;
			}
			.img{
				width: 100%;
				min-height: 362rpx;
			}
			.goods-item-content{
				padding: 20rpx;
	
				.title{
					color: #2e2e2e;
					font-size: 13px;
					min-height: 68rpx;
					word-break: break-all;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
				.bottom{
					.price{
						padding-top: 9px;
						.sale-price{
							font-size: 17px;
							font-weight: 500;
							color: #e41f19;
						}
						.factory-price{
							font-size: 12px;
							color: #a0a0a0;
							text-decoration: line-through;
							padding-left: 6px;
						}
					}
					.buy-num{
						padding-top: 5px;
						font-size: 12px;
						color: #656565;
					}
				}
			}
		}
	}
</style>
