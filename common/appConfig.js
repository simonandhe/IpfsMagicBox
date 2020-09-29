if (process.env.NODE_ENV === 'development') {
	STATUS = 2
} else {
	STATUS = 1
}
let STATUS = 1; //1-正式域名 2-测试域名
let BASEURL;
switch (STATUS) {
	case 1:
		// BASEURL = 'http://36.33.216.70:16700'; //正式域名
		BASEURL = 'http://api.cowbox.xyz:16700'; //正式域名
		break;
	default:
		BASEURL = 'http://36.33.216.70:16700'; //测试域名
		break;
}
// 请求url
var URL = {
	"UPDATE_URL": "/api/global/update", //app更新
	"APPINDEX_URL": "/api/global/appIndex", //首页所有数据接口
	"LIVELIST_URL": "/api/live/getLiveList",
	"LIVEDETAIL_URL": "/api/live/getLiveInfo",
	"GETLIVECOLLECTION_URL": "/api/live/getLiveCollect",
	"ADDLIVECOLLECTION_URL": "/api/live/collectLive",
	"GAMELIST_URL": "/api/game/getGameList",
	"GAMEDETAIL_URL": "/api/game/getGameInfo",
	"GETGAMECOLLECTION_URL": "/api/game/getGameCollect",
	"ADDGAMECOLLECTION_URL": "/api/game/collectGame",
	"LIVECOLLECTION_URL": "/api/live/getLiveCollectList",
	"GAMECOLLECTIONLIST_URL": "/api/game/getGameCollectList",
	"GAMEPAY_URL": "/api/game/reduceGameIntegral",
	"GAMEGAIN_URL": "/api/game/addGameIntegral",
	"UOPLOADIMG_URL": "/api/global/uploadImg",
	"GETETHADDRESS_URL": "/api/global/getEthAddress",
	"APPLYDEPOSIT_URL": "/api/deposit/applyDeposit",
	"GETETHSCALE_URL": "/api/global/getEthScale",
	"APPLYCASHS_URL": "/api/cashs/applyCashs", //积分提现
	"ISSETPAYPWD_URL": "/api/user/isSetPaypwd", //是否设置过密码
	"DEPOSITLIST_URL": "/api/deposit/depositList", //积分充值列表
	"CASHSLIST_URL": "/api/cashs/cashsList", //积分提现列表
	"UPDATEUSERADDRESS_URL": "/api/user/updateUserAddress", //更新编辑地址
	"GETSIGNINFO_URL": "/api/sign/getSignInfo", //坚持是否签到
	"GETTOPSLIST_URL": "/api/global/getTopsList", //获取轮播图
	"GETVIDEOLIST_URL": "/api/video/getVideoList", //获取普通视频列表
	"UPDATEUSERINFO_URL": "/api/user/updateUserInfo", //更新用户信息
	"INTEGRALINFO_URL": "/api/user/integralInfo", //积分详情
	"INTEGRALLIST_URL": "/api/user/integralList", //积分列表
	"MACHINEINCOMELIST_URL": "/api/user/machineIncomeList", //矿机收益列表
	"ISPHONEREGISTERED_URL": "/api/user/isPhoneRegistered", //手机号是否注册
	"LOGINBYPHONE_URL": "/api/user/loginByPhone", //手机验证码登录
	"LOGIN_URL": "/api/user/login", //登录
	"TEMPLOGIN_URL": "/api/user/tempLogin", //影子账户登录
	"SIGNIN_URL": "/api/sign/signIn", //密码登录
	"LOGOUT_URL": "/api/user/logout", //退出登录
	"COLLECTLIST_URL": "/api/user/collectList", //普通视频收藏列表
	"GETLIVECOLLECTLIST_URL": "/api/live/getLiveCollectList", //直播视频收藏列表
	"GETGAMECOLLECTLIST_URL": "/api/game/getGameCollectList", //游戏收藏列表
	"DEALVIDEOCOLLECT_URL": "/api/video/dealVideoCollect", //普通视频收藏/取消收藏
	"COLLECTLIVE_URL": "/api/live/collectLive", //直播收藏/取消收藏
	"COLLECTGAME_URL": "/api/game/collectGame", //游戏收藏/取消收藏
	"RESETPASSWORD_URL": "/api/user/resetPassword", //重置账户密码
	"REGISTER_URL": "/api/user/register", //注册
	"RESETPAYPWD_URL": "/api/user/resetPaypwd", //重置支付密码
	"GETCODE_URL": "/api/user/getCode", //获取验证码
	"SETPASSWORD_URL": "/api/user/setPassword", //修改账户密码
	"GETVIDEOINFO_URL": "/api/video/getVideoInfo", //获取视频信息
	"GETVIDEOCOLLECT_URL": "/api/video/getVideoCollect", //视频是否收藏
	"GETVIDEOURL_URL": "/api/video/getVideoUrl", //获取视频播放地址
	"GETAPPTAB_URL": "/api/global/getAppTab", //获取视频tab
	"GETLIVETYPE_URL": "/api/global/getLiveType", //获取直播类型
	"FINDVIDEOPLAYS_URL": "/api/video/findVideoPlays", //获取视频播放记录
	"UPDATEVIDEOPLAYS_URL": "/api/video/updateVideoPlays", //更新播放记录
	"DELVIDEOPLAYS_URL": "/api/video/delVideoPlays", //删除播放记录
	"GETUSERINFO_URL": "/api/user/getUserInfo", //获取用户信息
	"GETVIDEOTAGS_URL": "/api/video/getVideoTags", //获取视频标签
	"DELCOLLECTLIVE_URL": "/api/live/delCollectLive", //批量删除收藏直播视频
	"DELGAMECOLLECT_URL": "/api/game/delGameCollect", //批量删除收藏直播视频
	"DELVIDEOCOLLECT_URL": "/api/video/delVideoCollect", //批量删除视频收藏
	"BINDMACHINE_URL": "/api/machine/bindMachine", //批量删除视频收藏
	"TEMPUSERLIST_URL": "/api/user/tempUserList", //影子账户列表
	"MAKETEMPUSER_URL": "/api/user/makeTempUser", //生成影子账户
	"TEMPUSERINFO_URL": "/api/user/tempUserInfo", //影子账户密码
	"TEMPUSERDEL_URL": "/api/user/tempUserDel", //影子账户删除
	"ALLMACHINEINTEGRAL_URL": "/api/user/allMachineIntegral", //所有机器收益统计
	"USERMACHINELIST_URL": "/api/machine/userMachineList", //会员矿机列表
	"MACHINELASTINFO_URL": "/api/machine/machineLastInfo", //矿机最新详情
	"DELBINDMACHINE_URL": "/api/machine/delBindMachine", //解绑矿机
	"GETMINERFEE_URL": "/api/global/getMinerFee", //解绑矿机






}

// 图片宽度
// imgWidth 图片原宽度
const getImgWidthPar = (imgWidth = 300, str = '?x-oss-process=image/resize,w_') => {
	var result = imgWidth * 2
	var resultWidth = str + result
	return resultWidth
}

module.exports = {
	BASEURL: BASEURL,
	URL: URL,
	getImgWidthPar
};



export default {
	toast: 10090,
	noNetwork: 10080,
	// popup包含popup，actionsheet，keyboard，picker的值
	popup: 10075,
	mask: 10070,
	navbar: 980,
	topTips: 975,
	sticky: 970,
	indexListSticky: 965,
}
