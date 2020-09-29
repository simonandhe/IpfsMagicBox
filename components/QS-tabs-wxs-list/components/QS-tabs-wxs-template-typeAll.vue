<!-- 该组件需自行实现, 此处只是示例 -->
<template>
	<view class="container" :class="getFixedClass" style="background-color: #FFFFFF;">
		<scroll-view scroll-y class="scrollView" lower-threshold="200" :scroll-top="scrollTop" @scroll="scrollFn($event)"
		 @scrolltolower="getList(false, false, false)">
			<!-- 保证性能勿删 -->
			<view>
				<!-- 保证性能勿删 -->
				<!-- <block v-if="getShow"> -->
				<block>
					<view>
						<go-top-but @click="gotoTop" v-show="oldScrollTop > 2000"></go-top-but>
						<banner v-if="banners.length > 0" ref="banner" @cliclk="gotoVide" :pData="banners" class="mb-3"></banner>
						<icon-nav @clinck="goliveRoom" :pData="iconNavs" class="icon-nav"></icon-nav>
						<view v-show="videoCardBoxList.length > 0" class="line-1"></view>
						<!-- <mes></mes> -->
						<block v-for="(item, index) in videoCardBoxList" :key="index">
							<video-card-box :clickChange="false" :datalistprop="item.list" :firstrequestprop="false" :butType="item.type == 'all' ? [false, true] : [true, true]"
							 @moreClick='moreClick' :ref="'videoCardBox' + index" @click="gotoVide" :type="item.type" :max="4"></video-card-box>
						</block>
					</view>

					<!-- 列表状态展示 -->
					<view class="statusText" @tap="getList(false, true, false)" :style="{
						'color': getColor
					}">
						<image class="re-icon" v-show="statusText2.text === '数据加载中'" style="width: 30px; height: 30px;" src="/static/refresh.png"
						 mode=""></image>
						<image class="empty-logo" v-show="!statusText2.text" src="/static/bgimg/img-empty-min.png"></image>
						<!-- 没有更多了 -->
						{{statusText2.text}}
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import banner from '@/components/banner/banner.vue';
	import iconNav from '@/components/icon-nav/icon-nav.vue';
	import mes from '@/components/mes/mes.vue';
	import videoCardBox from '@/components/video-card-box/video-card-box.vue';
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
		components: {
			banner,
			iconNav,
			mes,
			videoCardBox,
			goTopBut
		},
		mixins: [QSTabsWxsListMixin()], // 组件必须
		data() {
			return {
				loadingS: [],
				banners: [],
				iconNavs: [],
				videoCardBoxList: [],
				list: [],
				sendData: {
					pageNum: 1,
					pageSize: 50,
					tabId: this.tab.id
				},
				statusText: {},
				refreshClear: false,
				statusText2: {
					text: ''
				}
			}
		},
		computed: {
			...mapState(["videoTabs", "liveTabs"]),
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
			},
			// gitButType() {
			// 	var result = [true, true]
			// 	if ((this.videoTabs.length >= 1) && (this.videoTabs[0].type === 'all')) result = [false, true]
			// 	return result
			// },
			getVideoInfo() {
				var butType = [true, true]
				var index = Math.floor(Math.random() * (this.videoTabs.length - 0)) + 0
				var type = this.videoTabs[index].type
				var max = 4
				if (type === 'movie') max = 6
				if (type === 'all') butType = [false, true]
				return {
					butType,
					type,
					max
				}
			},


		},
		methods: {
			init(refresh) { //若是用户触发下拉刷新则refresh为true
				this.statusText2.text = '数据加载中'
				this.$emit('loading')
				var type = null
				type = this.liveTabs[0].type
				this.getAppIndex(refresh)
				if (this.refreshClear) this.oldScrollTop = 0;
			},
			moreClick(e) {
				console.log(e)
				this.$emit('moreClick', {
					type: e,
					index: this.index,
					tab: this.tab
				})
			},
			getList(refresh, doEvent, force) {

			},
			itemClick(ind) {
				uni.showToast({
					title: `第${this.index}列 第${ind}项`
				})
				uni.navigateTo({
					url: '/pages/video/video'
				})
			},
			async getAppIndex(refresh) {
				var data = {}
				if (refresh) {
					data['orderby'] = 'random'
				}

				this.$emit('loadend')

				let res = await this.$H.post(this.$appConfig.URL.APPINDEX_URL, data)
				if (!this.$H.errorCheck(res)) {
					return
				}
				this.banners = res.data.topList
				this.iconNavs = res.data.liveList;
				this.videoCardBoxList = res.data.videoList
				this.$emit('refreshEnd');
				this.statusText2.text = '没有更多了'
			},
			gotoVide(id) {
				uni.navigateTo({
					url: `/pages/video/video?vid=${id}`
				})
			},
			goliveRoom(item) {
				var type = null
				type = this.liveTabs[0].type
				uni.navigateTo({
					url: "/pages/liveRoom/liveRoom?title=" + item.Title + "&Id=" + item.Id + "&type=" + type
				});
			}
		}
	}
</script>

<style scoped>
	@import url("../css/QS-tabs-wxs-list-components.css");

	.film {
		width: 100%;
	}

	.empty-logo {
		margin-top: 200upx;
		height: 150upx;
		width: 150upx;
	}

	.empty-logo {
		height: 150upx;
		width: 150upx;
	}

	.icon-nav {
		margin-top: 18upx;
	}

	.re-icon {
		animation: spin 5s linear infinite;
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
</style>
