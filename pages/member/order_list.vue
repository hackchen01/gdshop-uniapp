<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper active-color="#d81e06" ref="tabs" :list="list" :current="current" 
				@change="change" :is-scroll="false" bg-color="#f5f5f5" bar-width="100"
				 swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" 
			@animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(item,index) in list" :key="index">
					<scroll-view scroll-y style="height: 100%;width: 100%;" 
					@scrolltolower="reachBottom">
						<list-box ref="listBox"></list-box>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import listBox from '@/components/member-order-list-box'
export default {
	components:{
		listBox
	},
	data() {
		return {
			list: [
				{
					name: '全部',
				},
				{
					name: '待付款',
				},
				{
					name: '待发货',
				},
				{
					name: '待收货',
				},
				{
					name: '待评价',
				}
			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
		};
	},
	onLoad() {
	   let _this = this
	   console.log(_this.$Route.query)
	   if(_this.$Route.query.status){
		   _this.swiperCurrent = _this.current = _this.$Route.query.status;
	   }
	   else{
		   _this.swiperCurrent = _this.current = 0;
	   }
	   setTimeout(function(){
			_this.getOrderList(_this.swiperCurrent)
	   },100)
	},
	methods: {
		reachBottom() {
			const that = this
			that.getOrderList(that.current);
		},
		// 页面数据
		getOrderList(idx) {
			this.$refs['listBox'][idx].getOrderList(idx)
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
		padding-bottom: 30rpx;
	}
</style>
