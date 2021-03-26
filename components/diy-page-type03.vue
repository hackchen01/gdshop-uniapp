<template>
	<view class="notice-box">
		<u-notice-bar mode="vertical" :more-icon="true" :list="noticeList" @click="gotoClick"></u-notice-bar>
	</view>
</template>

<script>
	export default {
		name: "diy-page-type03",
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
			noticeList(){
				let tmps = []
				this.data.data_list.map(item => {
					tmps.push(item.title)
				})
				return tmps
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
