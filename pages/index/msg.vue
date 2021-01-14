<template>
	<view class="msg-box">
		<view class="icon">
			<u-icon v-if="type == 'success'" 
			name="checkmark-circle-fill" size="194" 
			color="#00b400"></u-icon>
		</view>
		<view class="msg">
			{{msg}}
		</view>
		<view class="btns">
			<block v-if="btnType == 'order'">
			<u-button @click="gotoMyOrder">我的订单</u-button>
			<u-gap height="20" bg-color="#FFF"></u-gap>
			</block>
			<u-button type="success" @click="gotoHome">首页</u-button>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				type:'success',
				btnType:'order',
				msg: '消息'
			}
		},
		onLoad() {
			console.log(this.$Route.query)
			if(this.$Route.query.type){
				this.type = this.$Route.query.type
			}
			if(this.$Route.query.msg){
				this.msg = this.$Route.query.msg
			}
		},
		methods:{
			gotoHome(){
				this.$myRouter.pushTab({name:'index/index'})
			},
			gotoMyOrder(){
				let that = this
				that.$myRouter.pushTab({name:'member/index'})
				setTimeout(function() {
					that.$myRouter.push({name:'member/order_list'})
				}, 500);
				//this.$myRouter.push({name:'member/order_list'})
			}
		}
	} 
</script>

<style lang="scss" scoped>
	.msg-box{
		padding: 60rpx;
		text-align: center;
		
		.msg{
			font-size: 36rpx;
			font-weight: 700;
		}
		.btns{
			margin-top: 36rpx;
		}
	}
</style>
