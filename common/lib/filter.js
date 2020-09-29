export default {
	//将“空值转化” 为 "--"
	formatInvalid(value, dStr = '--') {
		let result = value;
		let invalids = ['null', 'undefined', '', null, undefined]
		for (var i = 0; i < invalids.length; i++) {
			if (invalids[i] === value) {
				result = '--';
				break;
			}
		}
		return result;
	},
	/**
	 * 格式化秒
	 * @param int  value 总秒数
	 * @return string result 格式化后的字符串
	 */
	formatSeconds(value) {
		var theTime = parseInt(value); // 需要转换的时间秒 
		var theTime1 = 0; // 分 
		var theTime2 = 0; // 小时 
		var theTime3 = 0; // 天
		if (theTime > 60) {
			theTime1 = parseInt(theTime / 60);
			theTime = parseInt(theTime % 60);
			if (theTime1 > 60) {
				theTime2 = parseInt(theTime1 / 60);
				theTime1 = parseInt(theTime1 % 60);
				if (theTime2 > 24) {
					//大于24小时
					theTime3 = parseInt(theTime2 / 24);
					theTime2 = parseInt(theTime2 % 24);
				}
			}
		}
		var result = '';
		if (theTime > 0) {
			result = "" + parseInt(theTime) + "秒";
		}
		if (theTime1 > 0) {
			result = "" + parseInt(theTime1) + "分" + result;
		}
		if (theTime2 > 0) {
			result = "" + parseInt(theTime2) + "小时" + result;
		}
		if (theTime3 > 0) {
			result = "" + parseInt(theTime3) + "天" + result;
		}
		return result;
	},
	// 返回日期
	dateFormatting(time, f = "yyyy-mm-dd") {
		if (!time) {
			return '--'
		}
		let result = '';
		let fTime = time.replace(/T/, ' ').replace(/\-/g, '/').replace('.000Z', '');
		return this.__getYMDHMS(new Date(new Date(fTime).setHours(new Date(fTime).getHours() + 0)), f);
	},
	// 积分列表类型
	formatIntegralListType(flag, dStr = '--') {
		var invalid = this.formatInvalid(flag)
		// 1积分充值等操作，2游戏操作，3,观看视频的操作，4冻结积分，5积分返回
		let result = dStr;
		if (invalid === 1) {
			result = '积分充值'
		} else if (invalid == 2) {
			result = '游戏'
		} else if (invalid == 3) {
			result = '视频'
		} else if (invalid == 4) {
			result = '冻结积分'
		} else if (invalid == 5) {
			result = '积分返回'
		} else if (invalid == 6) {
			result = '开机收益'
		} else {
			result = '--'
		}
		return result;
	},

	// 私有方法
	__getYMDHMS(time, f) {
		let result = '--';
		let year = time.getFullYear(),
			month = time.getMonth() + 1,
			date = time.getDate(),
			hours = time.getHours(),
			minute = time.getMinutes(),
			second = time.getSeconds();
		if (month < 10) {
			month = '0' + month;
		}
		if (date < 10) {
			date = '0' + date;
		}
		if (hours < 10) {
			hours = '0' + hours;
		}
		if (minute < 10) {
			minute = '0' + minute;
		}
		if (second < 10) {
			second = '0' + second;
		}
		if (f == 'yyyy-mm-dd') {
			result = year + '-' + month + '-' + date;
		}
		if (f == 'yyyy-mm-dd-hh') {
			result = year + '-' + month + '-' + date + ' ' + hours;
		}
		if (f == 'yyyy-mm-dd-hh-mm') {
			result = year + '-' + month + '-' + date + ' ' + hours + ':' + minute;
		}
		if (f == 'yyyy-mm-dd-hh-mm-ss') {
			result = year + '-' + month + '-' + date + '-' + hours + '-' + minute + '-' + second;
		}
		if (f == 'yy-mm-dd') {
			var str = String(year)
			result = str.substring(str.length - 2) + '-' + month + '-' + date;
		}
		if (f == 'mm-dd') {
			result = month + '-' + date;
		}
		if (f == 'dd') {
			result = date;
		}
		return result;
		// return {
		// 	year: year,
		// 	month: month,
		// 	date: date,
		// 	hours: hours,
		// 	minute: minute,
		// 	second: second
		// }
	},
	formatDate:function (date, fmt) {
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		}
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + ''
				fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
			}
		}
		return fmt
	}
	
	
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length)
}
