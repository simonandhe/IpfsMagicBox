export default {
	data() {
		return {
			mixin_loadingData: false,
		}
	},
	methods: {

		mixin_LoadEndSync() {
			this.mixin_loadingData = false
		},
		mixin_LoadEnd() {
			setTimeout(() => {
				this.mixin_loadingData = false
			}, 1000)
		},
		mixin_Loading() {
			this.mixin_loadingData = true
		}

	}
}
