<template>
	<view class="shopping-cart">
		<view class="page-bg-gray"></view>
		<view class="empty" v-if="cartList.length < 1">
			<u-empty text="购物车空空的" mode="car" iconSize="180" fontSize="36"></u-empty>
		</view>
		<view class="cart-list">
			<u-swipe-action v-for="(item, index) in cartList" :btnWidth="btnWidth" @open="swipeActionOpen"
			@click="swipeActionClick"
			:key="index" :index="index" :show="item.show" :options="options">
				<view class="cart-item">
				<view class="select-btn" @click.stop="selectBtnClick(item)">
					<u-checkbox shape="circle" :value="item.checked" :name="index"
					@change="checkboxChange"
					active-color="#d81e06"
					></u-checkbox>
				</view>
				<view class="goods-box">
					<view class="pictrue" @click="gotoGoodsDetails(1)">
						<image class="img" src="//kaifa.crmeb.net/uploads/attach/2020/03/20200319/8e18311a1b2ca1b98a5782a252b7dd50.png" mode=""></image>
					</view>
					<view class="info">
						<view class="goods-name" @click="gotoGoodsDetails(1)">
							小黄鸭5.6KG迷你洗衣机全自动家用波轮宝宝小型加热洗烘干一体机小黄鸭5.6KG迷你洗衣机全自动家用波轮宝宝小型加热洗烘干一体机
						</view>
						<view class="specs" @click="gotoGoodsDetails(1)">
							规格：默认
						</view>
						<view class="money">
							<view class="text">
								￥ {{item['showPrice']}}
							</view>
							<view class="btn">
								<u-number-box :value="item.num" :index="index"
								:min="1" :max="100"
								@change="uNumberBoxChange"
								></u-number-box>
							</view>
						</view>
					</view>
				</view>
				</view>
			</u-swipe-action>
		</view>
		<view class="cart-bar">
			<view class="select-btn" @click="selectAll">
				<u-checkbox shape="circle" active-color="#d81e06" v-model="isSelectAll"
				>全选</u-checkbox>
			</view>
			<view class="money">
				<view class="total">合计：￥{{ showPrice }}</view>
				<view class="discount">优惠减：￥ 0.00</view>
			</view>
			<view class="btn">
				<view class="addSite" :class="(isDisabled) ? 'disabled':''"
				@click="settlement">
					<view class="add">
						<u-loading mode="flower" :show="isLoading"></u-loading> 结算 ({{selectOrderCount}})
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import _ from '@holyhigh/func.js'
	export default{
		components:{

		},
		computed:{
			selectOrderCount(){
				let count = 0;
				let total = 0;
				this.cartList.map(item => {
					if(item.checked){
						count++
						total += item.price * item.num
					}
				})
				this.totalMoney = total
				return count
			},
			isDisabled(){
				return this.selectOrderCount < 1 || this.isLoading
			},
			clacIsSelectAll(){
				return this.selectOrderCount == this.cartList.length
			},
			showPrice(){
				return this.cartFormatPrice(this.totalMoney);
			},
		},
		data() {
			return {
				cartList: [
					{
						checked:true,
						price:99900,
						showPrice:'999.00',
						num:1,
						show:false,
					},
					{
						checked:false,
						price:99900,
						showPrice:'999.00',
						num:1,
						show:false,
					},
					{
						checked:false,
						price:99902,
						showPrice:'999.02',
						num:1,
						show:false,
					},
					{
						checked:false,
						price:99900,
						showPrice:'999.00',
						num:1,
						show:false,
					},
					{
						checked:false,
						price:99900,
						showPrice:'999.00',
						num:1,
						show:false,
					},
					{
						checked:false,
						price:99900,
						showPrice:'999.00',
						num:1,
						show:false,
					},
					{
						checked:false,
						price:99900,
						showPrice:'999.00',
						num:1,
						show:false,
					},
				],
				totalMoney:0,
				testNum:false,
				isSelectAll:false,
				btnWidth: 130,
				isLoading: false,
				options: [
					{
						text: '收藏',
						style: {
							backgroundColor: 'rgb(255, 198, 0)'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: 'rgb(248, 36, 0)'
						}
					}
				]
			}
		},
		methods:{
			gotoGoodsDetails(_goodsId){
				this.$myRouter.push({name:'goods/details', params: { id: _goodsId }})
			},
			cartFormatPrice(_price){
				return _.formatNumber((_price / 100),'0.00');
			},
			uNumberBoxChange(_data){
				//console.log(_data)
				this.cartList[_data['index']]['num'] = _data['value']
			},
			selectBtnClick(_item){
				_item.checked = !_item.checked
			},
			checkboxChange(e) {
				let that = this
				setTimeout(function(){
					// 延迟设置
					that.isSelectAll = (that.selectOrderCount == that.cartList.length)
				},100)
			},
			claerAllChecked(_checked){
				this.cartList.map(item => {
					item.checked = _checked
				})
			},
			selectAll(e){
				this.claerAllChecked(this.isSelectAll)
			},
			swipeActionOpen(index){
				let that = this
				that.cartList[index].show = true;
				that.cartList.map((val, idx) => {
					if(index != idx) that.cartList[idx].show = false;
				})
			},
			swipeActionClick(index,btnIndex){
				if(btnIndex == 1) {
					this.cartList.splice(index, 1);
					this.$u.toast(`删除了第${index}个cell`);
				} else {
					this.cartList[index].show = false;
					this.$u.toast(`收藏成功`);
				}
			},
			settlement(){
				let that = this
				if(that.isDisabled){
					return
				}
				that.isLoading = true
				setTimeout(function() {
					that.isLoading = false
				}, 3000);
			}
		}
	}
</script>

<style scoped lang="scss">
	.shopping-cart{
		.empty{
			margin-top: 300rpx;
		}
	}
	.cart-list{
		padding-bottom: 100px;
		.cart-item{
			min-height: 200rpx;
			background-color: #FFF;
			padding: 20rpx;
			display: flex;
			margin-bottom: 10px;

			.select-btn{
				display:flex;
				justify-content: center;
				align-items: center;
				text-align: center;
			}

			.goods-box{
				display: flex;


				.pictrue{
					width: 160rpx;
					height: 160rpx;
				}
				.info{
					.goods-name{
						display: -webkit-box;
						overflow:hidden;
						text-overflow: ellipsis;
						width: 65vw;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.specs{
						margin-top: 5px;
						color: #868686;
						font-size: 28rpx;
					}
					.money{
						margin-top: 5px;
						display: flex;
						justify-content:space-between;

						.text{
							color: $gdbase-type-primary;
							font-size: 32rpx;
							font-weight: 700;
						}
					}
				}
			}
		}
	}
	.cart-item .goods-box .pictrue .img{
		width: 100%;
		height: 100%;
	}
	.cart-bar{
		display: flex;
		background-color: #FFF;
		border-top: 1px solid #CCC;
		min-height: 100rpx;
		position: fixed;
		width: 100vw;
		/* #ifdef H5 */
		bottom: var(--window-bottom);
		/* #endif */
		/* #ifndef H5 */
		bottom: 0;
		/* #endif */
		justify-content:space-between;
		align-items:center;
		padding: 0 10px;
		z-index: 9999;

		.money{
			width: 50vw;
			text-align: right;
			
			padding-right: 10px;
			.total{
				font-size: 32rpx;
			}
			.discount{
				color: $gdbase-type-primary;
			}
		}
	}
	.addSite {
		display: flex;
		justify-content: space-around;
		width: 200rpx;
		line-height: 68rpx;
		background-color: $gdbase-type-primary;
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
		&.disabled{
			background-color: #CCC;
		}
	}
</style>
