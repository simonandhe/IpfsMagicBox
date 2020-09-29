import $store from '@/store/index.js'
import formatterErrors from './errors.js'
import appConfig from '@/common/appConfig.js'
import MD5 from '@/common/lib/md5.js'
import lib from '@/common/lib/lib.js'
import {
	SIGN_OUT
} from '@/store/mutation-types'
export default {
	url: '',
	// 全局配置
	common: {
		baseUrl: appConfig.BASEURL,
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		// 添加token头部
		data: {},
		method: 'GET',
		dataType: 'json'
	},

	signData(data, nUrl) {
		var resultData = {}
		var timestamp = new Date().getTime()
		if ($store.state.AccessToken !== '') {
			data['authorization'] = $store.state.AccessToken
		} else {
			data['authorization'] = ''
		}
		data['timestamp'] = timestamp
		var data = data;
		var keys = Object.keys(data);
		keys.sort();
		var string = "";
		keys.forEach(k => {
			if (data[k] && k !== 'sign' && k !== 'timestamp') {
				string += k + '=' + data[k] + '&'
			}
			if (data[k] && k === 'timestamp') {
				string += k + '=' + timestamp + '&'
			}
		});
		string = string + 'key=' + nUrl;
		var sign = MD5(string).toString().toUpperCase();
		resultData = {
			...data,
			timestamp,
			sign
		}
		return resultData
	},
	// 请求 返回promise
	request(options = {}) {
		// 网络断网
		var isConnect = lib.NetWork.isConnect
		if (!isConnect) {
			uni.showToast({
				title: "无网络",
				icon: "none"
			})
			return
		}
		var nUrl = options.url
		// 组织参数
		options.url = this.common.baseUrl + options.url
		this.url = String(options.url)
		options.header = options.header || this.common.header
		if ($store.state.AccessToken !== '') {
			options.header['Authorization'] = $store.state.AccessToken
		}
		options.data = options.data || this.common.data
		options.data = this.signData(options.data, nUrl)
		options.method = options.method || this.common.method
		options.dataType = options.dataType || this.common.dataType
		if (options.checkToken) {
			if (!$store.state.AccessToken) {
				this.signOut(options.showLoginPage, '需要登录哦')
				return null
			}
		}

		// 请求
		return new Promise((res, rej) => {
			// 请求中...
			uni.request({
				...options,
				success: (result) => {
					// 返回原始数据
					if (options.native) {
						return res(result)
					}
					// 服务端失败
					if (result.statusCode !== 200) {
						if (options.toast !== false) {
							uni.showToast({
								title: result.data.msg || '服务端失败',
								icon: 'none'
							});
						}
						return rej(result.data)
					}
					// 成功
					let data = result.data
					res(data)
				},
				fail: (error) => {
					uni.showToast({
						title: error.errMsg || '请求失败',
						icon: 'none'
					});
					return rej()
				}
			});
		})
	},
	// 退出当前用户
	signOut(showLoginPage, mes = false) {
		$store.commit(SIGN_OUT)
		if (mes !== false && showLoginPage) {
			uni.showToast({
				title: mes,
				icon: 'none'
			});
		}
		if (showLoginPage) {
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/login/login?back=index'
				})
			}, 1000)
		}
	},

	// 错误处理
	errorCheck(res, back = null) {
		// 因为登录导致没有结果 直接返回
		if (!res) {
			return false
		}
		if (res.code !== 200) {
			let errMsg = res.msg
			if (formatterErrors[errMsg]) {
				errMsg = formatterErrors[errMsg]['zh-cn']
			}
			// 用户不存在
			if (res.code === 300 && res.msg == 'USER_NOTEXIST') {
				this.signOut(true, '用户不存在')
			}
			// 账户错误
			if (res.code === 300 && res.msg == 'USERSTATE_ERROR') {
				var str = this.url
				var sStr = 'api/user/loginByPhone'
				var sStr2 = 'api/user/login'
				if (str.indexOf(sStr) != -1 || str.indexOf(sStr2) != -1) { //不需要跳转到登录界面的失效请求
					this.signOut(false)
				} else {
					this.signOut(true, '账户不存在请联系管理员处理')
				}
			}
			// 登录失效
			if (res.code === 400 && res.msg == 'LOGIN_INVALID') {
				this.signOut(true, '登录失效')
			}

			// if (res.code === 400 && res.msg == 'REQUEST_INVALID') {
			// 	this.signOut(true, '非法访问')
			// }
			back && back({
				errMsg: errMsg
			})
			return false
		}
		return true
	},
	// get请求
	get(url, data = {}, options = {
		checkToken: false
	}) {
		if (options['showLoginPage'] == undefined) {
			options.showLoginPage = true
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	// post请求
	post(url, data = {}, options = {
		checkToken: false
	}) {
		if (options['showLoginPage'] == undefined) {
			options.showLoginPage = true
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
}
