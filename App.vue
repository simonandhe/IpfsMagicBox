<script>
	import Vue from 'vue'
	import {
		INIT_USER
	} from '@/store/mutation-types'
	import store from '@/store/index.js'
	// #ifdef APP-PLUS
	import APPUpdate from "@/plugins/APPUpdate";
	// #endif
	export default {
		async onLaunch() {
			// #ifdef APP-PLUS
			// plus.screen.lockOrientation('portrait-primary');
			// #endif
			uni.getSystemInfo({
				// CustomBar 状态栏 + 标题
				success: function(e) {
					Vue.prototype.TabBarHeight = 45
					Vue.prototype.WindowHeight = e.windowHeight
					Vue.prototype.WindowWidth = e.windowWidth
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})

			this.lib.NetWork.On();

			// 是否登录
			await this.$store.commit(INIT_USER)

			if (store.state.isConnect) {
				await this.$store.dispatch('getVideoTabs')
				await this.$store.dispatch('getLiveTypes')
				await this.$store.dispatch('getLiveTags')
			}

			// #ifdef APP-PLUS
			APPUpdate()
			// #endif
		},
		mounted() {
			// 播放记录
			if (this.$store.state.isLogin) {
				this.$store.dispatch('updatePlayHistory')
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	/*每个页面公共css */
	@import "common/zcm-main.css";
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "common/global.css";
	@import "common/icon-global.css";
	@import "common/animate.css";
	/* 字体 */
	@import 'common/font.css';

	body {
		background-color: white;
	}

	/*  #endif */
	@import "common/free.css";
</style>
