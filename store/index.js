import Vue from 'vue'
import Vuex from 'vuex'
import $H from '@/common/lib/request.js';
import $appConfig from '@/common/appConfig.js'
import {
	SIGN_OUT,
	UPDATE_USER_INFO,
	SET_AUTH,
	INIT_USER,
	SET_USERINFO,
	UPDATE_PLAY_HISTORY,
	SET_VIDEO_TABS,
	SET_LIVE_TABS,
	SET_LIVE_TAGS,
	SET_IS_CONNECT,
	SET_NETWORKTYPE
} from '@/store/mutation-types'

import gameTools from '../common/gameTools.js'

Vue.use(Vuex)

// 初始化数据
// 用户信息
const initUserInfo = {
	Id: '',
	Phone: '',
	MemberName: '无用户名',
	Avatar: null,
	LoginTime: null,
	CreateTime: null,
	ExpiredTime: null,
	Type: null
}
// 用户习惯设置
const customSetting = {
	volume: 0.5
}
// 播放记录
const initPlayHistory = {
	list: []
}
const initUpdateBox = {
	progress: 0,
	showLoading: false,
	updateBoxFun: null,
	showUpdateBox: false,
	forcedUpdate: false,
	haveVersion: false,
	version: ''
}

const store = new Vuex.Store({
	state: {
		// 用户信息
		userInfo: {},
		isLogin: false,
		AccessToken: "",
		// 用户end
		// 视频tab
		videoTabs: [],
		liveTabs: [],
		videoTags: [],
		// 视频tabend
		// 播放记录
		playHistory: {
			...initPlayHistory
		},
		playHistoryList: [],
		// 播放记录end
		// 更新弹窗
		...initUpdateBox,
		// 更新弹窗end

		// 网络情况
		isConnect: false,
		networkType: 'none'
	},
	mutations: {
		[SET_IS_CONNECT](state, isConnect) {
			state.isConnect = isConnect
		},
		[SET_NETWORKTYPE](state, networkType) {
			state.networkType = networkType
		},
		[SET_VIDEO_TABS](state, videoTabs) {
			state.videoTabs = videoTabs
		},
		[SET_LIVE_TABS](state, liveTabs) {
			state.liveTabs = liveTabs
		},
		[SET_LIVE_TAGS](state, videoTags) {
			state.videoTags = videoTags
		},
		[SIGN_OUT](state) {
			state.isLogin = false;
			uni.removeStorageSync("userInfo");
			uni.removeStorageSync("AccessToken");
			uni.removeStorageSync("showIncomeInfo");
			state.AccessToken = ''
			state.userInfo = { ...initUserInfo
			}
		},
		[UPDATE_USER_INFO](state, userInfo) {
			state.userInfo = Object.assign(state.userInfo, userInfo)
			uni.setStorageSync('userInfo', JSON.stringify(Object.assign(state.userInfo, userInfo)))
		},
		[SET_USERINFO](state, userInfo) {
			uni.setStorageSync("userInfo", userInfo);
		},
		[INIT_USER](state) {
			var userInfo;
			if (uni.getStorageSync("userInfo")) {
				try {
					userInfo = JSON.parse(uni.getStorageSync("userInfo"));
				} catch (e) {
					userInfo = {};
				}
			}
			var accessToken = uni.getStorageSync("AccessToken");
			if (userInfo) {
				state.userInfo = userInfo;
			} else {
				state.userInfo = { ...initUserInfo
				};
			}
			if (accessToken) {
				state.AccessToken = accessToken;
				state.isLogin = true;
				return true;
			}
			return false;
		},
		[SET_AUTH](state, accessToken) {
			state.AccessToken = accessToken;
			state.isLogin = true;
			uni.setStorageSync("AccessToken", accessToken);
		},
		[UPDATE_PLAY_HISTORY](state, list) {
			state.playHistory.list = list
			state.playHistoryList = list
			uni.setStorageSync('playHistory', JSON.stringify(list))
		}
	},
	actions: {
		// 视频tab获取
		async getVideoTabs({
			commit
		}) {
			try {
				let res = await $H.post($appConfig.URL.GETAPPTAB_URL, {});
				if (!$H.errorCheck(res)) {
					return;
				}
				commit(SET_VIDEO_TABS, res.data)
			} catch (e) {
				console.err(e)
			}
		},
		//直播tab获取
		async getLiveTypes({
			commit
		}) {
			try {
				let res = await $H.post($appConfig.URL.GETLIVETYPE_URL, {});
				if (!$H.errorCheck(res)) {
					return;
				}
				commit(SET_LIVE_TABS, res.data)
			} catch (e) {
				console.err
			}
		},
		//直播tags获取
		async getLiveTags({
			commit
		}) {
			try {
				let res = await $H.post($appConfig.URL.GETVIDEOTAGS_URL, {});
				if (!$H.errorCheck(res)) {
					return;
				}
				commit(SET_LIVE_TAGS, res.data)
			} catch (e) {
				console.err
			}
		},
		// 播放记录
		async updatePlayHistory({
			commit
		}, list = null) {
			if (!list) {
				let lastPlayHistory = null
				if (uni.getStorageSync('lastPlayHistory')) {
					lastPlayHistory = JSON.parse(uni.getStorageSync('lastPlayHistory'))
				}

				if (!lastPlayHistory) {
					let res = await $H.post($appConfig.URL.FINDVIDEOPLAYS_URL, {})
					if (!$H.errorCheck(res)) {
						return
					}
					await commit(UPDATE_PLAY_HISTORY, res.data ? res.data : [])
				} else {
					let data = {
						vid: lastPlayHistory.vid,
						vsid: lastPlayHistory.vsid,
						seconds: lastPlayHistory.seconds
					}
					uni.removeStorageSync('lastPlayHistory')
					let res = await $H.post($appConfig.URL.UPDATEVIDEOPLAYS_URL, data)
					if (!$H.errorCheck(res)) {
						return
					}
					let res2 = await $H.post($appConfig.URL.FINDVIDEOPLAYS_URL, {})
					if (!$H.errorCheck(res2)) {
						return
					}
					await commit(UPDATE_PLAY_HISTORY, res2.data ? res2.data : [])
				}
			} else {
				let data = {
					vid: list.vid,
					vsid: list.vsid,
					seconds: list.seconds
				}
				uni.removeStorageSync('lastPlayHistory')
				let res = await $H.post($appConfig.URL.UPDATEVIDEOPLAYS_URL, data)
				if (!$H.errorCheck(res)) {
					return
				}
				let res2 = await $H.post($appConfig.URL.FINDVIDEOPLAYS_URL, {})
				if (!$H.errorCheck(res2)) {
					return
				}
				await commit(UPDATE_PLAY_HISTORY, res2.data)
			}
		},
		async deletePlayHistory({
			commit
		}, vids) {
			let result = false
			let forData = {}

			forData['vid'] = JSON.stringify(vids)

			// vids.forEach((item, index) => {
			// 	forData[`vid[${index}]`] = item
			// })
			let res = await $H.post($appConfig.URL.DELVIDEOPLAYS_URL, forData)
			if (!$H.errorCheck(res)) {
				return false
			}
			result = true
			return result
		},
		//播放记录end
		// 用户相关
		getUserInfo(store) {

		},
		async updataUserInfo({
			commit
		}, data = null) {
			if (data === null) {
				try {
					let res = await $H.post($appConfig.URL.GETUSERINFO_URL, {}, {
						checkToken: true
					})
					if (!$H.errorCheck(res)) {
						return;
					}
					commit(UPDATE_USER_INFO, res.data)
				} catch (e) {
					commit(SIGN_OUT)
				}
			} else {
				commit(UPDATE_USER_INFO, data)
			}
		},
		pay(store, payInfo) {
			let that = this;
			gameTools.pay(payInfo.params, function() {
				payInfo.callback && payInfo.callback();
			});
		}
	}
})

export default store
