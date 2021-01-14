<template>
	<view class="">
		<view class="pay-top">
			<view class="countdown">
				支付剩余时间：<u-count-down :timestamp="timestamp"
				color="#F00" separator-color="#F00" @end="countdownEnd"
				></u-count-down>
			</view>
			<view class="price">
				<text>￥</text>
				<text class="num">71.50</text>
			</view>
		</view>
		<view class="pay-payment-list">
			<view class="pay-payment-item" 
			v-for="(p,index) in paymentList" :key="index"
			@click="selectPaymentFn(p.type)">
				<view class="icon payment-icon img_bg" 
				:style="'background-image: url('+p.img+');'">
					
				</view>
				<view class="main">
					<view class="">
						{{p.name}}
					</view>
					<view class="remark" v-if="p.remark">
						{{p.remark}}
					</view>
				</view>
				<view class="check">
					<u-icon name="checkmark-circle-fill" color="#F00"
					v-if="selectPayment == p.type"
					></u-icon>
				</view>
			</view>
		</view>
		<view class="addSite" @tap="confirmPay">
			<view class="add">
				确认支付
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				timestamp: 1799,
				selectPayment:'alipay',
				paymentList: [
					{
						type: 'alipay',
						name: '支付宝',
						remark: '',
						img: 'http://woyinshua-order-img.gida.cn/icon/payment/alipay.png',
					},
					{
						type: 'wechatpay',
						name: '微信支付',
						remark: '',
						img: 'http://woyinshua-order-img.gida.cn/icon/payment/wechatpay.png',
					},
					{
						type: 'unionpay',
						name: '银联支付',
						remark: '',
						img: 'http://woyinshua-order-img.gida.cn/icon/payment/unionpay.png',
					},
					{
						type: 'balance',
						name: '余额支付',
						remark: '账户可用余额 ￥0.00',
						img: 'http://woyinshua-order-img.gida.cn/icon/payment/balance.png',
					},
				]
			}
		},
		onLoad() {
			console.log(this.$Route.query)
		},
		methods:{
			countdownEnd(){
				console.log('倒计时结束关闭订单')
			},
			selectPaymentFn(_type){
				this.selectPayment = _type
			},
			confirmPay(){
				this.$myRouter.replaceAll({name:'index/msg',params:{msg:'支付成功'}})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pay-top{
		text-align: center;
		.countdown{
			color: #909399;
			padding: 32rpx 0 10rpx 0;
			.time{
				color: #F00;
			}
		}
		.price{
			font-weight: 700;
			color: #000;
			font-size: 34rpx;
			.num{
				font-size: 56rpx;
			}
		}
	}
	.pay-payment-list{
		padding: 20rpx 40rpx;
	}
	.pay-payment-item{
		display: flex;
		justify-content: space-between;
		font-size: 36rpx;
		padding: 20rpx 0;
		border-bottom: 1px solid #eeeeee;
		.icon{
			width: 48px;
		}
		.main{
			width: 60vw;
			line-height: 68rpx;
			.remark{
				color: #999;
				font-size: 28rpx;
			}
		}
		.check{
			display: flex;
			justify-content: center;
			justify-items: center;
			width: 10vw;
		}
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
