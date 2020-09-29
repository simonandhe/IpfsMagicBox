export default {
	data() {
		return {
			mixin_isConnectPage: true
		}
	},
	// onShow() {
	// 	if (!this.mixin_isConnectPage && this.isConnect) {
	// 		console.log('来网了哦 调用一下refresh方法')
	// 		this.refresh()
	// 	}
	// },
	onReady() {
		this.mixin_isConnectPage = this.isConnect
	},
	watch: {
		isConnect(n) {
			if (!n) {
				this.mixin_isConnectPage = n
			}
		}
	},
}
