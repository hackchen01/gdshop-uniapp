<template>
	<view class="home-box">
		<view class="page-bg-gray"></view>
		<view class="search-box" @click="goSearch">
			<u-search placeholder="请输入关键字进行搜索"
			 :disabled="true" :show-action="false"
			v-model="keyword"></u-search>
		</view>
		<view class="swiper-box">
			<u-swiper :list="swiperList" mode="rect" height="300"></u-swiper>
		</view>
		<view class="notice-box">
			<u-notice-bar mode="vertical" :more-icon="true" :list="noticeList"></u-notice-bar>
		</view>
		<view class="icon-group-box" v-if="this.iconGroup.dataList.length > 0">
			<template v-if="iconGroupIsSwiper">
				<swiper class="swiper" @change="iconGroupChange" :style="'height:'+iconGroup.lineHeight+'px;'">
					<swiper-item v-for="(g, gi) in iconGroup.dataList" :index="gi" :key="gi">
						<u-grid :col="iconGroup.columnNum" @click="iconGroupClick" 
						:border="iconGroup.isShowBorder != 0" hover-class="none">
							<u-grid-item v-for="(item, index) in g" :index="item.index" :key="index"
							:bg-color="iconGroup.itemBgColor">
								<u-icon :name="item.icon" :size="iconGroup.size"></u-icon>
								<text class="grid-text">{{ item.text }}</text>
							</u-grid-item>
						</u-grid>
					</swiper-item>
				</swiper>
				<view class="indicator-dots">
					<view class="indicator-dots-item" v-for="(g, gi) in iconGroup.dataList" :index="gi" :key="gi"
					:class="[iconGroupCurrent == gi ? 'indicator-dots-active' : '']">
					</view>
				</view>
			</template>
			<template v-else>
				<view v-for="(g, gi) in iconGroup.dataList" :index="gi" :key="gi">
					<u-grid :col="iconGroup.columnNum" @click="iconGroupClick" 
					:border="iconGroup.isShowBorder != 0" hover-class="none">
						<u-grid-item v-for="(item, index) in g" :index="item.index" :key="index"
						:bg-color="iconGroup.itemBgColor">
							<u-icon :name="item.icon" :size="iconGroup.size"></u-icon>
							<text class="grid-text">{{ item.text }}</text>
						</u-grid-item>
					</u-grid>
				</view>
			</template>
		</view>
		<view class="picturew-box mode-2">
			<view class="picturew-item">
				<u-image src="https://img.100cms.com.cn/images/5/2020/05/IX5nHqhr5zuQGtqR855555gu3xuMnh.png" class="img" 
				mode="widthFix">
				</u-image>
			</view>
			<view class="picturew-item">
				<u-image src="https://img.100cms.com.cn/images/5/2020/05/HLNB1A2JvnTM11NL9LzjvLvh91vNyv.png" class="img" 
				mode="widthFix">
				</u-image>
			</view>
			<view class="picturew-item">
				<u-image src="https://img.100cms.com.cn/images/5/2020/05/LGePeSx4EgP3Jtt96PpY5lPPenJP0X.png" class="img" 
				mode="widthFix">
				</u-image>
			</view>
			<view class="picturew-item">
				<u-image src="https://img.100cms.com.cn/images/5/2020/05/j093332VIKEnoR3Obk3HrKCBMqwVGK.png" class="img" 
				mode="widthFix">
				</u-image>
			</view>
		</view>
		<view class="you-like-box">
			<view class="title">
				<u-image src="https://img.100cms.com.cn/images/5/2020/05/wy10yT1C631tSCeev363e3e3dBb4yC.png" class="img"
				mode="widthFix">
				</u-image>
			</view>
			<view class="goods-box">
				<goods-list :goodsList="productList"></goods-list>
			</view>
		</view>
	</view>
</template>

<script>
	import goodsList from '@/components/goods-list.vue'
	import { mapState, mapMutations } from 'vuex'
	export default {
		components:{
			goodsList
		},
		computed: {
			iconGroupIsSwiper(){
				return this.iconGroup.dataList.length > 1
			}
		},
		data() {
			return {
				iconGroupCurrent:0,
				iconGroup:{
					isShowBorder:0,
					itemBgColor:'#f5f5f5',
					columnNum:5,
					lineNum:2,
					size:100,
					lineHeight:170,
					dataList:[
						[
							{
								'index':'integral',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/sGyW55795yQd7158do4vv19WO15Q68.png',
							},
							{
								'index':'kefu-ermai',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/JfW2WqhRjr9ciwE29hQ5MfWwWf9H15.png',
							},
							{
								'index':'coupon',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/b5li4nnkHIHiKM25Z0xZL11710xkmf.png',
							},
							{
								'index':'gift',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/svVe6eXdBc9vVE86v6DAAbtv6BZwa9.png',
							},
							{
								'index':'scan',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/JZg25y5wcgOGCi4jZg3oYi0Ioio5wV.png',
							},
							{
								'index':'pause-circle',
								'text':'名称',
								'icon':'https://www.100cms.com.cn/addons/ewei_shopv2/plugin/diypage/static/images/default/icon-1.png',
							},
							{
								'index':'wifi',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/Cdhz0PkHpM8rBqQDm9Lb9h1N71Mrqv.png',
							},
							{
								'index':'email',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/se0G5pzn4PGj64PPBpEjcQ699164ee.png',
							},
							{
								'index':'list',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/d5V5Rj6VrR6NBWQV5vnkrZw6V6cwwv.png',
							},
							{
								'index':'list',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/DLwVLUw5xAxL335VVv85Ws2UX9XAdv.png',
							},
						],
						[
							{
								'index':'integral',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/sGyW55795yQd7158do4vv19WO15Q68.png',
							},
							{
								'index':'kefu-ermai',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/JfW2WqhRjr9ciwE29hQ5MfWwWf9H15.png',
							},
							{
								'index':'coupon',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/b5li4nnkHIHiKM25Z0xZL11710xkmf.png',
							},
							{
								'index':'gift',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/svVe6eXdBc9vVE86v6DAAbtv6BZwa9.png',
							},
							{
								'index':'scan',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/JZg25y5wcgOGCi4jZg3oYi0Ioio5wV.png',
							},
							{
								'index':'pause-circle',
								'text':'名称',
								'icon':'https://www.100cms.com.cn/addons/ewei_shopv2/plugin/diypage/static/images/default/icon-1.png',
							},
							{
								'index':'wifi',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/Cdhz0PkHpM8rBqQDm9Lb9h1N71Mrqv.png',
							},
							{
								'index':'email',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/se0G5pzn4PGj64PPBpEjcQ699164ee.png',
							},
							{
								'index':'list',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/d5V5Rj6VrR6NBWQV5vnkrZw6V6cwwv.png',
							},
							{
								'index':'list',
								'text':'名称',
								'icon':'https://img.100cms.com.cn/images/5/2020/05/DLwVLUw5xAxL335VVv85Ws2UX9XAdv.png',
							},
						],
					]
				},
				swiperList:[
					{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				noticeList:[
					'寒雨连江夜入吴',
					'平明送客楚山孤',
					'洛阳亲友如相问',
					'一片冰心在玉壶'
				],
				keyword: '',
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
		onLoad() {

		},
		methods:{
			goSearch(){
				this.$myRouter.push({name:'goods/search'})
			},
			iconGroupChange(e) {
				this.iconGroupCurrent = e.detail.current;
			},
			iconGroupClick(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-box{
		padding: 10rpx;
		border-bottom: 1px solid #f5f5f5;
		background-color: #FFF;
		z-index: 999;
	}
	/deep/ .u-grid-item-box{
		padding:20rpx 0 0 0 !important;
		.grid-text{
			margin-top: 10rpx;
		}
	}
	
	.icon-group-box{
		.indicator-dots {
			margin-top: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		
		.indicator-dots-item {
			background-color: rgba(0, 0, 0, 0.3);
			height: 4px;
			width: 13px;
			margin: 0 3px;
		}
		
		.indicator-dots-active {
			background-color: rgba(255, 0, 0, 0.8);
		}
	}
	.picturew-box{
		display: flex;
		flex-wrap: wrap;
		.picturew-item{
			padding: 4rpx;
		}
	}
	.picturew-box.mode-1{
		.picturew-item{
			width: 100%;
		}
	}
	.picturew-box.mode-2{
		.picturew-item{
			width: 50%;
		}
	}
	.picturew-box.mode-3{
		.picturew-item{
			width: 33.333%;
		}
	}
	.picturew-box.mode-4{
		.picturew-item{
			width: 25%;
		}
	}
</style>
