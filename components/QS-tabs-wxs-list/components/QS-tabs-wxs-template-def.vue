<!-- 该组件需自行实现, 此处只是示例 -->
<template>
	<view class="container" :class="getFixedClass">
		<scroll-view scroll-y class="scrollView" lower-threshold="200" :scroll-top="scrollTop" @scroll="scrollFn($event)"
		 @scrolltolower="getList(false, false, false)">
			<!-- 保证性能勿删 -->
			<view>
				<!-- 保证性能勿删 -->
				<!-- <block v-if="getShow"> -->
				<block>
					<!-- <loading-data-plus v-if="statusText.code === 3"></loading-data-plus> -->
					<go-top-but @click="gotoTop" v-show="oldScrollTop > 2000"></go-top-but>
					<banner v-if="banners.length > 0" @cliclk="gotoVide" :pData="banners"></banner>
					<!-- 自行实现页面样式展示 -->
					<view class="scroll-box">
						<!-- <block v-if="tab.type == 'movie'">
							<video-card-ver :type="tab.type" :pData="item" v-for="(item, ind) in list" :key="ind" @tap="gotoVide(item.Id)"></video-card-ver>
						</block> -->
						<!-- <video-card :type="tab.type" :pData="item" v-for="(item, ind) in list" :key="ind" @tap="gotoVide(item.Id)"></video-card> -->
						<view class="video" @tap="gotoVide(item.Id)" :key="item.Id" v-for="(item, index) in list">
							<!-- <me-image width="372" height="200" :src="item.Avatar" contentclassame=".relative-content"></me-image> -->
							<view class="pic">
								<view class="me-image-wrap">
									<view class="pic">
										<!-- <view class="image-node" :class="{'image-node-' + index : true}"> -->
										<view class="image-node" :class="getImageClass(index)">
											<image v-if="item.showImg" :class="{'anim_fade_image': item.showImg}" class="image" :src="item.Avatar +  $appConfig.getImgWidthPar(WindowWidth/2)"
											 mode="aspectFill"></image>
										</view>
									</view>
								</view>
								<!-- <text class="text">{{item.Star}}</text> -->
							</view>
							<view class="name">{{item.VideoName || '--'}}</view>
							<view class="description">{{item.Intro || '--'}}</view>
						</view>
					</view>

					<!-- 列表状态展示 -->
					<view class="statusText" @tap="getList(false, true, false)" :style="{
						'color': getColor
					}">
						<image class="re-icon" v-show="statusText.text === '数据加载中'" style="width: 30px; height: 30px;" src="/static/refresh.png"
						 mode=""></image>
						<image class="empty-logo" v-show="!statusText.text" src="/static/bgimg/img-empty-min.png" mode=""></image>
						{{statusText.text}}
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import banner from '@/components/banner/banner.vue';
	import videoCard from '@/components/video-card/video-card.vue';
	import videoCardVer from '@/components/video-card-ver/video-card-ver.vue';
	import goTopBut from '@/components/go-top-but/go-top-but.vue'

	// 组件必须
	import {
		QSTabsWxsListMixin
	} from '../mixins/QS-tabs-wxs-list-mixin.js';

	import {
		getTabList
	} from '@/util/getTabList.js';
	import {
		doPageDemand
	} from '../js/pageDemand.js';
	export default {
		mixins: [QSTabsWxsListMixin()], // 组件必须
		components: {
			banner,
			videoCard,
			videoCardVer,
			goTopBut
		},
		data() {
			return {
				list: [],
				banners: [],
				sendData: {
					page: 1,
					limit: 20,
					'type[0]': this.tab.type
				},
				statusText: {},
				refreshClear: false
			}
		},
		computed: {
			getColor() {
				let color;
				switch (this.type) {
					case 'setColor':
						color = '#fff';
						break;
					case 'index':
						color = '#fff';
						break;
					default:
						color = '#999';
						break;
				}
				return color;
			}
		},
		methods: {
			getImageClass(index) {
				return {
					[`image-node-${this.tab.type}-${index}`]: true
				}
			},
			init(refresh) { //若是用户触发下拉刷新则refresh为true
				this.$emit('loading')
				this.getBanners()
				if (this.refreshClear) this.oldScrollTop = 0;
				this.getList(refresh, false, false);
			},
			getList(refresh, doEvent, force) {
				let _this = this;
				doPageDemand.call(this, {
					getDataFn: getTabList, //获取数据的方法
					success() {
						_this.$emit('loadend')
						if (refresh) _this.$emit('refreshEnd');
					},
					fail() {
						// console.log('访问接口失败');
					}, //接口访问失败回调

					sendDataName: 'sendData', //携带数据字段名称
					pageNumName: 'page', //携带数据中的页数字段名称
					pageSizeName: 'limit', //携带数据中的条数字段名称

					checkLastPageMode: false, //判断是否是最后一页的逻辑标识, 用于逻辑判断, 目前默认有两个参数 size: 判断条数, page: 判断页数, 默认为size
					newDatafields: 'list', //接口访问成功后获取列表数据字段名称, 可用. 链式获取
					dataLastPageName: false, //接口访问成功后数据中的最大页数字段名称, 可用. 链式获取
					sizeName: false, //接口访问成功后数据中条数字段名称, 可用. 链式获取

					setName: 'list', //页面中列表数据字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略
					statusTextName: 'statusText', //页面中列表状态字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略
					lastPageName: false, //页面中最后一页字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略
					waitingName: false, //页面中获取数据等待字段名称, 如果在页面中分别有两个或两个以上列表使用该js, 则页面中需区分传入, 否则可以忽略

					refresh, //刷新标识, 若为true则会将携带数据中的页数重置为1
					force, //强制标识, 若为true则会忽略等待标识为true时的跳过操作
					doEvent, //进入状态判断标识, 若为true则会进入判断列表status而进行相应操作
					noDataText: false, //访问接口后若数据长度为0则可自定义为空时文字
					refreshClear: this.refreshClear, //刷新时是否清空数据
				})
			},
			gotoVide(id) {
				uni.navigateTo({
					url: `/pages/video/video?vid=${id}`
				})
			},
			async getBanners() {
				let res = await this.$H.post(this.$appConfig.URL.GETTOPSLIST_URL, {
					videotype: this.tab.type
				})
				if (!this.$H.errorCheck(res)) {
					return
				}
				this.banners = res.data
				console.log('this.banners', this.banners)
			},
		}
	}
</script>

<style scoped>
	@import url("../css/QS-tabs-wxs-list-components.css");

	.re-icon {
		animation: spin 5s linear infinite;
	}

	.empty-logo {
		margin-top: 200upx;
		height: 150upx;
		width: 150upx;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
			transition: all 5s;
		}
	}

	.fixed-buttom {
		position: fixed;
		bottom: 10upx;
		right: 10upx;
		z-index: 300;
	}

	.scroll-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.video {
		display: inline-block;
		margin-top: 28upx;
		width: 375upx;
		box-sizing: border-box
	}

	.video .pic {
		position: relative;
		width: 100%;
		height: 200upx;
	}

	.video .pic .tip {
		position: absolute;
		top: 10upx;
		right: 10upx;
		padding: 6upx 10upx;
		font-size: 14upx;
		border-radius: 20upx 0 20upx 20upx;
		background: #e8bb20;
		color: #fff
	}

	.video .pic .text {
		position: absolute;
		bottom: 16upx;
		right: 16upx;
		font-size: 24upx;
		color: #fff
	}

	.video .name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		padding: 12upx 0 18upx 24upx;
		font-size: 28upx
	}

	.video .description {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		padding-left: 24upx;
		font-size: 20upx;
		color: #ababab
	}

	.image {
		width: 373upx;
		height: 200upx;
	}


	.me-image-wrap {
		display: inline-block;
		width: 373upx;
		box-sizing: border-box
	}

	.me-image-wrap .pic {
		position: relative;
		width: 100%;
		height: 200upx;
		background-image: url('~@/static/bgimg/img-empty-full.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	@-webkit-keyframes fadeIn {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@-webkit-keyframes fadeOut {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	.anim_fade_image_fade_out {
		position: absolute;
		animation-name: fadeOut;
		animation-duration: 3s;
		animation-direction: alternate;
	}

	.anim_fade_image {
		position: absolute;
		animation-name: fadeIn;
		animation-duration: .5s;
		animation-direction: alternate;
	}
</style>
