<template>
	<u-popup v-model="value" mode="bottom" :popup="false" :mask="true" :closeable="true" :safe-area-inset-bottom="true"
	 close-icon-color="#ffffff" :z-index="uZIndex" :maskCloseAble="maskCloseAble" @close="close">
		<gdshop-tabs v-if="value" :list="genTabsList" :is-scroll="true" 
		:current="tabsIndex" @change="tabsChange" ref="tabs"></gdshop-tabs>
		<view class="area-box">
			<view class="u-flex" :class="{ 'change':isChange }">
				<view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group>
								<u-cell-item v-for="(item,index) in provinces" :title="item.label"
								 :arrow="false" :index="index" :key="index"
								 @click="provinceChange">
								 <view slot="right-icon">
									 <u-icon v-if="isChooseP&&province===index" size="34" name="checkmark"></u-icon>
								 </view>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
				<view class="area-item" v-if="!hideCity">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseP">
								<u-cell-item v-for="(item,index) in citys" :title="item.label"
								 :arrow="false" :index="index" :key="index"
								 @click="cityChange">
									<view slot="right-icon">
										<u-icon v-if="isChooseC&&city===index" size="34" name="checkmark"></u-icon>
									</view>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>

				<view class="area-item" v-if="!hideArea">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseC">
								<u-cell-item v-for="(item,index) in areas" :title="item.label"
								 :arrow="false" :index="index" :key="index"
								 @click="areaChange">
									<view slot="right-icon">
										<u-icon v-if="isChooseA&&area===index" size="34" name="checkmark"></u-icon>
									</view>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
				
				<view class="area-item" v-if="!hideStreet">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseA">
								<u-cell-item v-for="(item,index) in streets" :title="item.label"
								 :arrow="false" :index="index" :key="index"
								 @click="streetChange">
									<view slot="right-icon">
										<u-icon v-if="isChooseS&&street===index" size="34" name="checkmark"></u-icon>
									</view>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import gdshopTabs from '@/components/gdshop-tabs'
	/**
	 * city-select 省市区级联选择器
	 * @property {String Number} z-index 弹出时的z-index值（默认1075）
	 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker（默认true）
	 * @property {String} default-region 默认选中的地区，中文形式
	 * @property {String} default-code 默认选中的地区，编号形式
	 */
	export default {
		name: 'u-city-select',
		components:{
			gdshopTabs
		},
		props: {
			// 通过双向绑定控制组件的弹出与收起
			value: {
				type: Boolean,
				default: false
			},
			// 默认显示的地区，可传类似["河北省", "秦皇岛市", "北戴河区"]
			defaultRegion: {
				type: Array,
				default () {
					return [];
				}
			},
			// 默认显示地区的编码，defaultRegion和areaCode同时存在，areaCode优先，可传类似["13", "1303", "130304"]
			areaCode: {
				type: Array,
				default () {
					return [];
				}
			},
			// 是否允许通过点击遮罩关闭Picker
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 弹出的z-index值
			zIndex: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				isGetData: true,
				cityValue: "",
				isChooseP: false, //是否已经选择了省
				province: 0, //省级下标
				provinces: [],
				isChooseC: false, //是否已经选择了市
				city: 0, //市级下标
				citys: [],
				hideCity:false, // 隐藏市
				isChooseA: false, //是否已经选择了区
				area: 0, //区级下标
				areas: [],
				hideArea:false, // 隐藏区级
				isChooseS: false, //是否已经选择了街道
				street: 0, //街道下标
				streets: [],
				hideStreet:false, // 隐藏街道
				tabsIndex: 0,
			}
		},
		mounted() {
			this.init();
		},
		computed: {
			isChange() {
				return this.tabsIndex > 1;
			},
			genTabsList() {
				let tabsList = [{
					name: "请选择",
					show: true,
				}];
				if (this.isChooseP) {
					tabsList[0]['name'] = this.provinces[this.province]['label'];
					tabsList[1] = {
						name: "请选择",
						show: this.hideCity == false,
					};
				}
				if (this.isChooseC) {
					if(this.citys[this.city]){
						tabsList[1]['name'] = this.citys[this.city]['label'];
						tabsList[2] = {
							name: "请选择",
							show: this.hideArea == false,
						};
					}
				}
				if (this.isChooseA) {
					tabsList[2]['name'] = this.areas[this.area]['label'];
					tabsList[3] = {
						name: "请选择",
						show: this.hideStreet == false,
					};
				}
				if (this.isChooseS) {
					tabsList[3]['name'] = this.streets[this.street]['label'];
				}
				return tabsList;
			},
			uZIndex() {
				// 如果用户有传递z-index值，优先使用
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			}
		},
		methods: {
			init() {
				const that = this
				if (this.areaCode.length == 3) {
					this.setProvince("", this.areaCode[0]);
					this.setCity("", this.areaCode[1]);
					this.setArea("", this.areaCode[2]);
				} else if (this.defaultRegion.length == 3) {
					this.setProvince(this.defaultRegion[0], "");
					this.setCity(this.defaultRegion[1], "");
					this.setArea(this.defaultRegion[2], "");
				};
				that.getProvince()
			},
			reloadSelect(_code,_region){
				const that = this
				that.isGetData = false
				this.$api.area.pcas({
					code:_code,
					type:'cas'
					}).then(res => {
					that.citys = res['citys']
					that.areas = res['areas']
					that.streets = res['streets']
					that.setProvince(_region[0], '');
					that.setCity(_region[1], '');
					that.setArea(_region[2], '');
					that.setStreet(_region[3], '');
					setTimeout(function() {that.isGetData = true;}, 1500);
				})
				
			},
			getProvince(){
				const that = this
				this.$api.area.area({level:1}).then(res => {
					that.provinces = res
				})
			},
			setProvince(label = "", value = "") {
				this.provinces.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.provinceChange(k);
					}
				})
			},
			getCity(pcode,cbFn){
				const that = this
				this.$api.area.area({p_code:pcode}).then(res => {
					that.citys = res
					if (typeof cbFn == 'function'){
						cbFn(res)
					}
				})
			},
			setCity(label = "", value = "") {
				this.citys.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.cityChange(k);
					}
				})
			},
			getArea(pcode,cbFn){
				const that = this
				this.$api.area.area({p_code:pcode}).then(res => {
					that.areas = res
					if (typeof cbFn == 'function'){
						cbFn(res)
					}
				})
			},
			setArea(label = "", value = "") {
				this.areas.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.areaChange(k)
					}
				})
			},
			getStreet(pcode,cbFn){
				const that = this
				this.$api.area.area({p_code:pcode}).then(res => {
					that.streets = res
					if (typeof cbFn == 'function'){
						cbFn(res)
					}
				})
			},
			setStreet(label = "", value = "") {
				this.streets.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.isChooseS = true;
						this.street = k;
					}
				})
			},
			close() {
				this.$emit('input', false);
			},
			tabsChange(index) {
				this.tabsIndex = index;
			},
			provinceChange(index) {
				const that = this
				this.isChooseP = true;
				this.isChooseC = false;
				this.isChooseA = false;
				this.isChooseS = false;
				this.province = index;
				// this.citys = citys[index];
				console.log(this.provinces[index])
				if (true == that.isGetData){
					// 获取数据前先清空原数据
					that.citys = []
					uni.showLoading({})
					this.getCity(this.provinces[index]['value'],function(){
						// 数据加载完成再做切换
						that.tabsIndex = 1;
						// 如果 隐藏城市，自动加载下一级
						if (that.hideCity){
							that.cityChange(0)
						}
						else{
							uni.hideLoading()
						}
					})
				}
				this.hideCity = this.provinces[index]['is_next'] == 0
			},
			cityChange(index) {
				const that = this
				this.isChooseC = true;
				this.isChooseA = false;
				this.isChooseS = false;
				this.city = index;
				// this.areas = areas[this.province][index];
				if (true == this.isGetData){
					uni.showLoading({})
					this.getArea(this.citys[index]['value'],function(){
						uni.hideLoading()
						that.tabsIndex = 2;
					})
				}
			},
			areaChange(index) {
				const that = this
				this.isChooseA = true;
				this.isChooseS = false;
				this.area = index;
				if (true == this.isGetData){
					uni.showLoading({})
					this.getStreet(this.areas[index]['value'],function(){
						uni.hideLoading()
						that.tabsIndex = 3;
					})
				}
			},
			streetChange(index){
				this.isChooseS = true;
				this.street = index;
				this.emitResult()
			},
			emitResult(){
				let result = {};
				result.province = this.provinces[this.province];
				result.city = this.citys[this.city];
				result.area = this.areas[this.area];
				result.street = this.streets[this.street];
				
				this.$emit('city-change', result);
				this.close();
			}
		}

	}
</script>
<style lang="scss">
	.area-box {
		width: 100%;
		overflow: hidden;
		height: 800rpx;

		>view {
			width: 150%;
			transition: transform 0.3s ease-in-out 0s;
			transform: translateX(0);

			&.change {
				transform: translateX(-33.3333333%);
			}
		}

		.area-item {
			width: 33.3333333%;
			height: 800rpx;
			border-right: 1px solid #CCC;
			border-top: 1px solid #CCC;
		}
	}
</style>
