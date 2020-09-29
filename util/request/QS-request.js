import _app from '@/util/request/app.js';
import $appConfig from '@/common/appConfig.js'
import $store from '@/store/index.js'
import {
	mock
} from './mock.js';
import MD5 from '@/common/lib/md5.js'
export function QSRequest({
	urlField,
	sendData,
	checkType,
	field,
	check,
	filterFn,
	hasLoading
} = {}) {
	return new Promise((resolve, reject) => {
		if (hasLoading) _app.showLoading('请稍候');
		const hasFilterFn = _app.isFn(filterFn);
		const url = $appConfig.BASEURL + $appConfig.URL.GETVIDEOLIST_URL;
		//为了便于示例
		let fn;
		// if (mock) {
		if (false) {
			fn = mock;
		} else {
			fn = request;
		}
		fn({
			url,
			data: {
				...sendData
			}
		}).then(res => {
			if (hasLoading) _app.hideLoading();
			let checkResult = true;
			if (check !== false) {
				checkResult = checkRes({
					res,
					type: checkType
				})
			}
			if (checkResult) {
				var data = hasFilterFn ? filterFn(res) : res
				resolve(data);
			} else {
				reject(res);
			}
		}).catch(err => {
			if (hasLoading) _app.hideLoading();
			reject(err);
		})
	})
}

function checkRes(obj) { //对于返回数据的健壮性判断
	let {
		res,
		type
	} = obj;
	if (!res) return false;
	type = type !== undefined ? type : 'msgAndCode';
	switch (type) {
		case 'msgAndCode':
			if (res) {
				if (res.code === 200) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		default:
			return false;
			break;
	}
}

export function getField(data, fields, pattern) { //字符串.获取指定字段数据
	if (!fields) return data;
	var arr = fields.split('.');
	var key = arr.shift();
	var value = data[key];

	if (value == null) {
		return value;
	} else if (arr.length == 0) {
		if (!pattern) return value;
		var type = Object.prototype.toString.call(value).replace('[object ', '').replace(']', '');
		if (pattern === true) {
			return type;
		} else if (!pattern) {
			return value;
		} else {
			return type == pattern;
		}
	}

	var result = getField(value, arr.join('.'), pattern);
	return result;
}

function signData(data, nUrl) {
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
	console.log('sign', sign)
	resultData = {
		...data,
		timestamp,
		sign
	}
	return resultData
}

function request(obj) {
	let _this = this;
	return new Promise((resolve, reject) => {
		try {
			const config = {
				header: {}
			};
			if (obj.contentType === 'json') {
				config.header['Content-type'] = 'application/json'
			} else {
				config.header['Content-type'] = 'application/x-www-form-urlencoded'
			}
			if (!obj.method) {
				obj.method = 'POST'
			}
			_app.log(
				`访问接口 url: ${obj.url}, data: ${JSON.stringify(obj.data)}, method: ${obj.method}, header: ${JSON.stringify(config.header)}`
			);
			console.log('obj.data之前', obj.data)
			console.log('url', $appConfig.URL.GETVIDEOLIST_URL)
			var sendData = signData(obj.data, $appConfig.URL.GETVIDEOLIST_URL)
			console.log('sendData', sendData)
			_app.log('obj')
			_app.log(obj)
			uni.request({
				...obj,
				...config,
				success(res) {
					_app.log(res)
					if (res.statusCode === 200) {
						resolve(res.data);
					} else {
						reject(res);
					}
				},
				fail(err) {
					reject(err)
				}
			});
		} catch (e) {
			reject(e)
		}
	})
}
