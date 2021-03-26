<template>
	<view>
		<view v-for="(item,index) in data" :key="index">
			<type07 v-if="item.type_id == 7" :typeId="item.type_id" :data="item.data"></type07>
			<type03 v-if="item.type_id == 3" :typeId="item.type_id" :data="item.data"></type03>
			<type02 v-if="item.type_id == 2" :typeId="item.type_id" :data="item.data"></type02>
			<type06 v-if="item.type_id == 6" :typeId="item.type_id" :data="item.data"></type06>
			<type12 v-if="item.type_id == 12" 
			:typeId="item.type_id" :data="item.data"
			ref="type12"
			></type12>
		</view>
	</view>
</template>

<script>
	import type01 from './diy-page-type01.vue'
	import type02 from './diy-page-type02.vue'
	import type03 from './diy-page-type03.vue'
	import type06 from './diy-page-type06.vue'
	import type07 from './diy-page-type07.vue'
	import type12 from './diy-page-type12.vue'
	export default {
		name: "diy-page",
		components:{
			type01,
			type02,
			type03,
			type06,
			type07,
			type12,
		},
		props: {
			// DIY页面类型
			typeId: {
				type: Number,
				default: 0
			},
			//页面数据
			data: {
				type: Array,
				default: () => {
					return []
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
			loadMore(){
				// 只有最后一个才有加载更多的功能
				if (this.$refs['type12'].length){
					let lastItem = this.$refs['type12'][this.$refs['type12'].length - 1]
					lastItem.loadMore()
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	
</style>
