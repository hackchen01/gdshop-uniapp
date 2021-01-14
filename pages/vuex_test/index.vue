<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">
				vuex 模块化使用测试
			</text>
		</view>
		<view class="button-demo">
			<u-button>按钮组件演示</u-button>
			<u-button @click="test">取出</u-button>
			<u-button @click="test2" hover-start-time="0" hover-stay-time="0" throttleTime="0">存入</u-button>
			<button @click="$u.throttle(test3, 1500)" type="primary">快速点击</button>
		</view>
		<view class="link-demo">
			<u-link :color="$u.color['primary']" :under-line="true" href="http://www.uviewui.com">跳转uView文档：www.uviewui.com</u-link>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		computed: {
			...mapState({
				username: state => state.username,
				testtest: state => state.test.test
			})
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			...mapMutations(['setUsername']),
			// ...mapMutations('test',['setTest']),  拉取 test 模块 里面的 setTest mutations
			...mapMutations({
				setset: 'test/setTest'
			}),
			test(){
				console.log(this.username)
				console.log(this.testtest)
			}
			,test2(){
				console.log('test2')
				this.setUsername('test' + new Date().getTime())
				this.setset('test' + new Date().getTime())
			},
			test3(){
				console.log(this.$u)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.title {
		font-size: 28rpx;
		color: $u-content-color;
	}
	
	.button-demo {
		margin-top: 80rpx;
	}
	
	.link-demo {
		margin-top: 80rpx;
	}
</style>
