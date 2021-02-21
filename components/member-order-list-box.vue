<template>
	<view class="page-box">
		<view class="order" v-for="(res, rindex) in orderList" :key="rindex">
			<view class="top">
				<view class="left">
					<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
					<view class="store">{{ res.store_name }}</view>
					<u-icon name="arrow-right" color="rgb(203,203,203)" :size="30"></u-icon>
				</view>
				<view class="right">{{ getStatusText(res.status) }}</view>
			</view>
			<view class="item" v-for="(item, index) in res.subs" :key="index">
				<view class="left"><image :src="item.cover_photo" mode="aspectFill"></image></view>
				<view class="content">
					<view class="title u-line-2">{{ item.goods_name }}</view>
					<view class="type">{{ item.goods_option_title }}</view>
				</view>
				<view class="right">
					<view class="price">
						￥{{ priceInt(fenZhuanYuan(item.sell_price)) }}
						<text class="decimal">.{{ priceDecimal(fenZhuanYuan(item.sell_price)) }}</text>
					</view>
					<view class="number">x{{ item.total }}</view>
				</view>
			</view>
			<view class="tips-table" v-for="(tips,tindex) in res.tips_list" :key="rindex + '_' + tindex">
				<view class="title">{{tips.title}}</view>
				<view class="remark">{{tips.remark}}</view>
				<view class="status">{{tips.status}}</view>
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
					<!-- 更多 -->
				</view>
				<view class="btns">
					<view class="btn" v-if="res.is_express">查看物流</view>
					<view class="btn primary" 
					@click="gotoNext(res.id,res.status)"
					v-if="res.is_show_primary"
					>
					{{getNextStatusText(res.status)}}
					</view>
				</view>
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
			next_status_text: [],
			status_text: [],
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
				that.next_status_text = res.next_status_text
				that.status_text = res.status_text
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
				price += parseFloat(val.sell_price * val.total);
			});
			return this.fenZhuanYuan(price);
		},
		// 总件数
		totalNum(item) {
			let num = 0;
			item.map(val => {
				num += val.total;
			});
			return num;
		},
		fenZhuanYuan(_price){
			return (_price / 100).toFixed(2)
		},
		getNextStatusText(_status){
			if(this.next_status_text[_status]){
				return this.next_status_text[_status]
			} else {
				return '未知'
			}
		},
		getStatusText(_status){
			if(this.status_text[_status]){
				return this.status_text[_status]
			} else {
				return '未知'
			}
		},
		// 根据订单状态跳转下一个功能
		gotoNext(_orderId,_status){
			
		}
	}
};
</script>
<style lang="scss" scoped>
	@import '@/static/css/member_order_list.scss';
	.page-box{
		padding-bottom: 30rpx;
	}
</style>
