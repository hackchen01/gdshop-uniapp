<template>
	<view>
		<address-list :addressList="addressList"></address-list>
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
			addressList: []
		};
	},
	onLoad() {
		const that = this
		that.getData();
		uni.$on('address_list_is_reload',function(){
			that.getData();
		})
	},
	onUnload() {
		uni.$off('address_list_is_reload')
	},
	methods: {
		getData() {
			const that = this
			that.$api.member_address.list({page:1,page_size:9999}).then(res => {
				console.log(res)
				that.addressList = res.list
			})
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
