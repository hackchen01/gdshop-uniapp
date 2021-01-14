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
		</view>
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
			data() {
				return {
					filterData: [
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
					defaultSelected: [
						[null,null],
						[0],
					],
					productList: [
						{
							id: 1,
							img: 11111111,
							name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）',
							sale: 599,
							factory: 899,
							payNum: 2342
						},
						{
							id: 2,
							img: 2,
							name: '德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒',
							sale: 29,
							factory: 69,
							payNum: 999
						},
						{
							id: 3,
							img: 3,
							name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
							sale: 299,
							factory: 699,
							payNum: 666
						},
						{
							id: 4,
							img: 4,
							name: '百雀羚套装女补水保湿护肤品',
							sale: 1599,
							factory: 2899,
							payNum: 236
						},
						{
							id: 5,
							img: 5,
							name: '百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋',
							sale: 599,
							factory: 899,
							payNum: 2399
						},
						{
							id: 6,
							img: 6,
							name: '短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤',
							sale: 599,
							factory: 899,
							payNum: 2399
						},
						{
							id: 1,
							img: 1,
							name: '欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜',
							sale: 599,
							factory: 899,
							payNum: 2342
						},
						{
							id: 2,
							img: 2,
							name: '德国DMK进口牛奶',
							sale: 29,
							factory: 69,
							payNum: 999
						},
						{
							id: 3,
							img: 3,
							name: '【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红',
							sale: 299,
							factory: 699,
							payNum: 666
						},
						{
							id: 4,
							img: 4,
							name: '百雀羚套装女补水保湿护肤品',
							sale: 1599,
							factory: 2899,
							payNum: 236
						}
					],
				}
			},
			methods:{
				dropdownIsChange(_newIndex){
					return JSON.stringify(_newIndex) != JSON.stringify(this.defaultSelected)
				},
				dropdownConfirm(_data){
					if(this.dropdownIsChange(_data.index)){
						console.log('变化了')
					}
				},
				goBack(){
					this.$myRouter.back()
				},
				goSearch(){
					this.$myRouter.push({name:'goods/search'})
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
