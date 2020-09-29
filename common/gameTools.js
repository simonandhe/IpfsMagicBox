import appConfig from './appConfig.js';
// var appConfig = Vue.prototype.$appConfig;
var _accessToken;

/**
 * 获取当前远程webview对象111
 */
function getCurWebView() {
	// #ifdef APP-PLUS
	var pages = getCurrentPages();
	var page = pages[pages.length - 1];
	var currentWebview = page.$getAppWebview();
	var wv = currentWebview.children()[0];
	return wv;
	// #endif
}

/**
 * 用户授权
 */
function authorize(authorInfo) {
	_accessToken = authorInfo.accessToken;
	console.log(authorInfo)
	var webview = getCurWebView();
	webview.evalJS("WBSDK.initUser({'userName':'" + authorInfo.userName + "','accessToken':'" + authorInfo.accessToken +
		"','score':'" + authorInfo.score + "','gid':'" + authorInfo.gid + "'})");
}

function diskAuthorize(accessToken, CustomBar, StatusBar) {
	// #ifdef APP-PLUS
	var webview = getCurWebView();
	webview.evalJS("WBSDK.initUser({'AccessToken':'" + accessToken + "','CustomBar': '" + CustomBar + "','StatusBar': '" +
		StatusBar + "'})");
	// #endif
}



// app系统信息
function setSystemInfo(systemInfo) {
	var systemInfoStr = JSON.stringify(systemInfo)
	var evalJS = `WBSDK.setSystemInfo(${systemInfoStr})`
	console.log('执行的js' + evalJS)
	var webview = getCurWebView();
	webview.evalJS(evalJS);
}

/**
 * 支付
 * @param {Object} payInfo
 *  id  游戏id
 *  money 金额
 *  password 支付密码
 */
function pay(payInfo) {
	var params = {
		gid: payInfo.Id,
		paypwd: payInfo.password,
		integral: payInfo.money || 0
	}
	uni.request({
		url: appConfig.BASEURL + appConfig.URL.GAMEPAY_URL,
		method: "POST",
		data: {
			gid: payInfo.Id,
			integral: Number(payInfo.money),
			paypwd: payInfo.password
		},
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded',
			"Authorization": _accessToken
		},
		dataType: "json",
		success(res) {
			var webview = getCurWebView();
			if (res.data && res.data.code == 200) {
				//回调给webview success
				webview.evalJS("WBSDK.pay_callback('success')");
			} else {
				webview.evalJS("WBSDK.pay_callback('fail')");
			}
		},
		fail(err) {
			console.error(err);
		}
	})

}

/**
 * 收获
 * @param {Object} gainInfo
 * id  游戏id
 * money 金额
 */
function gain(gainInfo) {
	var params = {
		gid: gainInfo.Id,
		integral: gainInfo.money || 0
	}
	uni.request({
		url: appConfig.BASEURL + appConfig.URL.GAMEGAIN_URL,
		method: "POST",
		data: params,
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded',
			"Authorization": _accessToken
		},
		dataType: "json",
		success(res) {
			var webview = getCurWebView();
			if (res.data && res.data.code == 200) {
				//回调给webview success
				webview.evalJS("WBSDK.gain_callback('success')");
			} else {
				webview.evalJS("WBSDK.gain_callback('fail')");
			}
		},
		fail(err) {
			console.error(err);
		}
	})

}


module.exports = {
	authorize: authorize,
	pay: pay,
	setSystemInfo: setSystemInfo,
	gain: gain,
	diskAuthorize: diskAuthorize
};
