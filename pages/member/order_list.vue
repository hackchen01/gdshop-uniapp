<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper active-color="#d81e06" ref="tabs" :list="list" :current="current" 
				@change="change" :is-scroll="false" bg-color="#f5f5f5" bar-width="100"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[0]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.store }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">x{{ item.number }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.goodsList) }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsList)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view>
									<view class="evaluate btn">评价</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in  orderList[1]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.store }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">x{{ item.number }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.goodsList) }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsList)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view>
									<view class="evaluate btn">评价</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in  orderList[3]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.store }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">x{{ item.number }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.goodsList) }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsList)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view>
									<view class="evaluate btn">评价</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in  orderList[4]" :key="res.id">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ res.store }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">{{ res.deal }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.goodsList" :key="index">
									<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.title }}</view>
										<view class="type">{{ item.type }}</view>
										<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">x{{ item.number }}</view>
									</view>
								</view>
								<view class="total">
									共{{ totalNum(res.goodsList) }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(totalPrice(res.goodsList)) }}.
										<text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
									</text>
								</view>
								<view class="bottom">
									<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
									<view class="logistics btn">查看物流</view>
									<view class="exchange btn">卖了换钱</view>
									<view class="evaluate btn">评价</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[4]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderList: [[], [], [], [],[]],
			dataList: [
				{
					id: 1,
					store: '夏日流星限定贩卖',
					deal: '交易成功',
					goodsList: [
						{
							goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
							title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
							type: '灰色;M',
							deliveryTime: '付款后30天内发货',
							price: '348.58',
							number: 2
						},
						{
							goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
							title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
							type: '45cm;S',
							deliveryTime: '付款后30天内发货',
							price: '135.00',
							number: 1
						}
					]
				},
				{
					id: 2,
					store: '江南皮革厂',
					deal: '交易失败',
					goodsList: [
						{
							goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
							title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
							type: '粉色;M',
							deliveryTime: '付款后7天内发货',
							price: '128.05',
							number: 1
						}
					]
				},
				{
					id: 3,
					store: '三星旗舰店',
					deal: '交易失败',
					goodsList: [
						{
							goodsUrl: '//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
							title: '三星（SAMSUNG）京品家电 UA65RUF70AJXXZ 65英寸4K超高清 HDR 京东微联 智能语音 教育资源液晶电视机',
							type: '4K，广色域',
							deliveryTime: '保质5年',
							price: '1998',
							number: 3
						},
						{
							goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
							title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
							type: '容量大，速冻',
							deliveryTime: '保质5年',
							price: '2354',
							number: 1
						}
					]
				},
				{
					id: 4,
					store: '三星旗舰店',
					deal: '交易失败',
					goodsList: [
						{
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
							title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
							type: '4K，广色域',
							deliveryTime: '珍藏10年好酒',
							price: '1543',
							number: 3
						},
						{
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
							title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
							type: '一打',
							deliveryTime: '口感好',
							price: '120',
							number: 1
						}
					]
				},
				{
					id: 5,
					store: '三星旗舰店',
					deal: '交易成功',
					goodsList: [
						{
							goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg',
							title: '企业微信 中控人脸指纹识别考勤机刷脸机 无线签到异地多店打卡机WX108',
							type: '识别效率高',
							deliveryTime: '使用方便',
							price: '451',
							number: 9
						}
					]
				}
			],
			list: [
				{
					name: '全部'
				},
				{
					name: '待付款'
				},
				{
					name: '待发货'
				},
				{
					name: '待收货'
				},
				{
					name: '待评价',
					count: 12
				}
			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			loadStatus: ['loadmore','loadmore','loadmore','loadmore','loadmore'],
		};
	},
	onLoad() {
		/*
		this.getOrderList(0);
		this.getOrderList(1);
		this.getOrderList(2);
		this.getOrderList(3);
		this.getOrderList(4);
		*/
	   let _this = this
	   if(_this.$Route.query.status){
		   this.current = _this.$Route.query.status;
		   console.log(this.current)
		   this.swiperCurrent = _this.$Route.query.status;
		   setTimeout(function(){
			   _this.getOrderList(_this.$Route.query.status);
		   },100)
	   }
	   else{
		   this.current = 0;
		   this.swiperCurrent = 0;
		   setTimeout(function(){
			   _this.getOrderList(0);
		   },100)
	   }
	},
	computed: {
		// 价格小数
		priceDecimal() {
			return val => {
				if (val !== parseInt(val)) return val.slice(-2);
				else return '00';
			};
		},
		// 价格整数
		priceInt() {
			return val => {
				if (val !== parseInt(val)) return val.split('.')[0];
				else return val;
			};
		}
	},
	methods: {
		reachBottom() {
			// 此tab为空数据
			if(this.current != 2) {
				this.loadStatus.splice(this.current,1,"loading")
				setTimeout(() => {
					this.getOrderList(this.current);
				}, 1200);
			}
		},
		// 页面数据
		getOrderList(idx) {
			for(let i = 0; i < 5; i++) {
				let index = this.$u.random(0, this.dataList.length - 1);
				let data = JSON.parse(JSON.stringify(this.dataList[index]));
				data.id = this.$u.guid();
				this.orderList[idx].push(data);
			}
			this.loadStatus.splice(this.current,1,"loadmore")
		},
		// 总价
		totalPrice(item) {
			let price = 0;
			item.map(val => {
				price += parseFloat(val.price);
			});
			return price.toFixed(2);
		},
		// 总件数
		totalNum(item) {
			let num = 0;
			item.map(val => {
				num += val.number;
			});
			return num;
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
			console.log(index)
			this.getOrderList(index);
		},
		transition({ detail: { dx } }) {
			// console.log(dx)
			// this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
	@import '@/static/css/member_order_list.scss';
	.page-box{
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
