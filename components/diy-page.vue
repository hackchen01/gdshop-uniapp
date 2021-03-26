<template>
	<view>
		<view v-for="(item,index) in data" :key="index">
			<type07 v-if="item.type_id == 7" :typeId="item.type_id" :data="item.data"></type07>
			<type03 v-if="item.type_id == 3" :typeId="item.type_id" :data="item.data"></type03>
			<type02 v-if="item.type_id == 2" :typeId="item.type_id" :data="item.data"></type02>
		</view>
	</view>
</template>

<script>
	import type01 from './diy-page-type01.vue'
	import type02 from './diy-page-type02.vue'
	import type03 from './diy-page-type03.vue'
	import type07 from './diy-page-type07.vue'
	export default {
		name: "diy-page",
		components:{
			type01,
			type07,
			type03,
			type02,
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
			
		},
	};
</script>

<style lang="scss" scoped>
	
</style>
