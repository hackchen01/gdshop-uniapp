<template>
	<view class="swiper-box">
		<u-swiper :list="swiperList" mode="rect" height="300" @click="gotoClick"></u-swiper>
	</view>
</template>

<script>
	export default {
		name: "diy-page-type07",
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
			swiperList(){
				return this.data.data_list.map(item => {
					item.image = item.img;
					return item
				})
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
			}
		},
	};
</script>

<style lang="scss" scoped>
	
</style>
