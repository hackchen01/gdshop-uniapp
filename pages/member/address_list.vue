<template>
	<view>
		<address-list :addressList="siteList"></address-list>
	</view>
</template>

<script>
	import addressList from '@/components/address-list.vue'
export default {
	components:{
		addressList
	},
	data() {
		return {
			siteList: []
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		getData() {
			this.siteList = [
				{
					id: 1,
					name: '游X',
					phone: '183****5523',
					tag: [
						{
							tagText: '默认'
						},
						{
							tagText: '家'
						}
					],
					site: '广东省深圳市宝安区 自由路66号'
				},
				{
					id: 2,
					name: '李XX',
					phone: '183****5555',
					tag: [
						{
							tagText: '公司'
						}
					],
					site: '广东省深圳市宝安区 翻身路xx号'
				},
				{
					id: 3,
					name: '王YY',
					phone: '153****5555',
					tag: [],
					site: '广东省深圳市宝安区 平安路13号'
				}
			];
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
