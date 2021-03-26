<template>
	<view>
		<view class="icon-group-box" v-if="iconList.length > 0">
			<template v-if="iconGroupIsSwiper">
				<swiper class="swiper" @change="iconGroupChange" :style="'height:'+data.line_height+'px;'">
					<swiper-item v-for="(g, gi) in iconList" :index="gi" :key="gi">
						<u-grid :col="data.num" @click="iconGroupClick" 
						:border="isShowBorder != 0" hover-class="none">
							<u-grid-item v-for="(item, index) in g" :index="item.index" :key="index"
							:bg-color="iconGroup.item_bg_color">
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
						:bg-color="iconGroup.item_bg_color">
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
								'index':'index-' + index,
								'text':item.title,
								'icon':item.img,
							})
				})
				return tmps
			},
			iconGroupIsSwiper(){
				return this.iconList.length > 1
			}
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
			},
			iconGroupChange(e) {
				this.iconGroupCurrent = e.detail.current;
			},
			iconGroupClick(e) {
				console.log(e)
			}
		},
	};
</script>

<style lang="scss" scoped>
	
</style>
