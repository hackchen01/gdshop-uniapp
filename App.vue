<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import './static/icon/iconfont.css';
	@import "plugins/uview-ui/index.scss";
	/*每个页面公共css */
	
	.payment-icon{
		width: 32px;
	}
	.payment-icon.img_bg{
		background-repeat: no-repeat;
		background-position: center;
	}
</style>
