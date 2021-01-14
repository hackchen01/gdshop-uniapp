<template>
	<view class="">
		<view class="page-bg-gray"></view>
		<view class="address-select-box">
			<view class="address-select-box-main" @click="selectAddress">
				<view class="address-info">
					<view class="address-selected" v-if="addressInfo.id">
						<view class="top">
							<view class="name">{{ addressInfo.name }}</view>
							<view class="phone">{{ addressInfo.phone }}</view>
							<view class="tag">
								<text v-for="(item, index) in addressInfo.tag" :key="index" :class="{red:item.tagText=='默认'}">{{ item.tagText }}</text>
							</view>
						</view>
						<view class="bottom">
						{{ addressInfo.site }}
						</view>
					</view>
					<view class="address-not" v-else>
						<u-icon name="map" size="46"></u-icon>
						<text class="text">选择收货地址</text>
					</view>
				</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#CCC" size="36"></u-icon>
				</view>
				<!-- <view class="address-bg-img"></view> -->
			</view>
		</view>
		<view class="goods-box">
			<view class="order" v-for="(res, index) in orderList" :key="res.id">
				<view class="top">
					<view class="left">
						<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
						<view class="store">{{ res.store }}</view>
					</view>
				</view>
				<view class="item" v-for="(item, index) in res.goodsList" :key="index">
					<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
					<view class="content">
						<view class="title u-line-2">{{ item.title }}</view>
						<view class="type">{{ item.type }}</view>
						<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
					</view>
					<view class="right">
						<view class="price">
							￥{{ priceInt(item.price) }}
							<text class="decimal">.{{ priceDecimal(item.price) }}</text>
						</view>
						<view class="number">x{{ item.number }}</view>
					</view>
				</view>
				<view class="total">
					共{{ totalNum(res.goodsList) }}件 小计:
					<text class="total-price">
						￥{{ priceInt(totalPrice(res.goodsList)) }}.
						<text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
					</text>
				</view>
			</view>
		</view>
		
		<view class="other-box">
			<u-cell-group class="group">
				<u-cell-item title="商品总额" :arrow="false" hover-class="cell-hover-class">
					<view slot="right-icon" class="">
						￥1192.00
					</view>
				</u-cell-item>
				<u-cell-item title="运费" :arrow="false" hover-class="cell-hover-class">
					<view slot="right-icon" class="">
						￥0.00
					</view>
				</u-cell-item>
				<u-cell-item @click="gotoUseCoupon">
					<view slot="title" class="">
						优惠券<text class="coupon-discount"
						v-if="selectCoupons.length > 0"
						>(已选{{selectCoupons.length}}张)</text>
					</view>
					<view slot="right-icon" class="">
						<view class="coupon-not" v-if="couponList.length < 1">无可用</view>
						<view class="coupon-select" 
						v-if="couponList.length > 0 && selectCoupons.length < 1">去选择</view>
						<view class="coupon-discount" 
						v-if="selectCoupons.length > 0">-￥10.00</view>
					</view>
				</u-cell-item>
				<u-cell-item title="发票" @click="gotoUseInvoice">
					<view slot="right-icon" class="">
						不开发票
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" hover-class="cell-hover-class">
					<view slot="right-icon" class="">
						合计：<text class="price">￥1192.00</text>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="order-create-tabbar-area-bottom"></view>
		<view class="order-create-tabbar">
			<view class="left">
				<text>共<text class="goods-num">2</text>件</text>,
				<text>应付:<text class="price">￥1192.00</text></text>
			</view>
			<view class="right">
				<u-button type="error" size="medium" shape="circle"
				:hairLine="false" :loading="submitBtnLoading"
				@click="submitOrder"
				>提交订单</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		computed: {
			// 价格小数
			priceDecimal() {
				return val => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return '00';
				};
			},
			// 价格整数
			priceInt() {
				return val => {
					if (val !== parseInt(val)) return val.split('.')[0];
					else return val;
				};
			}
		},
		data() {
			return {
				addressInfo: {},
				couponList: [],
				selectCoupons: [],
				submitBtnLoading: false,
				orderList: [
					{
						id: 1,
						store: '商城',
						deal: '交易成功',
						goodsList: [
							{
								goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
								title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
								type: '灰色;M',
								deliveryTime: '付款后30天内发货',
								price: '348.58',
								number: 2
							},
							{
								goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
								title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
								type: '45cm;S',
								deliveryTime: '付款后30天内发货',
								price: '135.00',
								number: 1
							}
						]
					},
					{
						id: 2,
						store: '个人店',
						deal: '交易成功',
						goodsList: [
							{
								goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
								title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
								type: '灰色;M',
								deliveryTime: '付款后30天内发货',
								price: '348.58',
								number: 2
							},
							{
								goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
								title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
								type: '45cm;S',
								deliveryTime: '付款后30天内发货',
								price: '135.00',
								number: 1
							}
						]
					},
				]
			}
		},
		onLoad() {
			console.log(this.$Route.query)
			
		},
		methods:{
			selectAddress(){
				// this.addressInfo = !this.addressInfo
				let that = this
				// 选择地址监听
				uni.$once('order-create-select-address',function(data){
					console.log(data)
					that.addressInfo = data
				})
				
				this.$myRouter.push({name:'order/select_address',params:{selected:this.addressInfo.id}})
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map(val => {
					price += parseFloat(val.price);
				});
				return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item.map(val => {
					num += val.number;
				});
				return num;
			},
			submitOrder(){
				let that = this
				that.submitBtnLoading = true
				setTimeout(function() {
					that.submitBtnLoading = false
				}, 2000);
				this.$myRouter.push({name:'order/pay',params:{id:1}})
			},
			gotoUseCoupon(){
				this.$myRouter.push({name:'order/use_coupon',params:{good_ids:[1,2]}})
			},
			gotoUseInvoice(){
				this.$myRouter.push({name:'order/use_invoice',params:{good_ids:[1,2]}})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/member_order_list.scss';
	
	.address-select-box{
		// margin-top: 20rpx;
		position: relative;
		padding: 20rpx 20rpx 0 20rpx;
		.address-select-box-main{
			display: flex;
			background-color: #FFF;
			justify-content: space-between;
			border-radius: 20rpx;
		}
		.icon{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-right: 20rpx;
		}
	}
	.address-not{
		padding: 40rpx 40rpx;
		font-size: 36rpx;
		.text{
			margin-left: 10rpx;
		}
	}
	.address-bg-img {
		position: absolute;
		width: 100%;
		height: 8rpx;
		left: 0;
		bottom: 0;
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL0AAAAECAMAAADszM6/AAAAOVBMVEUAAAAVqfH/fp//vWH/vWEVqfH/fp8VqfH/fp//vWEVqfH/fp8VqfH/fp//vWH/vWEVqfH/fp//vWHpE7b6AAAAEHRSTlMA6urqqlVVFRUVq6upqVZUDT4vVAAAAEZJREFUKM/t0CcOACAQRFF6r3v/w6IQJGwyDsPT882IQzQE0E3chToByjG5LwMgLZN3TQATmdypCciBya0cgOT3/h//9PgF49kd+6lTSIIAAAAASUVORK5CYII=") repeat;
	}
	.address-selected {
		padding: 40rpx 40rpx;
		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;
			.phone {
				margin-left: 60rpx;
			}
			.tag {
				display: flex;
				font-weight: normal;
				align-items: center;
				text {
					display: block;
					width: 60rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					margin-left: 30rpx;
					background-color:rgb(49, 145, 253);
				}
				.red{
					background-color:red
				}
			}
		}
		.bottom {
			display: flex;
			margin-top: 20rpx;
			font-size: 28rpx;
			justify-content: space-between;
			color: #999999;
		}
	}
	.goods-box{
		
	}
	.order-create-tabbar-area-bottom{
		height: 120rpx;
	}
	.order-create-tabbar{
		border-top: 1px solid #CCC;
		background-color: #FFF;
		display: flex;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		position: fixed;
		padding: 0 30rpx;
		bottom: 0;
		justify-content: space-between;
		
		.left{
			font-size: 32rpx;
			color: #6a6a6a;
			.goods-num{
				color: #000000;
				font-weight: 700;
			}
		}
	}
	.price{
		color: #E41F19;
		font-weight: 700;
	}
	.coupon-not{}
	.coupon-select{
		color: #333;
	}
	.coupon-discount{
		color: #E41F19;
	}
	.cell-hover-class{
		
	}
	.other-box{
		margin: 20rpx;
		.group{
			border-radius: 20rpx;
			/deep/ .u-cell-item-box{
				border-radius: 20rpx;
			}
		}
	}
</style>