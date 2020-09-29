import Vue from 'vue'
import App from './App'
import store from './store'
Vue.config.productionTip = false

// 引入request库
import $H from '@/common/lib/request.js';
Vue.prototype.$H = $H
import lib from "@/common/lib/lib.js"
Vue.prototype.lib = lib

// 工具库
import filter from "@/common/lib/filter.js"
Vue.prototype.filter = filter
import graceChecker from "@/common/graceChecker.js"
Vue.prototype.gChecker = graceChecker

// 全局组件
import luButtonRipple from '@/components/lu-button-ripple/lu-button-ripple.vue';
import imageCache from "@/components/image-cache/image-cache.vue"
import tipLoading from "@/components/tip-loading/tip-loading.vue"
import cuCustom from './colorui/components/cu-custom.vue'
import meTitle from '@/components/me-title/me-title.vue'
import tipTipsPlus from '@/common/mixin/tip-tips/tip-tips-plus.vue'
import loadingPagePlus from "@/common/mixin/loading-page/loading-page-plus.vue"
import loadingDataPlus from "@/common/mixin/loading-data/loading-data-plus.vue"
import meButton from "@/components/me-button/me-button.vue"
import meInput from "@/components/me-input/me-input.vue"
import meTextarea from "@/components/me-textarea/me-textarea.vue"
import meDivider from '@/components/me-divider/me-divider.vue'
import meImage from '@/components/me-image/me-image.vue'
Vue.component('image-cache', imageCache);
Vue.component('loading-page-plus', loadingPagePlus);
Vue.component('loading-data-plus', loadingDataPlus);
Vue.component('cu-custom', cuCustom)
Vue.component('me-title', meTitle)
Vue.component('tip-loading', tipLoading)
Vue.component('tip-tips', tipTipsPlus)
Vue.component('me-button', meButton)
Vue.component('me-input', meInput)
Vue.component('me-textarea', meTextarea)
Vue.component('me-divider', meDivider)
Vue.component('me-image', meImage)
Vue.component('lu-button-ripple', luButtonRipple)
 

App.mpType = 'app'
Vue.prototype.$store = store

import appConfig from './common/appConfig.js'
Vue.prototype.$appConfig = appConfig;

import gameTools from './common/gameTools.js'
Vue.prototype.$gameTools = gameTools;


// log信息
Vue.prototype.$log = (str) => {
	console.log(str)
}

// 权限跳转
var Timeout = null
var url = null
Vue.prototype.navigateTo = (options) => {
	if (url == options.url) {
		console.log('拦截了', options.url)
		return
	} else {
		url = null
	}
	// if (Timeout) {
	// 	clearTimeout(Timeout);
	// }
	// Timeout = setTimeout(() => {
	// 判断用户是否登录
	var {
		suc,
		fail,
		checkLogin
	} = options
	if (!store.state.isLogin && checkLogin) {
		fail && fail()
		setTimeout(() => {
			uni.navigateTo({
				url: '/pages/login/login',
				complete() {
					url = null
				}
			});
		}, 1000)
	} else {
		suc && suc()
		url = options.url
		uni.navigateTo({
			...options,
			complete() {
				url = null
			}
		});
	}
	// }, 200);
}
// 返回
Vue.prototype.navigateBack = (delta = 1, time = 2000) => {
	setTimeout(() => {
		uni.navigateBack({
			delta: delta
		})
	}, time)
}

const app = new Vue({
	store,
	...App
})
app.$mount()
