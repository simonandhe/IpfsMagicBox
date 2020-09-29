export default {
	data() {
		return {
			mixin_scrHeight: 0,
		}
	},
	methods: {
		mixin_getHeightExcludeTopCus() {
			let view = uni.createSelectorQuery().in(this);
			view.select('.topView').boundingClientRect();
			view.exec(res => {
				var topViewHeight = res[0].height;
				this.mixin_scrHeight = this.WindowHeight - topViewHeight - this.CustomBar
			})
		},
		mixin_getHeightExcludeTop() {
			let view = uni.createSelectorQuery().in(this);
			view.select('.topView').boundingClientRect();
			view.exec(res => {
				var topViewHeight = res[0].height;
				this.mixin_scrHeight = this.WindowHeight - topViewHeight
			})
		},
		mixin_getHeightExcludeCusTab() {
			this.mixin_scrHeight = this.WindowHeight - this.CustomBar - this.TabBarHeight
		},
		mixin_getHeightExcludeCus() {
			this.mixin_scrHeight = this.WindowHeight - this.CustomBar
		}
	}

}
