<template>
	<view class="goods-details">
		<view class="page-bg-gray"></view>
		<nav-bar ref="navBar" type="transparentFixed" :scrollTop="scrollTop" transparentFixedFontColor="#000">
			<view slot="left">
				<!-- 左边 正常状态 -->
				<view class="header_left_info nav-bar-left"
				:class="{'header_btnMongol header_colorWhite_btnMongol':isShowHomeBtn}">
					<view class="header_left_back header_btnMongol_left_back" @click="goBack">
						<u-icon class="icon" name="arrow-left"></u-icon>
					</view>
					<text class="header_left_line" v-if="isShowHomeBtn"></text>
					<view class="header_left_home header_btnMongol_left_home" v-if="isShowHomeBtn"
					 @click="gotoNavigation('home')"
					 >
						<u-icon class="icon" name="home"></u-icon>
					</view>
				</view>
			</view>
			<view slot="transparentFixedLeft">
				<!-- 左边 透明状态 -->
				<view class="header_left_info header_btnMongol header_colorWhite_btnMongol nav-bar-left nav-bar-left-transparent">
					<view class="header_left_back header_btnMongol_left_back" @click="goBack">
						<u-icon class="icon" name="arrow-left"></u-icon>
					</view>
					<text class="header_left_line" v-if="isShowHomeBtn"></text>
					<view class="header_left_home header_btnMongol_left_home" v-if="isShowHomeBtn"
					@click="gotoNavigation('home')"
					>
						<u-icon class="icon" name="home"></u-icon>
					</view>
				</view>
			</view>
			<view slot="right">
				<!-- 右边 正常状态 -->
				<view class="nav-bar-right">
					<u-icon class="icon" size="46" name="more-circle"></u-icon>
				</view>
			</view>
			<view slot="transparentFixedRight">
				<!-- 右边 透明状态 -->
				<view class="nav-bar-right nav-bar-right-transparent">
					<u-icon class="icon" size="46" name="more-circle-fill"></u-icon>
				</view>
			</view>
			<view slot="default">
				<!-- 标题 正常状态 -->
				商品详情
			</view>
			<view slot="transparentFixed">
				<!-- 标题 透明状态 -->
			</view>
		</nav-bar>
		<view class="goods-details-content">
			<!--banner-->
			<u-swiper :list="wiperList" height="750" indicator-pos="bottomRight"></u-swiper>
			<!--banner-->
			<view class="">
				<view class="goods-title">
					<view class="goods-item-price-box">
						<view class="goods-item-price">
							<view class="price-number-box">
								<view class="price-number">
									<text>￥</text>
									<text class="yuan">{{moneyShow(goodsInfo.sell_price,0)}}</text>
									<text class="decimal">.{{moneyShow(goodsInfo.sell_price,1)}}</text>
								</view>
								<u-tag text="新品" mode="plain" size="mini" 
								shape="circle" v-if="goodsId.is_new" />
								<u-tag text="热卖" mode="plain" type="error" 
								size="mini" shape="circle" v-if="goodsId.is_hot"/>
							</view>
							<view class="original-price gray">
								价格
								<text class="line-through">￥{{getMoneyByMinute(goodsInfo.market_price)}}</text>
							</view>
						</view>
						<view class="collection" @tap="goodsCollection">
							<template v-if="goodsInfo.is_collection">
								<u-icon name="heart-fill" size="46" 
								color="#F00"></u-icon>
								<view class="scale-collection" style="color:#F00;">收藏</view>
							</template>
							<template v-else>
								<u-icon name="heart" size="46"></u-icon>
								<view class="scale-collection">收藏</view>
							</template>
						</view>
					</view>
					<view class="goods-name">
						<view class="box">
							{{goodsInfo.goods_name}}
						</view>
						<view class="share-btn">
							<u-icon name="share" size="28"></u-icon>
							<text class="text">分享</text>
						</view>
					</view>
					<view class="sale-info-box">
						<view class="sale-info-tip">
							{{goodsInfo.sub_title}}
						</view>
						<view class="sale-info">
							<view v-if="goodsInfo.is_show_sales">
								月销：{{goodsInfo.sales+goodsInfo.virtual_sales}}
							</view>
							<view v-if="goodsInfo.is_show_stock">
								库存：{{goodsInfo.stock}}
							</view>
							<!-- <view>浙江杭州</view> -->
						</view>
					</view>
					<view class="freight-box">
						<view class="title">
							运费
						</view>
						<view class="center">
							在线支付免运费
						</view>
						<view class="more">
							<!-- <u-icon name="more-dot-fill" size="36"></u-icon> -->
						</view>
					</view>
					<view class="guarantee">
						<view class="guarantee-item">
							<u-icon name="checkmark-circle"></u-icon>
							<text class="text">可配送海外</text>
						</view>
						<view class="guarantee-item">
							<u-icon name="checkmark-circle"></u-icon>
							<text class="text">店铺发货&售后</text>
						</view>
						<view class="guarantee-item">
							<u-icon name="checkmark-circle"></u-icon>
							<text class="text">7天无理由退货</text>
						</view>
						<view class="guarantee-item">
							<u-icon name="checkmark-circle"></u-icon>
							<text class="text">闪电退款</text>
						</view>
						<view class="guarantee-item">
							<u-icon name="checkmark-circle"></u-icon>
							<text class="text">极速审核</text>
						</view>
						<view class="guarantee-item">
							<u-icon name="checkmark-circle"></u-icon>
							<text class="text">极速发货</text>
						</view>
					</view>
				</view>
				<view class="discount-box">
					<view class="coupon-box">
						<view class="title">
							优惠
						</view>
						<view class="center">
							<u-tag text="满99减8" class="coupon-tag" mode="dark" shape="circle" size="mini" />
							<u-tag text="满59减5" class="coupon-tag" mode="dark" shape="circle" size="mini" />
							<u-tag text="满59减5" class="coupon-tag" mode="dark" shape="circle" size="mini" />
							<u-tag text="满59减5" class="coupon-tag" mode="dark" shape="circle" size="mini" />
							<u-tag text="满59减5" class="coupon-tag" mode="dark" shape="circle" size="mini" />
						</view>
						<view class="more" @click="gotoCouponCenter">
							<u-icon name="more-dot-fill" size="36"></u-icon>
						</view>
					</view>
					<view class="promote-sales-box">
						<view class="title">
							活动
						</view>
						<view class="center">
							<view class="promotion-box">
								<u-tag text="多买优惠" mode="plain" shape="circle" type="error" size="mini" />
								<text class="promotion-text">满1件，立减最低1件商品价格，包邮（限中国内地）</text>
							</view>
							<view class="promotion-box">
								<u-tag text="多买优惠" mode="plain" shape="circle" type="error" size="mini" />
								<text class="promotion-text">满1件，立减最低1件商品价格，包邮（限中国内地）</text>
							</view>
							<view class="promotion-box">
								<u-tag text="多买优惠" mode="plain" shape="circle" type="error" size="mini" />
								<text class="promotion-text">满1件，立减最低1件商品价格，包邮（限中国内地）</text>
							</view>
						</view>
						<view class="more">
							<u-icon name="more-dot-fill" size="36"></u-icon>
						</view>
					</view>
				</view>
				<!--
				<view class="base-box">
					<view class="specs-option-box" @click="showGoodsSku">
						<view class="title">
							已选
						</view>
						<view class="center">
							个性水滴耳环【A2】,1个，可选服务
						</view>
						<view class="more">
							<u-icon name="more-dot-fill" size="36"></u-icon>
						</view>
					</view>
					<view class="logistics-box">
						<view class="title">
							送至
						</view>
						<view class="center">
							<view class="addr-item">
								北京朝阳区三环到四环之间
							</view>
							<view class="addr-item">
								今日23:59前完成下单，预计6月28日23:30前发货，7月1日24:00前送达
							</view>
						</view>
						<view class="more">
							<u-icon name="more-dot-fill" size="36"></u-icon>
						</view>
					</view>
					<view class="freight-box">
						<view class="title">
							运费
						</view>
						<view class="center">
							在线支付免运费
						</view>
						<view class="more">
							<u-icon name="more-dot-fill" size="36"></u-icon>
						</view>
					</view>
					<view class="guarantee">
						<view class="guarantee-item">
							<u-icon name="checkmark-circle"></u-icon>
							<text class="text">可配送海外</text>
						</view>
						<view class="guarantee-item">
							<u-icon name="checkmark-circle"></u-icon>
							<text class="text">店铺发货&售后</text>
						</view>
						<view class="guarantee-item">
							<u-icon name="checkmark-circle"></u-icon>
							<text class="text">7天无理由退货</text>
						</view>
						<view class="guarantee-item">
							<u-icon name="checkmark-circle"></u-icon>
							<text class="text">闪电退款</text>
						</view>
						<view class="guarantee-item">
							<u-icon name="checkmark-circle"></u-icon>
							<text class="text">极速审核</text>
						</view>
						<view class="guarantee-item">
							<u-icon name="checkmark-circle"></u-icon>
							<text class="text">极速发货</text>
						</view>
					</view>
				</view>
				 -->
				<view class="comment-box">
					<view class="freight-box">
						<view class="title">
							评价
						</view>
						<view class="center">

						</view>
						<view class="more" @click="gotoCommentList">
							<u-icon name="more-dot-fill" size="36"></u-icon>
						</view>
					</view>
					<view>
						<goods-comment :commentList="commentList" />
						<view class="comment-btn">
							<u-button shape="circle" size="medium" class="all-btn"
							@click="gotoCommentList"
							>查看全部评价</u-button>
						</view>
					</view>
				</view>
			</view>

			<u-divider bgColor="f5f5f5" margin-bottom="30" margin-top="30">宝贝详情</u-divider>

			<view class="goods-content-box" v-if="goodsContentIsLoading && goodsContent.length>0">
				 <mp-html :content="goodsContent" :lazy-load="true">
					 <u-loadmore v-if="!goodsContentIsLoading" :status="'loading'" />
				 </mp-html>
			</view>
			<view class="goods-content-box" v-else>
				 <u-empty text="宝贝详情为空" mode="data"></u-empty>
			</view>

			<u-gap height="180" bg-color="#f5f5f5"></u-gap>
		</view>

		<vk-u-goods-sku-popup
			v-model="skuIsShow"
			border-radius="20"
			:custom-action="findGoodsInfo"
			:mode="skuMode"
			:closeImage="closeImage"
			@open="openSkuPopup"
			@close="closeSkuPopup"
			@add-cart="addCart"
			@buy-now="buyNow"
			goodsIdName="id"
			skuIdName="id"
			skuListName="options"
			specListName="specs"
			goodsThumbName="cover"
		></vk-u-goods-sku-popup>

		<!-- 底部栏 -->
		<view class="navigation">
			<view class="left">
				<u-grid :col="3">
					<u-grid-item :customStyle="customStyle" @click="gotoNavigation('kefu')">
						<u-icon name="server-fill" :size="40"></u-icon>
						<view class="grid-text">客服</view>
					</u-grid-item>
					<u-grid-item :customStyle="customStyle" @click="gotoNavigation('home')">
						<u-icon name="home" :size="40"></u-icon>
						<view class="grid-text">首页</view>
					</u-grid-item>
					<u-grid-item :customStyle="customStyle" @click="gotoNavigation('cart')">
						<u-badge :count="cartCount" :offset="[0, 10]"></u-badge>
						<u-icon name="shopping-cart" :size="40"></u-icon>
						<view class="grid-text">购物车</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="showGoodsSku">加入购物车</view>
				<view class="buy btn u-line-1" @click="showGoodsSku">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navBar from '@/plugins/zhouWei-navBar/index'
	import goodsComment from '@/components/goods-comment'
	import vkUGoodsSkuPopup from '@/plugins/vk-u-goods-sku-popup/vk-u-goods-sku-popup'
	import mpHtml from '@/plugins/mp-html/mp-html'
	import utils from '@/utils/index'
	import { mapState } from 'vuex'
	var that;
	const goodsData1 = {
		"_id":"001",
		"name": "iphone11",
		"goods_thumb":"https://img14.360buyimg.com/n0/jfs/t1/59022/28/10293/141808/5d78088fEf6e7862d/68836f52ffaaad96.jpg",
		"sku_list": [
			{
				"_id": "001",
				"goods_id": "001",
				"goods_name": "iphone11",
				"sku_id": "1-1-1",
				"image": "https://img14.360buyimg.com/n0/jfs/t1/79668/22/9987/159271/5d780915Ebf9bf3f4/6a1b2703a9ed8737.jpg",
				"price": 19800,
				"sku_name": "红色,128G,公开版",
				"sku_name_arr": ["红色", "128G", "公开版"],
				"stock": 100
			},
			{
				"_id": "002",
				"goods_id": "001",
				"goods_name": "iphone11",
				"sku_id": "1-1-2",
				"image": "https://img14.360buyimg.com/n0/jfs/t1/52252/35/10516/124064/5d7808e0E46202391/7100f3733a1c1f00.jpg",
				"price": 9800,
				"sku_name": "白色,256G,公开版",
				"sku_name_arr": ["白色", "256G","公开版"],
				"stock": 100
			},
			{
				"_id": "003",
				"goods_id": "001",
				"goods_name": "iphone11",
				"sku_id": "1-1-3",
				"image": "https://img14.360buyimg.com/n0/jfs/t1/79668/22/9987/159271/5d780915Ebf9bf3f4/6a1b2703a9ed8737.jpg",
				"price": 19800,
				"sku_name": "红色,256G,公开版",
				"sku_name_arr": ["红色","256G","公开版"],
				"stock": 100
			}
		],
		"spec_list": [
			{
				"name": "颜色",
				"list": [
					{
						"name": "红色"
					},
					{
						"name": "黑色"
					},
					{
						"name": "白色"
					}
				]
			},
			{
				"name": "内存",
				"list": [
					{
						"name": "128G"
					},
					{
						"name": "256G"
					}
				]
			},
			{
				"name": "版本",
				"list": [
					{
						"name": "公开版"
					},
					{
						"name": "非公开版"
					}
				]
			}
		]
	};
	export default{
		components:{
			navBar,
			goodsComment,
			vkUGoodsSkuPopup,
			mpHtml
		},
		computed:{
			...mapState([
				'cartCount',
			]),
			isShowHomeBtn(){
				return true;
			},
		},
		onLoad() {
			console.log(this.$Route.query)
			that = this
			if (that.$Route.query.id){
				that.goodsId = that.$Route.query.id
				that.getGoodsInfo(that.goodsId)
			}
		},
		onReachBottom(e){
			if (!this.goodsContentIsLoading) {
				this.getGoodsContent(this.goodsId)
			}
		},
		data() {
			return {
				goodsId:0,
				goodsInfo:{},
				goodsContent:'',
				goodsContentIsLoading:false,
				skuIsShow:false,
				skuMode:1,
				closeImage:'/static/images/btn_sku_popup_close.png',
				scrollTop:0,
				wiperList: [],
				customStyle:{
					'padding':'16rpx 0'
				},
				commentList:[
				{
					id: 1,
					name: '叶轻眉',
					date: '12-25 18:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					allReply: 12,
					likeNum: 33,
					isLike: false,
					replyList: [
						{
							name: 'uview',
							contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
						},
						{
							name: '粘粘',
							contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
						}
					]
				},
				{
					id: 2,
					name: '叶轻眉1',
					date: '01-25 13:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					allReply: 0,
					likeNum: 11,
					isLike: false,
					url: 'https://cdn.uviewui.com/uview/template/niannian.jpg',
				},
				{
					id: 3,
					name: '叶轻眉2',
					date: '03-25 13:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					allReply: 0,
					likeNum: 21,
					isLike: false,
					allReply: 2,
					url: '../../../static/logo.png',
					replyList: [
						{
							name: 'uview',
							contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
						},
						{
							name: '豆包',
							contentStr: '想吃冰糖葫芦粘豆包，但没钱5555.........'
						}
					]
				},
				{
					id: 4,
					name: '叶轻眉3',
					date: '06-20 13:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					allReply: 0,
					likeNum: 150,
					isLike: false
				}
			]
			}
		},
		methods:{
			goBack(){
				console.log('goBack')
			   this.$myRouter.back()
			},
			showGoodsSku(){
				this.skuIsShow = true
			},
			closeSku(){
				this.skuIsShow = false
			},
			getMoneyByMinute(_price){
				return utils.getMoneyByMinute(_price)
			},
			moneyShow(_price,_type){
				let p = utils.getMoneyByMinute(_price).toString()
				let tmp = p.split('.')
				return tmp[_type]
			},
			getGoodsInfo(_goodsId){
				this.$api.goods.details({id:_goodsId}).then(res => {
					that.goodsInfo = res
					that.wiperList = res.thumbs
				})
			},
			getGoodsContent(_goodsId){
				this.$api.goods.content({id:_goodsId}).then(res => {
					that.goodsContent = res
					that.goodsContentIsLoading = true
				})
			},
			gotoNavigation(_type){
				switch (_type){
					case 'kefu':
						break;
					case 'cart':
						this.$myRouter.pushTab({name:'cart/index'})
						break;
					case 'home':
					default:
						this.$myRouter.pushTab({name:'index/index'})
						break;
				}
			},
			// sku组件 开始-----------------------------------------------------------
			openSkuPopup(){
				console.log("监听 - 打开sku组件");
			},
			closeSkuPopup(){
				console.log("监听 - 关闭sku组件");
			},
			// 加入购物车前的判断
			addCartFn(obj){
				let { selectShop } = obj;
				// 模拟添加到购物车,请替换成你自己的添加到购物车逻辑
				let res = {};
				let name = selectShop.goods_name;
				if(selectShop.sku_name != "默认"){
					name += "-"+selectShop.sku_name;
				}
				res.msg = `${name} 已添加到购物车`;
				if(typeof obj.success == "function") obj.success(res);
			},
			// 加入购物车按钮
			addCart(selectShop){
				console.log("监听 - 加入购物车");
				console.log(selectShop)
				that.addCartFn({
					selectShop : selectShop,
					success : function(res){
						// 实际业务时,请替换自己的加入购物车逻辑
						that.$api.cart.save({
							goods_id:that.goodsId,
							goods_num:selectShop.buy_num,
							goods_option_id:selectShop.id,
							is_selected:true,
						}).then(res => {
							that.closeSku()
							that.toast('加入购物车成功')
							uni.$emit('CART_COUNT_CHANGE',res)
						}).catch(err => {
							that.toast(err.message)
						})
					}
				});
			},
			// 立即购买
			buyNow(selectShop){
				console.log("监听 - 立即购买");
				console.log(selectShop)
				that.addCartFn({
					selectShop : selectShop,
					success : function(res){
						// 实际业务时,请替换自己的立即购买逻辑
						// that.toast("立即购买");
						that.closeSku()
						that.$myRouter.push({
							name:'order/create',
							params:{
								goods_id:that.goodsId,
								goods_num:selectShop.buy_num,
								goods_option_id:selectShop.id,
							},
						})
					}
				});
			},
			/**
			 * 获取商品信息
			 * 这里可以看到每次打开SKU都会去重新请求商品信息,为的是每次打开SKU组件可以实时看到剩余库存
			 */
			findGoodsInfo(e){
				return new Promise(function (resolve, reject) {
					// 此处写接口请求，并将返回的数据进行处理成goodsData1的数据格式，
					// 并执行resolve
					// let goodsInfo = goodsData1;			// 有sku的商品
					// console.log(goodsInfo)
					//let goodsInfo = goodsData2;   // 无sku的商品
					resolve(that.goodsInfo);
					// resolve(goodsData1);
					/*
					that.$api.goods.details({id:that.goodsId}).then(res => {
						resolve(res);
					})*/
				});
			},
			toast(msg){
				uni.showToast({
					title: msg,
					icon:"none"
				});
			}
			// sku组件 结束-----------------------------------------------------------
			,gotoCommentList(){
				this.$myRouter.push({name:'goods/comment',params:{id:1}})
			}
			,gotoCouponCenter(){
				this.$myRouter.push({name:'coupon/index',params:{goods_id:1}})
			},
			goodsCollection(){
				const that = this
				that.$api.goods.collection({id:that.goodsId})
				.then(res => {
					if(that.goodsInfo.is_collection){
						that.$u.toast('取消收藏成功')
					}
					else{
						that.$u.toast('收藏成功')
					}
					that.goodsInfo.is_collection = !that.goodsInfo.is_collection
					
				})
			}
		},
		onPageScroll(e) {
			// this.scrollTop = e.scrollTop;
			/*
			if (e.scrollTop > 300){
				this.scrollTop = 300
			} else {
				this.scrollTop = 0
			}
			*/
		   this.$refs.navBar.pageScroll(e);
		},
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS-NVUE */
	@function unit($num) {
		@return $num + 0rpx;
	}
	/* #endif */
	/* #ifndef APP-PLUS-NVUE */
	@function unit($num) {
		@return $num + 0upx;
	}
	/* #endif */
	.header_left_info {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		height: unit(56);
		margin-left: unit(16);
	}
	.header_transparentFixed_left_info {
	    border-style: solid;
	    border-width: 1px;
	    border-color: rgba(0, 0, 0, 0.1);
	    background-color: rgba(255, 255, 255, 0.7);
	    -webkit-border-radius: 16px;
	    border-radius: 16px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	}
	.header_btnMongol {
	    -webkit-border-radius: 16px;
	    border-radius: 16px;
	    border-style: solid;
	    border-width: 1px;
	    border-color: rgba(0, 0, 0, 0.1);
	    background-color: rgba(255, 255, 255, 0.7);
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	}
	.header_colorWhite_btnMongol {
	    border-style: solid;
	    border-width: 1px;
	    border-color: rgba(255, 255, 255, 0.3);
	    background-color: rgba(0, 0, 0, 0.2);
	}
	.header_left_line {
		height: unit(30);
		width: unit(2);
		background-color: rgba(255, 255, 255, 0.4);
	}

	.header_left_back {
		width: unit(76);
		height: 100%;
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
	}

	.header_icon {
		width: unit(70);
		height: unit(70);
	}

	.header_left_home {
		width: unit(76);
		height: 100%;
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
	}
	.nav-bar-left{
		.icon{
			color: #000;
		}
		.header_left_line{
			background-color:#CCC;
		}
	}
	.nav-bar-left.header_colorWhite_btnMongol{
		border-color:#CCC;
		background-color:#FFF;
	}
	.nav-bar-left-transparent{
		.icon{
			color: #FFF;
		}
		.header_left_line{
			background-color:rgba(255, 255, 255, 0.4);
		}
	}
	.nav-bar-left-transparent.header_colorWhite_btnMongol{
		border-color:rgba(255, 255, 255, 0.3);
		background-color:rgba(0, 0, 0, 0.2);
	}
	.nav-bar-right{
		padding-right: 10px;
	}
	.goods-title{
		background: #fff;
		padding-top: 15px;
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
	}
	.goods-item-price-box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 15px;

		.goods-item-price{


			.price-number-box{
				line-height: 22px;
				display: flex;


				.yuan{
					font-size: 60rpx;
				}
				.price-number{
					font-size: 18px;
					font-weight: 700;
					color: #ff201f;
					margin-right: 20rpx;
				}
				.u-size-mini{
					padding: 12rpx 18rpx;
					transform: scale(0.8);
					font-size: 12px;
				}
			}
			.original-price{
				font-size: 13px;
				line-height: 13px;
				padding: 5px 0;
				box-sizing: border-box;
				color: #999;

				.line-through{
					text-decoration:line-through;
				}
			}
		}
		.collection{
			color: #333;
			height: 22px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.original-price {
		    font-size: 13px;
		    line-height: 13px;
		    padding: 5px 15px;
		    box-sizing: border-box;
		}
	}
	.goods-name{
		position: relative;

		.box{
			font-size: 16px;
			font-weight: 500;
			position: relative;
			padding: 0 75px 0 15px;
			box-sizing: border-box;
			color: #000;
			padding-top: 20rpx;
		}
		.share-btn{
			color:#999;
			border-radius: 25px 0 0 25px;
			background-color: #ededed;
			position: absolute;
			right: 0;
			top: 15px;
			padding: 12rpx 16rpx;
			font-size: 28rpx;
			line-height: 28rpx;

			.text{
				margin-left: 10rpx;
			}
		}
	}
	.sale-info-box{
		color: #999;
		padding: 0 30rpx 30rpx 30rpx;
		font-size: 12px;

		.sale-info-tip{
			padding: 14px 0;
			line-height: 16px;
		}
		.sale-info{
			display: flex;
			justify-content: space-between;
			padding-top: 14rpx;

		}
	}
	.discount-box{
		margin-top: 24rpx;
		background-color: #FFF;
		border-radius: 24rpx;
	}
	.coupon-box,.promote-sales-box,.specs-option-box,.logistics-box,.freight-box{
		display: flex;
		width: 100%;
		align-items: center;
		font-size: 28rpx;
		line-height: 28rpx;
		padding: 24rpx 30rpx 24rpx 30rpx;
		box-sizing: border-box;
	}
	.coupon-box .title,.promote-sales-box .title
	,.specs-option-box .title
	,.logistics-box .title
	,.freight-box .title{
		width: 100rpx;
		font-weight: 700;
	}
	.coupon-box .more,.specs-option-box .more,.logistics-box .more,.freight-box .more{
		margin-left: auto;
	}
	.coupon-box{
		.center{
			line-height: 60rpx;

			.coupon-tag{
				background-color:#fa3534;
				margin-right: 10rpx;

				/* #ifdef MP */
				border-radius:100rpx;
				.u-tag{
					background-color:#fa3534;
					padding: 12rpx;
				}
				/* #endif */
			}
		}
	}
	.promote-sales-box{
		position: relative;

		.center{
			width: 80%;

			.promotion-box{
				display: flex;
				align-items: center;
				padding: 5px 0;

				.promotion-text{
					width: 70%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					margin-left: 20rpx;
				}
			}
		}
		.more{
			position: absolute;
			right: 15px;
			top: 15px;
		}
	}
	.base-box{
		margin-top: 24rpx;
		background-color: #FFF;
		border-radius: 24rpx;
	}
	.logistics-box .center{
		width: 76%;
		.addr-item{
			padding: 10rpx;
			line-height: 36rpx;
		}
	}
	.guarantee{
		display: flex;
		flex-wrap: wrap;
		padding: 10px 15px 15px 15px;
		font-size: 12px;
		.guarantee-item{
			color: #999;
			padding-right: 15px;
			padding-top: 5px;

			.text{
				padding-left: 2px;
			}
		}
	}


	.navigation {
		display: flex;
		border-top: solid 2rpx #f2f2f2;
		border-bottom: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;
		
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		.left {
			width: 50%;
		}
		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			justify-content:center;
			border-bottom: solid 2rpx #f2f2f2;
			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}
			.cart {
				background-color: #ed3f14;
				margin-right: 10rpx;
			}
			.buy {
				background-color: #ff7900;
			}
		}
	}
	.comment-box{
		margin-top: 24rpx;
		background-color: #FFF;
		border-radius: 24rpx;
	}
	.goods-content-box{
		/deep/ ._img{ // 修复富文本里面图片空白的问题
			vertical-align: middle;
			font-size: 0;
		}
	}
	.comment-btn{
		padding: 20rpx 50rpx;
		text-align: center;

		.all-btn{
			margin: auto;
		}
	}
</style>
