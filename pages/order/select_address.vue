<template>
	<view>
		<address-list :listMode="'select'" :addressList="addressList" 
		:selectedValue="selected"
		@selectAddress="selectAddress"></address-list>
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
			addressList: [],
			selected:'0'
		};
	},
	onLoad() {
		const that = this
		that.getData();
		if(that.$Route.query.selected){
			that.selected = that.$Route.query.selected.toString()
		}
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
		},
		selectAddress(_row){
			uni.$emit('order-create-select-address',_row)
			this.$myRouter.back()
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
