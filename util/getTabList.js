import {
	QSRequest
} from '@/util/request/QS-request.js';

function getTabList(data) {
	// data等于
	// pageNum: 1
	// pageSize: 50
	// tabId: "tab_0"
	var result = QSRequest({
		urlField: 'testUrlList.testUrl',
		sendData: data,
		field: 'page',
		filterFn: filterTabList
	});
	return result
}

function filterTabList(page) { //过滤数据
	page.data.list.forEach((item, index) => {
		//头像合法处理
		if (String(item.Avatar).substr(0, 4) !== "http") {
			item.Avatar = '-1'
		}
			item['showImg'] = false
			item['error'] = false
	})
	return {
		list: page.data.list
	};
}

module.exports = {
	getTabList
}
