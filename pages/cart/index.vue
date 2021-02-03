<template>
	<view class="shopping-cart">
		<view class="page-bg-gray"></view>
		<block v-if="isLogin == false">
			<view class="empty">
				<u-empty text="请先登陆" mode="permission" iconSize="180" fontSize="36">
					<view slot="bottom">
						<button class="confirm-btn" @click="gotoLogin">
							登录
						</button>
					</view>
				</u-empty>
			</view>
		</block>
		<block v-else>
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
					<view class="pictrue" @click="gotoGoodsDetails(item.goods_id)">
						<image class="img" :src="item.goods_cover" mode=""></image>
					</view>
					<view class="info">
						<view class="goods-name" @click="gotoGoodsDetails(item.goods_id)">
							{{item.goods_name}}
						</view>
						<view class="specs" @click="gotoGoodsDetails(item.goods_id)">
							规格：{{item.option_name}}
						</view>
						<view class="money">
							<view class="text">
								￥ {{item['show_price']}}
							</view>
							<view class="btn">
								<u-number-box :value="item.total" :index="index"
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
		</block>
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
						total += item.price * item.total
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
		onLoad() {
			
		},
		onShow() {
			this.getDataList()
		},
		data() {
			return {
				saveLock:true, // 锁定保存
				cartList: [],
				totalMoney:0,
				testNum:false,
				isSelectAll:false,
				btnWidth: 130,
				isLoading: false,
				isLogin:true,
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
			getDataList(){
				let that = this
				this.$api.cart.mycarts().then(res => {
					that.isLogin = true
					// 加入左滑属性
					that.cartList = res.list.map(item => {
						item.show = false
						return item
					})
					that.calcIsSelectAll()
					// 加载数据成功后，延迟一点开启按钮操作
					setTimeout(() => {
						that.saveLock = false
					},500)
				})
				.catch(err => {
					if (err.code === 10003){
						that.isLogin = false
					}
				})
			},
			calcIsSelectAll(){
				const that = this
				uni.$emit('CART_COUNT_CHANGE',this.cartList.length)
				setTimeout(function(){
					// 延迟设置，列表长度为 0 不设置
					if (that.cartList.length < 1){
						return false
					}
					that.isSelectAll = (that.selectOrderCount == that.cartList.length)
				},100)
			},
			gotoLogin(){
				this.$myRouter.push({name:'index/login'})
			},
			gotoGoodsDetails(_goodsId){
				this.$myRouter.push({name:'goods/details', params: { id: _goodsId }})
			},
			saveChangeCart(_item){
				this.$api.cart.save({
					goods_id:_item['goods_id'],
					goods_option_id:_item['goods_option_id'],
					goods_num:_item['total'],
					is_selected:_item['checked'],
				}).then(res => {
					// console.log(res)
				})
				.catch(err => {
					// console.log(res)
				})
			},
			cartFormatPrice(_price){
				return _.formatNumber((_price / 100),'0.00');
			},
			uNumberBoxChange(_data){
				const that = this
				// console.log('uNumberBoxChange')
				this.cartList[_data['index']]['total'] = _data['value']
				// 锁定时不触发
				if (this.saveLock === false){
					that.$u.debounce(function(){
						that.saveChangeCart(that.cartList[_data['index']])
					},500)
				}
			},
			selectBtnClick(_item){
				_item.checked = !_item.checked
				this.saveChangeCart(_item)
			},
			checkboxChange(e) {
				let that = this
				that.calcIsSelectAll()
			},
			claerAllChecked(_checked){
				this.cartList.map(item => {
					item.checked = _checked
				})
				this.$api.cart.selected_all({'is_selected':_checked})
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
				this.cartList[index].show = false;
				const model = this.cartList[index]
				this.cartList.splice(index, 1);
				if(btnIndex == 1) {
					this.$api.cart.del({id:model.id})
				} else {
					this.$api.goods.collection({id:model.goods_id,cart_id:model.id})
					this.$u.toast(`收藏成功`);
				}
				uni.$emit('CART_COUNT_CHANGE',this.cartList.length)
			},
			settlement(){
				let that = this
				if(that.isDisabled){
					return
				}
				that.isLoading = true
				// 可以先检测，目前直接跳转
				setTimeout(function() {
					that.isLoading = false
				}, 3000);
				let cartIds = []
				this.cartList.map((val, idx) => {
					if (val.checked){
						cartIds.push(val.id)
					}
				})
				this.$myRouter.push({name:'order/create', params: { cart_ids: cartIds }})
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
					padding-left: 20rpx;
					.goods-name{
						display: -webkit-box;
						overflow:hidden;
						text-overflow: ellipsis;
						width: 62vw;
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
	.confirm-btn {
		width: 300px;
		height: 42px;
		line-height: 42px;
		border-radius: 30px;
		margin-top: 40rpx;
		background-color: #F00;
		color: #fff;
		font-size: 32rpx;
	
		&:after {
			border-radius: 60px;
		}
		
		&.disable{
			background-color: #CCC;
		}
	}
</style>
