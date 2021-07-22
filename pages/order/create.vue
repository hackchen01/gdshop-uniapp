<template>
	<view class="">
		<view class="page-bg-gray"></view>
		<view class="address-select-box">
			<view class="address-select-box-main" @click="selectAddress">
				<view class="address-info">
					<view class="address-selected" v-if="addressInfo.id">
						<view class="top">
							<view class="name">{{ addressInfo.addressee }}</view>
							<view class="phone">{{ addressInfo.mobile }}</view>
							<view class="tag">
								<text v-for="(item, index) in addressInfo.tag" :key="index" :class="{red:item.tagText=='默认'}">{{ item.tagText }}</text>
							</view>
						</view>
						<view class="bottom">
						{{ getAddressText(addressInfo) }}
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
						<view class="store">{{ res.store_name }}</view>
					</view>
				</view>
				<view class="item" v-for="(item, index) in res.goodss" :key="index">
					<view class="left"><image :src="item.cover" mode="aspectFill"></image></view>
					<view class="content">
						<view class="title u-line-2">{{ item.goods_name }}</view>
						<view class="type">{{ item.options[0].sku_name }}</view>
						<!-- <view class="delivery-time">发货时间 {{ item.deliveryTime }}</view> -->
					</view>
					<view class="right">
						<view class="price">
							￥{{ ((item.options[0].price / 100)).toFixed(2) }}
						</view>
						<view class="number">x{{ item.buy_num }}</view>
					</view>
				</view>
				<view class="total">
					共{{ totalNum(res.goodss) }}件 小计:
					<text class="total-price">
						￥{{ (totalPrice(res.goodss)) }}
					</text>
				</view>
				<u-cell-group style="margin-top: 30rpx;">
					<u-cell-item title="运费" :arrow="false" hover-class="cell-hover-class">
						<view slot="right-icon" class="">
							￥{{freight}}
						</view>
					</u-cell-item>
					<u-cell-item @click="gotoUseCoupon">
						<view slot="title" class="">
							优惠券<text class="coupon-discount"
							v-if="selectCoupons.length > 0"
							>(已选{{selectCoupons.length}}张)</text>
						</view>
						<view slot="right-icon" class="">
							<view class="coupon-not" v-if="res.coupon_list.length < 1">无可用</view>
							<view class="coupon-select" 
							v-if="res.coupon_list.length > 0 && selectCoupons.length < 1">去选择</view>
							<view class="coupon-discount" 
							v-if="selectCoupons.length > 0">-￥10.00</view>
						</view>
					</u-cell-item>
					<u-cell-item title="合计" :arrow="false" hover-class="cell-hover-class">
						<view slot="right-icon" class="">
							￥{{goodsTotalPrice(100)}}
						</view>
					</u-cell-item>
				</u-cell-group>
			</view>
		</view>
		
		<view class="other-box">
			<u-cell-group class="group">
				<u-cell-item title="发票" @click="gotoUseInvoice">
					<view slot="right-icon" class="">
						不开发票
					</view>
				</u-cell-item>
				<u-cell-item :arrow="false" hover-class="cell-hover-class">
					<view slot="right-icon" class="">
						合计：<text class="price">￥{{payable(100)}}</text>
					</view>
				</u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="order-create-tabbar-area-bottom"></view>
		<view class="order-create-tabbar">
			<view class="left">
				<text>共<text class="goods-num">{{goodsTotalNum()}}</text>件</text>,
				<text>应付:<text class="price">￥{{payable(100)}}</text></text>
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
				queryData: {
					goods_id:0,
					goods_num:0,
					goods_option_id:0,
					cart_ids:[]
				},
				addressInfo: {},
				couponList: [],
				selectCoupons: [],
				freight:0,
				submitBtnLoading: false,
				orderList: []
			}
		},
		onLoad() {
			this.getCreateData(this.$Route.query)
		},
		methods:{
			selectAddress(){
				let that = this
				// 选择地址监听
				uni.$once('order-create-select-address',function(data){
					that.addressInfo = data
				})
				
				this.$myRouter.push({name:'order/select_address',params:{selected:this.addressInfo.id}})
			},
			checkQueryData(_query){
				if (_query.cart_ids){
					
				}
				else{
					
				}
				if(!_query.goods_id){
					this.$u.toast('goods_id 不能为空')
					return false
				}
				if(!_query.goods_num){
					this.$u.toast('goods_num 不能为空')
					return false
				}
				if(!_query.goods_option_id){
					this.$u.toast('goods_option_id 不能为空')
					return false
				}
				
				this.queryData.goods_id = _query.goods_id
				this.queryData.goods_num = _query.goods_num
				this.queryData.goods_option_id = _query.goods_option_id
				return true
			},
			getCreateData(_query){
				if(_query.cart_ids){
					this.queryData.cart_ids = _query.cart_ids
					this.getCreateDataByGoodsId()
				}
				else{
					if(!this.checkQueryData(this.$Route.query)){
						return
					}
					this.getCreateDataByGoodsId()
				}
			},
			getCreateDataByGoodsId(){
				const that = this
				this.$api.order.create(this.queryData).then(res => {
					console.log(res)
					that.orderList = res.order_info.order_list
					that.freight = res.order_info.freight
					if (res.address_info){
						that.addressInfo = res.address_info
					}
				}).catch(err => {
					uni.showModal({
						content:err.message,
						showCancel:false,
						success:function(res){
							that.$myRouter.back()
						}
					})
				})
			},
			getCreateDataByCart(){
				
			},
			// 订单商品总计 - 数量
			goodsTotalNum(){ 
				let num = 0;
				this.orderList.map(order => {
					order.goodss.map(item => {
						num += item.buy_num
					})
				})
				return num;
			},
			// 订单商品总计 - 价格
			goodsTotalPrice(xiaoshu = 100){ 
				let price = 0;
				this.orderList.map(order => {
					order.goodss.map(item => {
						price += item.options[0].price * item.buy_num
					})
				})
				return (price / xiaoshu).toFixed(2);
			},
			// 应付
			payable(xiaoshu = 100){ 
				let totalPrice = this.goodsTotalPrice(1)
				// 要减掉优惠券等等
				return (totalPrice / xiaoshu).toFixed(2);
			},
			// 商店合计
			totalPrice(item) {
				let price = 0;
				item.map(val => {
					price += parseFloat(val.options[0].price * val.buy_num);
				});
				return (price / 100).toFixed(2);
			},
			// 商店合计总件数
			totalNum(item) {
				let num = 0;
				item.map(val => {
					num += val.buy_num;
				});
				return num;
			},
			getSubmitData(){
				let that = this
				// 检测是否选择地址
				if(!(that.addressInfo && that.addressInfo.id)){
					that.$u.toast('请选择收件地址')
					return
				}
				let goodsList = []
				that.orderList.map(order => {
					order.goodss.map(item => {
						goodsList.push({
							goods_id:item.id,
							goods_option_id:item.options[0].id,
							goods_num:item.buy_num,
						})
					})
				})
				let submitData = {
					store_id:0,
					address_id:that.addressInfo.id,
					goods_list:goodsList,
					cart_ids:that.queryData.cart_ids
				}
				
				return submitData;
			},
			submitOrder(){
				let that = this
				that.submitBtnLoading = true
				setTimeout(function() {
					that.submitBtnLoading = false
				}, 6000);
				let submitData = this.getSubmitData();
				that.$api.order.submit(submitData).then(res => {
					that.submitBtnLoading = false
					that.$myRouter.replace({name:'order/pay',params:{id:res.order_id}})
				}).catch(err => {
					that.submitBtnLoading = false
					that.$u.toast(err.message)
				})
			},
			gotoUseCoupon(){
				let submitData = this.getSubmitData();
				this.$myRouter.push({name:'order/use_coupon',params:submitData})
			},
			gotoUseInvoice(){
				this.$myRouter.push({name:'order/use_invoice',params:{good_ids:[1,2]}})
			},
			getAddressText(e){
				let texts = []
				let xunhuanNames = [
					'province',
					'city',
					'area',
					'street',
				]
				for	(var k in xunhuanNames){
					if('不显示' != e[xunhuanNames[k]]){
						texts.push(e[xunhuanNames[k]])
					}
				}
				return texts.join('-')
			},
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