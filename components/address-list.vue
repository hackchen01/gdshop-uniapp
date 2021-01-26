<template>
	<view>
		<view class="item" v-for="(res, index) in addressList" :key="res.id">
			<view class="gou" v-if="listMode == 'select'">
				<u-icon name="checkbox-mark" v-if="selectedValue == res.id" :size="40" color="#F00"></u-icon>
				<u-icon name="checkbox-mark" v-else :size="40" color="#999"></u-icon>
			</view>
			<view class="main">
				<view class="top" @click="selectAddress(res)">
					<view class="name">{{ res.addressee }}</view>
					<view class="phone">{{ res.mobile }}</view>
					<view class="tag">
						<text v-for="(item, index) in res.tag" :key="index" :class="{red:item.tagText=='默认'}">{{ item.tagText }}</text>
					</view>
				</view>
				<view class="bottom">
					<text @click="selectAddress(res)">{{ getAddressText(res) }}</text>
				</view>
			</view>
			<view class="edit">
				<u-icon name="edit-pen" :size="40" color="#999999" @click="toEditAddress(res.id)"></u-icon>
			</view>
		</view>
		<view class="addSite" @tap="toAddAddress">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收货地址
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name:'address-select',
	props:{
		// 模式 select = 选择模式，默认为地址列表模式
		listMode:{
			type: String,
			default: ''
		},
		// 选中值，选择模式有效
		selectedValue:{
			type: String,
			default: ''
		},
		addressList:{
			type: Array,
			default () {
				return [];
			}
		}
	},
	data() {
		return {
			
		};
	},
	methods: {
		toAddAddress(){
			this.$myRouter.push({name:'member/address_edit'})
		},
		toEditAddress(_id){
			this.$myRouter.push({name:'member/address_edit',params:{id:_id}})
		},
		selectAddress(_row){
			this.$emit('selectAddress',_row)
		},
		getAddressText(e){
			let texts = []
			let xunhuanNames = [
				'province',
				'city',
				'area',
				'street',
			]
			for	(var k in xunhuanNames){
				if('不显示' != e[xunhuanNames[k]]){
					texts.push(e[xunhuanNames[k]])
				}
			}
			return texts.join('-')
		},
	}
};
</script>

<style lang="scss" scoped>
.item {
	padding: 40rpx 20rpx;
	display: flex;
	justify-content: space-between;
	.gou{
		display:flex;
		justify-content: center;
		align-items: center;
		width: 10vw;
	}
	.main{
		width: 80vw;
	}
	.edit{
		display:flex;
		justify-content: center;
		align-items: center;
		width: 10vw;
	}
	.top {
		display: flex;
		font-weight: bold;
		font-size: 34rpx;
		.phone {
			margin-left: 60rpx;
		}
		.tag {
			display: flex;
			font-weight: normal;
			align-items: center;
			text {
				display: block;
				width: 60rpx;
				height: 34rpx;
				line-height: 34rpx;
				color: #ffffff;
				font-size: 20rpx;
				border-radius: 6rpx;
				text-align: center;
				margin-left: 30rpx;
				background-color:rgb(49, 145, 253);
			}
			.red{
				background-color:red
			}
		}
	}
	.bottom {
		display: flex;
		margin-top: 20rpx;
		font-size: 28rpx;
		justify-content: space-between;
		color: #999999;
	}
}
.addSite {
	display: flex;
	justify-content: space-around;
	width: 600rpx;
	line-height: 100rpx;
	position: absolute;
	bottom: 30rpx;
	left: 80rpx;
	background-color: red;
	border-radius: 60rpx;
	font-size: 30rpx;
	.add{
		display: flex;
		align-items: center;
		color: #ffffff;
		.icon{
			margin-right: 10rpx;
		}
	}
}
</style>
