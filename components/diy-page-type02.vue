<template>
	<view>
		<view class="icon-group-box" v-if="iconList.length > 0">
			<template v-if="iconGroupIsSwiper">
				<swiper class="swiper" @change="iconGroupChange" :style="'height:'+data.line_height+'px;'">
					<swiper-item v-for="(g, gi) in iconList" :index="gi" :key="gi">
						<u-grid :col="data.num" @click="iconGroupClick" 
						:border="isShowBorder != 0" hover-class="none">
							<u-grid-item v-for="(item, index) in g" :index="item.index" :key="index"
							:bg-color="data.item_bg_color">
								<u-icon :name="item.icon" :size="data.icon_size"></u-icon>
								<text class="grid-text">{{ item.text }}</text>
							</u-grid-item>
						</u-grid>
					</swiper-item>
				</swiper>
				<view class="indicator-dots">
					<view class="indicator-dots-item" v-for="(g, gi) in iconList" :index="gi" :key="gi"
					:class="[iconGroupCurrent == gi ? 'indicator-dots-active' : '']">
					</view>
				</view>
			</template>
			<template v-else>
				<view v-for="(g, gi) in iconList" :index="gi" :key="gi">
					<u-grid :col="data.num" @click="iconGroupClick" 
					:border="isShowBorder != 0" hover-class="none">
						<u-grid-item v-for="(item, index) in g" :index="item.index" :key="index"
						:bg-color="data.item_bg_color">
							<u-icon :name="item.icon" :size="data.icon_size"></u-icon>
							<text class="grid-text">{{ item.text }}</text>
						</u-grid-item>
					</u-grid>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import utils from '@/utils/index'
	export default {
		name: "diy-page-type02",
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
				isShowBorder:0,
				iconGroupCurrent: 0
			};
		},
		watch: {

		},
		computed: {
			iconList(){
				let tmps = []
				this.data.photos.map((item,index) => {
					tmps.push({
								'index':index,
								'text':item.title,
								'icon':item.img,
							})
				})
				return this.chunk(tmps,this.data.page_size)
			},
			iconGroupIsSwiper(){
				return this.iconList.length > 1
			}
		},
		methods: {
			chunk(arr, size) {
			  var rsArr = [];
			  for(var i=0;i<arr.length;i+=size){
			    var tempArr=[];
			    for(var j=0;j<size&&i+j<arr.length;j++){
			      tempArr.push(arr[i+j]);
			    }
			    rsArr.push(tempArr);
			  }
			  return rsArr;
			},
			gotoClick(_index){
				let row = this.getClickRow(_index)
				if(!row){
					return false
				}
				
				if (!row.link){
					// 未设置跳转
					return false
				}
				
				console.log(row)
				utils.diyPage.gotoUrl(row.type_id,row.link)
			},
			getClickRow(_index){
				return this.data.photos[_index]
			},
			iconGroupChange(e) {
				this.iconGroupCurrent = e.detail.current;
			},
			iconGroupClick(e) {
				console.log(e)
				this.gotoClick(e)
			}
		},
	};
</script>

<style lang="scss" scoped>
	/deep/ .u-grid-item-box{
		padding:20rpx 0 0 0 !important;
		.grid-text{
			margin-top: 10rpx;
			font-size: 20rpx;
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
</style>
