<template>
	<view>
		<u-tabs-swiper ref="tabs" :list="tabList" :is-scroll="false" bar-width="100" gutter="100"
		active-color="#e93323" @change="tabsChange" :current="tabsCurrent"
		></u-tabs-swiper>
		<view class="page-bg-gray"></view>
		<view class="u-wrap">
			<view class="jingdong" v-if="item.use_type == tabStatus" v-for="(item,index) in couponList">
				<view class="left" @click="checkCoupon(item.id)">
					<view class="sum" v-if="item.coupon_type === 1 || item.coupon_type === 3">
						￥<text class="num">{{ item.discount_money / 100 }}</text>
					</view>
					<view class="sum" v-if="item.coupon_type === 2 || item.coupon_type === 4">
						<text class="num">{{ item.discount_ratio / 1000 }}</text> 折
					</view>
					<view class="type" v-if="item.is_threshold === 0">无门槛</view>
					<template v-else>
					<view class="type" v-if="item.coupon_type === 1 || item.coupon_type === 2">满{{ item.threshold_money / 100 }}元可用</view>
					<view class="type" v-if="item.coupon_type === 3 || item.coupon_type === 4">满{{ item.threshold_num }}件可用</view>
					</template>
				</view>
				<view class="right">
					<view class="top" @click="checkCoupon(item.id)">
						<view class="title">
							<text class="tag" v-if="item.use_goods_type === 0">全品类</text>
							<text class="tag" v-if="item.use_goods_type === 1 || item.use_goods_type === 2">限品类</text>
							<text class="tag" v-if="item.use_goods_type === 3 || item.use_goods_type === 4">限商品</text>
							<text>{{ item.title }}</text>
						</view>
						<view class="bottom">
							<view class="date u-line-1">
								<template v-if="item.receive_time_type === 1">
									{{$u.timeFormat(item.receive_time_start, 'yyyy.mm.dd')}}-{{$u.timeFormat(item.receive_time_end, 'yyyy.mm.dd')}}
								</template>
							</view>
						</view>
					</view>
					<view class="tips">
						<view class="explain" @click="openDetails">
							<u-icon name="info-circle" class="transpond" :size="24"></u-icon>
							<text>详情</text>
						</view>
					</view>
				</view>
				<view class="check" v-if="item.use_type == 1" @click="checkCoupon(item.id)">
					<template v-if="getIsCheck(item.id)">
						<u-icon name="checkmark-circle-fill" size="50" color="#e93323"></u-icon>
					</template>
					<template v-if="!getIsCheck(item.id)">
						<u-icon name="checkmark-circle-fill" size="50" color="#CCC"></u-icon>
					</template>
				</view>
			</view>
		</view>
		
		<u-popup mode="bottom" safe-area-inset-bottom v-model="detailsShow">
			<view class="detailsContent">
				<scroll-view scroll-y="true" style="height: 600rpx;">
					<view>
						<view v-for="index in 20" :key="index">
							第{{index}}个Item
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabList: [
				{
					name:'可使用'
				},
				{
					name:'不可使用'
				},
			],
			couponCheckeds: {},
			detailsShow: false,
			tabsCurrent:0,
			tabStatus: 1,
			couponList: []
		}
	},
	onLoad() {
		console.log(this.$Route.query)
		if (this.$Route.query){
			this.getCouponList(this.$Route.query)
		}
	},
	methods:{
		tabsChange(_index){
			console.log(_index)
			this.tabsCurrent = _index
			if (_index === 0){
				this.tabStatus = 1;
			} else {
				this.tabStatus = 0;
			}
		},
		openDetails(){
			this.detailsShow = true;
		},
		getIsCheck(_id){
			return this.couponCheckeds[_id] ? true : false;
		},
		checkCoupon(_id){
			if (this.couponCheckeds[_id]){
				this.$set(this.couponCheckeds,_id,0)
				// this.couponCheckeds[_id] = 0;
			} else {
				// this.couponCheckeds[_id] = 1;
				this.$set(this.couponCheckeds,_id,1)
			}
		},
		getCouponList(_queryData){
			this.$api.order.useCoupon(_queryData).then(res => {
				console.log(res)
				this.couponList = res;
			}).catch(err => {
				console.log(err)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.u-wrap {
	padding:0 24rpx 60rpx 24rpx;
}

.jingdong {
	margin-top: 20rpx;
	width: 700rpx;
	height: auto;
	background-color: #ffffff;
	display: flex;
	.left {
		width: 400rpx;
		background-color: rgb(95, 148, 224); //rgb(94, 152, 225);
		text-align: center;
		font-size: 28rpx;
		color: #ffffff;
		.sum {
			margin-top: 50rpx;
			font-weight: bold;
			font-size: 32rpx;
			.num {
				font-size: 60rpx;
			}
		}
		.type {
			margin-bottom: 50rpx;
			font-size: 24rpx;
		}
	}
	.right {
		padding: 20rpx 20rpx 0;
		font-size: 28rpx;
		width: 100%;
		.top {
			border-bottom: 2rpx dashed $u-border-color;
			.title {
				height: 100rpx;
				line-height: 40rpx;
				.tag {
					padding: 4rpx 20rpx;
					background-color: rgb(73, 154, 201);
					border-radius: 20rpx;
					color: #ffffff;
					font-weight: bold;
					font-size: 24rpx;
					margin-right: 10rpx;
				}
			}
			.bottom {
				display: flex;
				margin-top: 20rpx;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 10rpx;
				.date {
					font-size: 20rpx;
					flex: 1;
					margin-right: 20rpx;
				}
				.immediate-use {
					height: auto;
					padding: 0 20rpx;
					font-size: 24rpx;
					border-radius: 40rpx;
					line-height: 40rpx;
					color: rgb(117, 142, 165);
					border: 2rpx solid rgb(117, 142, 165);
				}
			}
		}
		.tips {
			width: 100%;
			line-height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			.transpond {
				margin-right: 10rpx;
			}
			.explain {
				display: flex;
				align-items: center;
			}
			.particulars {
				width: 30rpx;
				height: 30rpx;
				box-sizing: border-box;
				padding-top: 8rpx;
				border-radius: 50%;
				background-color: $u-type-info-disabled;
				text-align: center;
			}
		}
	}
	&.disable{
		.left{
			background-color: #CCC;
		}
		.right{
			.top{
				.title{
					.tag{
						background-color: #CCC;
					}
				}
			}
		}
	}
	.check{
		width: 50rpx;
		display: flex;
		justify-content: center;
		justify-items: center;
		.check-icon{
			color: #CCC;
		}
		.on{
			color: #e93323;
		}
	}
}
.detailsContent{
	padding: 30rpx;
}
</style>