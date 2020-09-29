const errors = [
	['视频类型错误', 'TYPE_ERROR', 'TYPE_ERROR'],
	['验证码错误', 'CODETYPE_ERROR', 'CODETYPE_ERROR'],
	['是否推荐错误', 'ISRECOM_ERROR', 'ISRECOM_ERROR'],
	['是否付费错误', 'ISPAY_ERROR', 'ISPAY_ERROR'],
	['是否vip错误', 'ISVIP_ERROR', 'ISVIP_ERROR'],
	['排序类型错误', 'ORDERBY_ERROR', 'ORDERBY_ERROR'],
	['查询数据错误', 'DB_ERROR', 'DB_ERROR'],
	['未找到用户信息', 'ID_ERROR', 'ID_ERROR'],
	['orderId未填写或者格式错误', 'ORDERID_ERROR', 'ORDERID_ERROR'],
	['payType未填写或者格式错误', 'PAYTYPE_ERROR', 'PAYTYPE_ERROR'],
	['userName未填写或者格式错误', 'USERNAME_ERROR', 'USERNAME_ERROR'],
	['手机号码未填写或者格式错误', 'PHONE_ERROR', 'PHONE_ERROR'],
	['性别填写错误', 'SEX_ERROR', 'SEX_ERROR'],
	['密码错误或格式错误', 'PASSWORD_ERROR', 'PASSWORD_ERROR'],
	['旧密码错误', 'OLDPWD_ERROR', 'OLDPWD_ERROR'],
	['用户不存在', 'USER_ERROR', 'USER_ERROR'],
	['验证码错误或失效', 'VERIFY_CODE_ERROR', 'VERIFY_CODE_ERROR'],
	['VID错误', 'VID_ERROR', 'VID_ERROR'],
	['VSID错误', 'VSID_ERROR', 'VSID_ERROR'],
	['未查询到视频地址', 'VIDEO_ERROR', 'VIDEO_ERROR'],
	['内容为空', 'CONTENT_ERROR', 'CONTENT_ERROR'],
	['退出账户错误，可能是未找到有效的token', 'LOGOUT_ERROR', 'LOGOUT_ERROR'],
	['VCID错误', 'VCID_ERROR', 'VCID_ERROR'],
	['评论不存在', 'COMMENT_ERROR', 'COMMENT_ERROR'],
	['月数未填写或者格式错误', 'MONTHS_ERROR', 'MONTHS_ERROR'],
	['已购买该视频，不可重复购买', 'BOUGHT_ERROR', 'BOUGHT_ERROR'],
	['该视频未查询到', 'VIDEO_ERROR', 'VIDEO_ERROR'],
	['视频限制会员播放，无法单独购买', 'VIDEOLIMIT_ERROR', 'VIDEOLIMIT_ERROR'],
	['免费视频无需购买', 'VIDEOPRICE_ERROR', 'VIDEOPRICE_ERROR'],
	['登录账户错误次数过多，暂时锁定10分钟，稍后登录', 'LOGIN_LOCK', 'LOGIN_LOCK'],
	['手机号码未填写或者格式错误', 'PHONE_ERROR', 'PHONE_ERROR'],
	['注册类型验证码，手机号码已存在', 'PHONE_EXIST', 'PHONE_EXIST'],
	['该视频未查询到', 'VIDEO_ERROR', 'VIDEO_ERROR'],
	['非注册类型验证码，手机号码不存在', 'PHONE_NOTEXIST', 'PHONE_NOTEXIST'],
	['未查询到有效订单', 'ORDER_ERROR', 'ORDER_ERROR'],
	['登录失效', 'LOGIN_INVALID', 'LOGIN_INVALID'],

	// 新增 2020年2月28日17:55:07 by liu
	['用户已存在', 'USER_EXIST', 'USER_EXIST'],
	['未查询到该用户', 'USER_NOTEXIST', 'USER_NOTEXIST'],
	['账户地址错误', 'ADDRESS_ERROR', 'ADDRESS_ERROR'],
	['账户地址未设置', 'ADDRESS_NOTSET', 'ADDRESS_NOTSET'],
	['状态类型错误', 'STATE_ERROR', 'STATE_ERROR'],
	['订单ID错误', 'OID_ERROR', 'OID_ERROR'],
	['积分记录ID错误', 'RID_ERROR', 'RID_ERROR'],
	['播放时间错误', 'SECONDS_ERROR', 'SECONDS_ERROR'],
	['记录数据错误', 'RECORDS_ERROR', 'RECORDS_ERROR'],
	['直播ID错误', 'LID_ERROR', 'LID_ERROR'],
	['游戏ID错误', 'GID_ERROR', 'GID_ERROR'],
	['积分错误', 'INTEGRAL_ERROR', 'INTEGRAL_ERROR'],
	['支付密码错误', 'PAYPWD_ERROR', 'PAYPWD_ERROR'],
	['账户积分不足', 'INTEGRAL_NOTENOUGH', 'INTEGRAL_NOTENOUGH'],
	['支付密码未设置', 'PAYPWD_NOTSET', 'PAYPWD_NOTSET'],
	['游戏不存在', 'GAME_NOTEXIST', 'GAME_NOTEXIST'],
	['版本号错误', 'VERSION_ERROR', 'VERSION_ERROR'],
	['兑换比例异常', 'SCALE_ERROR', 'SCALE_ERROR'],
	['CID错误', 'CID_ERROR', 'CID_ERROR'],
	['交易号错误', 'TRANSACTION_ERROR', 'TRANSACTION_ERROR'],
	['账户地址错误', 'ETHADDRESS_NOTSET', 'ETHADDRESS_NOTSET'],
	['DID错误', 'DID_ERROR', 'DID_ERROR'],
	['账户不存在请联系管理员处理', 'USERSTATE_ERROR', 'USERSTATE_ERROR'],
	['非法访问', 'REQUEST_INVALID', 'REQUEST_INVALID'],
	['机器已被用户绑定', 'BINDED_ERROR', 'BINDED_ERROR'],
	['暂未查询到机器信息', 'MACADDRESS_ERROR', 'MACADDRESS_ERROR'],

	['账户ID错误', 'AID_ERROR', 'AID_ERROR'],
	['生成账户失败，请重新尝试', 'MAKE_TEMPUSER_ERROR', 'MAKE_TEMPUSER_ERROR'],
	['超过账户最大数量', 'MAX_ACCOUNT_ERROR', 'MAX_ACCOUNT_ERROR'],
	['无权限', 'LIMIT_INVALID', 'LIMIT_INVALID'],
	['暂无注册权限', 'AUTHORIZE_ERROR', 'AUTHORIZE_ERROR'],
	['解绑失败', 'UNTIE_ERROR', 'UNTIE_ERROR'],




]

const formatterErrors = errors.reduce((pre, cur) => {
	pre[cur[2].trim()] = {
		'zh-cn': cur[0],
		'en': cur[1]
	}
	return pre
}, {})

export default formatterErrors
