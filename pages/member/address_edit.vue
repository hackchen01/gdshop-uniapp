<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" placeholder-class="line"
				 v-model="formData.addressee"
				 placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="text" placeholder-class="line" 
				v-model="formData.mobile"
				placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<view class="">
					{{address}}
				</view>
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea type="text" placeholder-class="line" 
				v-model="formData.address"
				placeholder="街道、楼牌等" />
			</view>
		</view>
		<view class="bottom">
			<view class="tag">
				<view class="left">标签</view>
				<view class="right">
					<text class="tags">家</text>
					<text class="tags">公司</text>
					<text class="tags">学校</text>
					<view class="tags plus"><u-icon size="22" name="plus"></u-icon></view>
				</view>
			</view>
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right">
					<u-switch active-color="red" v-model="checked"></u-switch>
				</view>
			</view>
      <view class="addSite" @tap="toAddSite">
        <view class="add">
          保存
        </view>
      </view>
		</view>
		<city-select 
		ref="citySelect"
		v-model="show" 
		@city-change="cityChange"></city-select>
	</view>
</template>

<script>
	import citySelect from '@/components/u-city-select-remove'
export default {
	components: {
		citySelect
	},
	onLoad() {
		console.log(this.$Route.query)
		if(this.$Route.query.id){
			this.getData(this.$Route.query.id)
		}
	},
	data() {
		return {
			addressId:0,
			show: false,
			checked: true,
			formData : {
				id:0,
				"addressee": "",
				"mobile": "",
				"province": "",
				"city": "",
				"area": "",
				"street": "",
				"address": "",
				"address_code": "",
				"is_default": 0
			},
			address:'',
		};
	},
	methods: {
		showRegionPicker() {
			this.show = true;
		},
		getData(_id){
			const that = this
			that.addressId = _id
			this.$api.member_address.details({id:_id}).then(res => {
				console.log(res)
				that.formData = res
				that.address = that.getAddressText(res)
				setTimeout(function() {
					that.$refs['citySelect'].reloadSelect(res.address_code,[
						that.formData.province,
						that.formData.city,
						that.formData.area,
						that.formData.street]
						)
				}, 500);
			})
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
		cityChange(e) {
			this.formData.address_code = e.street.value
			this.formData.province = e.province.label
			this.formData.city = e.city.label
			this.formData.area = e.area.label
			this.formData.street = e.street.label
			this.address = this.getAddressText(this.formData)
		},
		toAddSite(){
			const that = this
			this.formData.is_default = this.checked ? 1 : 0;
			let methodFn
			if (this.addressId > 0) {
				this.formData.id = this.addressId
				methodFn = this.$api.member_address.save
			}
			else{
				methodFn = this.$api.member_address.add
			}
			methodFn(this.formData).then(res => {
				that.$u.toast('保存成功')
			})
		}
	}
};
</script>

<style lang="scss" scoped>
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.wrap {
	background-color: #f2f2f2;
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
			}
		}
		
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 20rpx;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
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
