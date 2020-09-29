import $H from '@/common/lib/request.js';
import store from '@/store/index.js'
import $appConfig from '@/common/appConfig.js'
import {
	SET_IS_CONNECT,
	SET_NETWORKTYPE
} from '@/store/mutation-types'
// 网络监听
const NetWork = {
	// 网络状态
	isConnect: false,
	// 监听网络状态
	On() {
		// 获取当前网络状态
		uni.getNetworkType({
			success: res => {
				store.commit(SET_NETWORKTYPE, res.networkType)
				if (res.networkType !== 'none') {
					this.isConnect = true
					store.commit(SET_IS_CONNECT, true)
					return
				}
				store.commit(SET_IS_CONNECT, false)
				uni.showToast({
					icon: 'none',
					title: '请先连接网络'
				})
			}
		})
		// 监听网络状态变化
		uni.onNetworkStatusChange(res => {
			store.commit(SET_NETWORKTYPE, res.networkType)
			this.isConnect = res.isConnected
			if (!res.isConnected) {
				store.commit(SET_IS_CONNECT, false)
				uni.showToast({
					icon: 'none',
					title: '您目前处于断网状态'
				})
			} else {
				store.commit(SET_IS_CONNECT, true)
			}
		})
	}
}

export default {
	NetWork
}
