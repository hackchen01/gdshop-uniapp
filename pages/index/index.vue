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
				<u-image src="http://gdshop-img.winlo.net//static/picturew-box/01.png" class="img" 
				mode="widthFix">
				</u-image>
			</view>
			<view class="picturew-item">
				<u-image src="http://gdshop-img.winlo.net//static/picturew-box/02.png" class="img" 
				mode="widthFix">
				</u-image>
			</view>
			<view class="picturew-item">
				<u-image src="http://gdshop-img.winlo.net//static/picturew-box/03.png" class="img" 
				mode="widthFix">
				</u-image>
			</view>
			<view class="picturew-item">
				<u-image src="http://gdshop-img.winlo.net//static/picturew-box/04.png" class="img" 
				mode="widthFix">
				</u-image>
			</view>
		</view>
		<view class="you-like-box">
			<view class="title">
				<u-image src="http://gdshop-img.winlo.net//static/recommend.png" class="img"
				mode="widthFix">
				</u-image>
			</view>
			<view class="goods-box">
				<goods-list :goodsList="productList"></goods-list>
				<view style="padding: 30rpx;">
					<u-loadmore :status="hotGoodsStatus" />
				</view>
			</view>
		</view>
		
		<u-back-top :scroll-top="scrollTop"></u-back-top>
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
				scrollTop:0,
				hotGoodsPage:0,
				hotGoodsStatus:'loadmore',
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
								'icon':'http://gdshop-img.winlo.net/static/nav/01.png',
							},
							{
								'index':'kefu-ermai',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/02.png',
							},
							{
								'index':'coupon',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/03.png',
							},
							{
								'index':'gift',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/04.png',
							},
							{
								'index':'scan',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/05.png',
							},
							{
								'index':'pause-circle',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/06.png',
							},
							{
								'index':'wifi',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/07.png',
							},
							{
								'index':'email',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/08.png',
							},
							{
								'index':'list',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/09.png',
							},
							{
								'index':'list',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/10.png',
							},
						],
						[
							{
								'index':'integral',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/01.png',
							},
							{
								'index':'kefu-ermai',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/02.png',
							},
							{
								'index':'coupon',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/03.png',
							},
							{
								'index':'gift',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/04.png',
							},
							{
								'index':'scan',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/05.png',
							},
							{
								'index':'pause-circle',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/06.png',
							},
							{
								'index':'wifi',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/07.png',
							},
							{
								'index':'email',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/08.png',
							},
							{
								'index':'list',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/09.png',
							},
							{
								'index':'list',
								'text':'名称',
								'icon':'http://gdshop-img.winlo.net/static/nav/10.png',
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
				productList: [],
			}
		},
		onLoad() {
			this.initData()
		},
		onReachBottom(){
			if (this.hotGoodsStatus != 'nomore'){
				this.getHotGoods()
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods:{
			initData(){
				let that = this
				that.getHotGoods()
			},
			getHotGoods(){
				let that = this
				that.hotGoodsPage++
				that.hotGoodsStatus = 'loading'
				that.$api.goods.list({page:that.hotGoodsPage}).then(res => {
					that.productList = that.productList.concat(res.list)
					if (res.page_info.has_more) {
						that.hotGoodsStatus = 'loadmore'
					}
					else{
						that.hotGoodsStatus = 'nomore'
					}
				})
			},
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
