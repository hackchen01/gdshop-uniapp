<template>
	<view>
		<view class="page-bg-gray"></view>
		 <nav-bar>
			 <view slot="left">
			 	<!-- 左边 正常状态 -->
			 	<view class="nav-bar-left" @click="goBack">
			 		<u-icon class="icon" name="arrow-left" size="40"></u-icon>
			 	</view>
			 </view>
			 <view slot="right">
				 <view class="goods-search" @click="goSearch">
					<u-search placeholder="商品关键词" :disabled="true" :show-action="false"
					></u-search>
				</view>
			 </view>
		 </nav-bar>
		 <view class="goods-header">
		 	<filter-dropdown :filterData="filterData" :defaultSelected="defaultSelected"
			:menuTop="goodsHeaderTop"
		 	@confirm="dropdownConfirm"></filter-dropdown>
		 </view>
		 <u-gap height="90" bg-color="#f5f5f5"></u-gap>
		<view class="goods-con">
			<goods-list :goodsList="productList"></goods-list>
			<view style="padding: 30rpx;">
				<u-loadmore :status="goodsStatus" />
			</view>
		</view>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	import navBar from '@/plugins/zhouWei-navBar/index'
	import filterDropdown from '@/plugins/HM-filterDropdown.vue'
	import goodsList from '@/components/goods-list.vue'
	export default {
		components:{
			navBar,
			filterDropdown,
			goodsList
		},
		computed:{
			goodsHeaderTop(){
				try{
					const res = uni.getSystemInfoSync();
					return ((44 + res.safeAreaInsets.top) * 2)
				}catch(e){
					return 88
				}
			}
		},
		onLoad() {
			if (this.$Route.query.cid){
				this.queryCid = this.$Route.query.cid
			}
			this.initData()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom(){
			if (this.goodsStatus != 'nomore'){
				this.initData()
			}
		},
		data() {
			return {
				scrollTop:0,
				goodsPage:0,
				goodsStatus:'loadmore',
				queryCid:0,
				filterData:[],
				filterData2: [
					{
						"name":"分类",
						"type":"hierarchy",
						'submenu':[
							{
								"name":"次",
								"value":"1-1",
								'submenu': [
									{
										"name":"次2",
										"value":"1-2",
									},
									{
										"name":"2次2",
										"value":"1-3",
									},
								]
							},
							{
								"name":"次22",
								"value":"1-4",
								'submenu': [
									{
										"name":"次22",
										"value":"1-5",
									}
								]
							},

						],
					},
					{
						"name":"",
						"type":"hierarchy",
						'submenu':[
							{
								"name":"综合推荐",
								"value":"2-1",
							},
							{
								"name":"新品",
								"value":"2-2",
							},
							{
								"name":"评论数",
								"value":"2-3",
							},
							{
								"name":"价格高到低",
								"value":"2-4",
							},
							{
								"name":"价格低到高",
								"value":"2-5",
							}
						],
					},
				],
				defaultSelected:[],
				tmpSelected:{},
				defaultSelected2: [
					[null,null],
					[0],
				],
				productList: [],
			}
		},
		methods:{
			dropdownIsChange(_newIndex){
				return JSON.stringify(_newIndex) != JSON.stringify(this.tmpSelected)
			},
			dropdownConfirm(_data){
				console.log(_data)
				if(this.dropdownIsChange(_data.index)){
					this.tmpSelected = _data.index
				}
			},
			goBack(){
				this.$myRouter.back()
			},
			goSearch(){
				this.$myRouter.push({name:'goods/search'})
			},
			initData(){
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
				that.$api.goods.filter_data().then(res => {
					console.log(res)
					let classifyData = {
						'name':'分类',
						"type":"hierarchy",
						'submenu':[]
					}
					let sortData = {
						'name':'排序',
						"type":"hierarchy",
						'submenu':[]
					}
					let one = {}
					let selected_classify_one = null;
					let selected_classify_two = null;
					if (res.classify_list){
						res.classify_list.map((item,one_index) => {
							one = {
								'name':item.name,
								'value':item.id,
								'submenu':[]
							}
							if (item.id == that.queryCid){
								selected_classify_one = one_index
							}
							if(item.subs){
								item.subs.map((sitem,two_index) => {
									one.submenu.push({
										'name':sitem.name,
										'value':sitem.id
									})
									if (sitem.id == that.queryCid){
										selected_classify_two = two_index
										selected_classify_one = one_index
									}
								})
							}
							
							classifyData.submenu.push(one)
						})
					}
					if (res.sort_list){
						res.sort_list.map(item => {
							sortData.submenu.push({
								'name':item.name,
								'value':item.key
							})
						})
					}
					that.filterData = [classifyData,sortData]
					that.defaultSelected = [
						[selected_classify_one,selected_classify_two],
						[res.selected_sort]
					]
					console.log(that.defaultSelected)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.goods-header{
		background-color:#FFF;
		position: fixed;
		width: 100%;
		z-index: 9;
		min-height: 80rpx;

		.goods-search{
			padding: 10rpx;
			border-bottom: 1px solid #f5f5f5;
			z-index: 999;
		}
	}
	.goods-con{
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	.goods-list{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.goods-item{
			background-color: #FFF;
			flex: 1 0 40%;
			margin: 10rpx;
			border-radius:12rpx;
			overflow:hidden;
			transition:all 0.15s ease-in-out;

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
	.nav-bar-left{
		padding-left: 10rpx;
		padding-top: 4rpx;
		width: 80rpx;
		text-align: center;
	}
	.goods-search{
		width: 89vw;
		padding-right: 20rpx;
		/* #ifdef MP */
		padding-right: 180rpx;
		width: 86vw;
		/* #endif */
	}
	.error-box{
		width: 100%;
		height: 360rpx;
		display: flex;
		justify-content: center;
	}
</style>
