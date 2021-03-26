<template>
	<view class="picturew-box mode-2">
		<view class="picturew-item" v-for="(pic,index) in data.pictures" :key="index">
			<u-image :src="pic.img" class="img" 
			mode="widthFix">
			</u-image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "diy-page-type06",
		props: {
			// DIY页面类型
			typeId: {
				type: Number,
				default: 0
			},
			//页面数据
			data: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {

			};
		},
		watch: {

		},
		computed: {

		},
		methods: {
			gotoClick(_index){
				console.log(_index)
				let row = this.getClickRow(_index)
				if(!row){
					return false
				}
				
				if (!row.link){
					// 未设置跳转
					return false
				}
				
				console.log(row)
			},
			getClickRow(_index){
				return this.data.data_list[_index]
			}
		},
	};
</script>

<style lang="scss" scoped>
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
