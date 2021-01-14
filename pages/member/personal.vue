<template>
	<view class="personal-box">
		<view class="face">
			<view class="" @click="clickAvatar">
				<u-avatar
				:src="memberInfo.avatar"
				:size="200"
				></u-avatar>
			</view>
		</view>
		<u-cell-group>
			<u-cell-item title="昵称" :value="memberInfo.nickname"
			@click="clickNickname"
			></u-cell-item>
			<u-cell-item title="手机" :value="memberInfo.mobile"
			@click="clickMobile"
			></u-cell-item>
			<u-cell-item title="性别" :value="memberInfo.sexText"
			@click="clickSex"></u-cell-item>
		</u-cell-group>

		<u-action-sheet :list="avatarList" v-model="avatarShow"
		@click="avatarActionSheetClick"
		></u-action-sheet>
		<u-action-sheet :list="sexList" v-model="sexShow"
		@click="sexActionSheetClick"
		></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uploadAction: 'http://www.example.com/upload',
				memberInfo:{
					avatar:'http://woyinshua-order-img.gida.cn//icon/avatar/1.jpg',
					sexText:'男',
					sex:1,
					nickname:'张三',
					mobile:'13011112222',
				},
				sexList: [{
					text: '男'
				}, {
					text: '女'
				}],
				sexShow: false,
				avatarList: [{
					text: '更换头像'
				}, {
					text: '查看大图'
				}],
				avatarShow: false
			}
		},
		methods:{
			clickNickname(){
				this.$myRouter.push({name:'member/personal_ext',params:{type:'nickname'}})
			},
			clickMobile(){
				this.$myRouter.push({name:'member/personal_ext',params:{type:'mobile'}})
			},
			clickSex(){
				this.sexShow = true
			},
			sexActionSheetClick(_index){
				console.log(_index)
				this.memberInfo.sexText = this.sexList[_index]['text']
			},
			clickAvatar(){
				this.avatarShow = true
			},
			avatarActionSheetClick(_index){
				console.log(_index)
				switch (_index){
					case 0:
						this.selectAvatar()
						break;
					case 1:
						this.previewImage()
						break;
					default:
						break;
				}
			},
			previewImage(){
				uni.previewImage({
					current:0,
					urls: [this.memberInfo.avatar],
				});
			},
			selectAvatar(){
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    // sourceType: ['album'], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.personal-box{
	.face{
		width: 100%;
		display: flex;
		justify-content: center;
		justify-items: center;
		padding: 30rpx 0;
	}
}
</style>
