<template>
	<view class="new-users copy-data">
		<view class="page-bg-gray"></view>
		<view class="head">
			<view class="user-card">
				<view class="bg"></view>
				<view class="user-info">
					<view class="bntImg" @click="goPersonal">
						<u-avatar
						:src="memberInfo.avatar"
						:size="120"
						></u-avatar>
					</view>
					<view class="info">
						<view class="name">
							<text @click="goPersonal">{{memberInfo.nickname}}</text>
							<view class="vip" v-if="memberInfo.vip">
								<image :src="memberInfo.vip_icon" alt="">
									<view style="margin-left: 10rpx;" class="vip-txt">{{memberInfo.vip_name}}</view>
							</view>
						</view>
						<view class="num" v-if="memberInfo.mobile">
							<view class="num-txt">ID：{{memberInfo.id}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="shezhi-icon">
				<u-icon name="setting" @click="goEdit" size="56"></u-icon>
			</view>
		</view>
		<view class="main">
			<u-grid :col="3" class="num-wrapper" @click="numGridClick" hover-class="none">
				<u-grid-item index="balance">
					<view class="grid-text">余额</view>
					<view class="grid-text">{{memberInfo.money_coin}}</view>
				</u-grid-item>
				<u-grid-item index="integral">
					<view class="grid-text">积分</view>
					<view class="grid-text">{{memberInfo.integral_coin}}</view>
				</u-grid-item>
				<u-grid-item index="coupon">
					<view class="grid-text">优惠券</view>
					<view class="grid-text">{{memberInfo.coupon}}</view>
				</u-grid-item>
			</u-grid>
			<view class="order-wrapper">
				<view class="order-hd flex">
					<u-section title="订单中心" sub-title="查看全部" :show-line="false" @click="orderListClick(0)"></u-section>
				</view>
				<view class="order-bd">
					<u-grid :col="5" @click="orderListClick">
						<u-grid-item index="1">
							<u-badge :count="order_num[0]" :offset="[20, 20]"></u-badge>
							<u-icon name="daifukuan" custom-prefix="g-icon" :size="46"></u-icon>
							<view class="grid-text">待付款</view>
						</u-grid-item>
						<u-grid-item index="2">
							<u-badge :count="order_num[1]" :offset="[20, 20]"></u-badge>
							<u-icon name="daifahuo" custom-prefix="g-icon" :size="46"></u-icon>
							<view class="grid-text">待发货</view>
						</u-grid-item>
						<u-grid-item index="3">
							<u-badge :count="order_num[2]" :offset="[20, 20]"></u-badge>
							<u-icon name="daishouhuo" custom-prefix="g-icon" :size="46"></u-icon>
							<view class="grid-text">待收货</view>
						</u-grid-item>
						<u-grid-item index="4">
							<u-badge :count="order_num[3]" :offset="[20, 20]"></u-badge>
							<u-icon name="daipingjia" custom-prefix="g-icon" :size="46"></u-icon>
							<view class="grid-text">待评价</view>
						</u-grid-item>
						<u-grid-item index="order_service">
							<u-badge :count="order_num[4]" :offset="[20, 20]"></u-badge>
							<u-icon name="shouhou" custom-prefix="g-icon" :size="46"></u-icon>
							<view class="grid-text">售后/退款</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
			<!-- 会员菜单 -->
			<view class="order-wrapper">
				<view class="order-hd flex">
					<u-section title="我的服务" :right="false" :show-line="false"></u-section>
				</view>
				<view class="order-bd">
					<u-grid :col="4" @click="myServiceClick">
						<u-grid-item index="address">
							<u-icon name="dizhi" custom-prefix="g-icon" :size="46"></u-icon>
							<view class="grid-text">地址管理</view>
						</u-grid-item>
						<u-grid-item index="favorite">
							<u-icon name="shoucang" custom-prefix="g-icon" :size="46"></u-icon>
							<view class="grid-text">我的收藏</view>
						</u-grid-item>
						<u-grid-item index="coupon">
							<u-icon name="youhuiquan" custom-prefix="g-icon" :size="46"></u-icon>
							<view class="grid-text">我的优惠券</view>
						</u-grid-item>
						<u-grid-item index="customer_service">
							<u-icon name="kefu-ermai" :size="50"></u-icon>
							<view class="grid-text">联系客服</view>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
		</view>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				defaultMemberInfo:{
					id: 0,
					nickname: '请登陆',
					avatar: 'http://woyinshua-order-img.gida.cn//icon/avatar/1.jpg',
					money_coin:0,
					integral_coin:0,
					coupon:0,
				},
				memberInfo: {},
				isLogin: false,
				isWeixin: true,
				MyMenus: [],
				orderMenu: [],
				order_num:[
					0,
					0,
					0,
					0,
					0,
				],
				defaultOrderNum:[
					0,
					0,
					0,
					0,
					0,
				]
			}
		},
		onShow() {
			if(this.$store.state.memberToken){
				this.memberInfo = this.$store.state.memberInfo
				this.getMemberData()
			}
			else{
				this.memberInfo = this.defaultMemberInfo
				this.order_num = this.defaultOrderNum
			}
		},
		methods: {
			getWechatuserinfo() {

			},
			getRoutineUserInfo() {

			},
			getMemberData(){
				const that = this
				that.$api.member.index().then(res => {
					console.log(res)
					that.order_num = res.order_num
					that.memberInfo.money_coin = res.money_coin
					that.memberInfo.integral_coin = res.integral_coin
					that.memberInfo.coupon = res.coupon
				})
			},
			goPersonal() {
				this.$myRouter.push({
					name: 'member/personal'
				})
			},
			goEdit() {
				this.$myRouter.push({
					name: 'member/setting'
				})
			},
			myServiceClick(_index) {
				console.log(_index)
				switch (_index) {
					case 'address':
						this.$myRouter.push({
							name: 'member/address_list'
						})
						break;
					case 'coupon':
						this.$myRouter.push({
							name: 'member/my_coupon'
						})
						break;
					case 'favorite':
						this.$myRouter.push({
							name: 'member/my_favorite'
						})
						break;
					default:
						break;
				}
			},
			orderListClick(_index) {
				if ('order_service' == _index) {
					this.$myRouter.push({
						name: 'member/order_service'
					})
				} else {
					this.$myRouter.push({
						name: 'member/order_list',
						params: {
							status: _index
						}
					})
				}
			},
			numGridClick(_index) {
				console.log(_index)
				switch (_index) {
					case 'coupon':
						this.$myRouter.push({
							name: 'member/my_coupon'
						})
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.new-users {
		.head {
			.user-card {
				position: relative;
				width: 100%;
				height: 190rpx;
				margin: 0 auto;
				padding: 35rpx 28rpx;
				background: #e93323;

				&::after {
					position: absolute;
					left: 0;
					right: 0;
					bottom: -98rpx;
					content: '';
					height: 100rpx;
					width: 100%;
					border-radius: 0 0 50% 50%;
					background-color: #e93323;
				}

				.user-info {
					z-index: 20;
					position: relative;
					display: flex;

					.bntImg {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						text-align: center;
						line-height: 120rpx;
						background-color: unset;
						position: relative;
						padding: 0;

						.avatarName {
							font-size: 16rpx;
							color: #fff;
							text-align: center;
							background-color: rgba(0, 0, 0, 0.6);
							height: 37rpx;
							line-height: 37rpx;
							position: absolute;
							bottom: 0;
							left: 0;
							width: 100%;
						}
					}

					.avatar {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
					}

					.info {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-left: 20rpx;
						padding: 15rpx 0;

						.name {
							display: flex;
							align-items: center;
							color: #fff;
							font-size: 31rpx;

							.vip {
								display: flex;
								align-items: center;
								height: 36rpx;
								padding: 0 20rpx;
								background: rgba(0, 0, 0, 0.2);
								border-radius: 18px;
								font-size: 20rpx;
								margin-left: 12rpx;

								image {
									width: 27rpx;
									height: 27rpx;
								}
							}
						}

						.num {
							display: flex;
							align-items: center;
							font-size: 26rpx;
							color: rgba(255, 255, 255, 0.6);

							.edit-icon {
								margin-left: 20rpx;
							}
						}
					}
				}



				.sign {
					z-index: 200;
					position: absolute;
					right: -12rpx;
					top: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 120rpx;
					height: 60rpx;
					background: linear-gradient(90deg, rgba(255, 225, 87, 1) 0%, rgba(238, 193, 15, 1) 100%);
					border-radius: 29rpx 4rpx 4rpx 29rpx;
					color: #282828;
					font-size: 28rpx;
					font-weight: bold;
				}
			}
		}

		.main {
			position: relative;
			/* #ifdef H5 */
			top: -64rpx;
			/* #endif */
			padding: 0 20rpx;

			.num-wrapper {
				z-index: 30;
				margin-top: 60rpx;
				color: #333;
				background: #fff;
			}

			.order-wrapper {
				background-color: #fff;
				border-radius: 6rpx;

				.order-hd {
					justify-content: space-between;
					padding: 20rpx 28rpx;
					margin-top: 20rpx;
					border-bottom: 1px solid #F5F5F5;
					font-size: 30rpx;
					color: #282828;

					.right {
						align-items: center;
						color: #666666;
						font-size: 26rpx;

						.icon-xiangyou {
							margin-left: 5rpx;
							margin-top: 6rpx;
							font-size: 26rpx;
						}
					}
				}

				.order-bd {
					display: flex;

					.order-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 20%;
						height: 160rpx;

						.pic {
							position: relative;
							text-align: center;

							image {
								width: 49rpx;
								height: 42rpx;
							}
						}

						.txt {
							margin-top: 15rpx;
							font-size: 26rpx;
							color: #454545;
						}
					}
				}
			}
		}

		.slider-wrapper {
			margin: 20rpx 0;
			height: 130rpx;

			swiper,
			swiper-item {
				height: 100%;
			}

			image {
				width: 100%;
				height: 130rpx;
			}
		}

		.user-menus {
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			padding: 20rpx 0;

			.item {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				width: 25%;
				height: 120rpx;
				font-size: 24rpx;

				image {
					width: 46rpx;
					height: 46rpx;
					margin-bottom: 10rpx;
				}

			}

			button {
				font-size: 28rpx;
			}
		}

		.phone {
			color: #fff;
		}

		.order-status-num {

			min-width: 12rpx;
			background-color: #fff;
			color: #ee5a52;
			border-radius: 15px;
			position: absolute;
			right: -14rpx;
			top: -15rpx;
			font-size: 20rpx;
			padding: 0 8rpx;
			border: 1px solid #ee5a52;
		}

		.support {
			width: 219rpx;
			height: 74rpx;
			margin: 54rpx auto;
			display: block;
		}
	}

	.title-box {
		height: 80rpx;
		line-height: 80rpx;
		padding: 0 30rpx;
		border-bottom: 1px dashed #eee;
		background-color: #fff;
	}
	.shezhi-icon{
		position: absolute;
		right: 10px;
		top: 20px;
		color: #FFF;
		z-index: 99;
	}
</style>
