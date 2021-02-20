<template>
	<view class="page-box">
		<view class="order" v-for="(res, rindex) in orderList" :key="rindex">
			<view class="top">
				<view class="left">
					<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
					<view class="store">{{ res.store_name }}</view>
					<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
				</view>
				<view class="right">{{ res.status_text }}</view>
			</view>
			<view class="item" v-for="(item, index) in res.subs" :key="index">
				<view class="left"><image :src="item.cover_photo" mode="aspectFill"></image></view>
				<view class="content">
					<view class="title u-line-2">{{ item.goods_name }}</view>
					<view class="type">{{ item.goods_option_title }}</view>
				</view>
				<view class="right">
					<view class="price">
						￥{{ priceInt(item.sell_price) }}
						<text class="decimal">.{{ priceDecimal(item.sell_price) }}</text>
					</view>
					<view class="number">x{{ item.total }}</view>
				</view>
			</view>
			<view class="total">
				共{{ totalNum(res.subs) }}件商品 合计:
				<text class="total-price">
					￥{{ priceInt(totalPrice(res.subs)) }}.
					<text class="decimal">{{ priceDecimal(totalPrice(res.subs)) }}</text>
				</text>
			</view>
			<view class="bottom">
				<view class="more">
					<u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon>
				</view>
				<view class="logistics btn">查看物流</view>
				<view class="exchange btn">卖了换钱</view>
				<view class="evaluate btn">评价</view>
			</view>
		</view>
		<u-loadmore :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
	</view>
</template>

<script>
export default {
	name:'member-order-list-box',
	data() {
		return {
			orderList:[],
			orderPage:0,
			orderEnd:false,
			loadStatus: 'loading',
		};
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
		// 页面数据
		getOrderList(idx) {
			const that = this
			if (that.orderEnd){
				return
			}
			that.orderPage++
			that.$api.order.list({
				status:that.getStatusByIdx(idx),
				page:that.orderPage,
				}).then(res => {
				that.orderList = that.orderList.concat(res.list)
				if (res.page_info.has_more){
					that.loadStatus = 'loadmore'
				} else{
					that.orderEnd = true
					that.loadStatus = 'nomore'
				}
			})
		},
		getStatusByIdx(idx){
			switch (parseInt(idx)){
				case 4:
					return 5;
				case 3:
					return 4;
				case 2:
					return 3;
				case 1:
					return 1;
				default:
					return 0;
			}
		},
		// 总价
		totalPrice(item) {
			let price = 0;
			item.map(val => {
				price += parseFloat(val.sell_price);
			});
			return price.toFixed(2);
		},
		// 总件数
		totalNum(item) {
			let num = 0;
			item.map(val => {
				num += val.total;
			});
			return num;
		},
	}
};
</script>
<style lang="scss" scoped>
	@import '@/static/css/member_order_list.scss';
	.page-box{
		padding-bottom: 30rpx;
	}
</style>
