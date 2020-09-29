<template>
	<view class="video-wrap-wrap">
		<view class="me-player">
			<!--会员遮罩-->
			<!-- 		<view class="video-mask" v-if="playerData.showFlags.showVip">
				<text style="color: white; font-size: 14px;">本片需会员观看</text>
				<view class="bay-but" @click="$emit('vipButclick')">立即开通</view>
			</view> -->
			<!-- <ad-video :show="playerData.showFlags.adShow" @ended="playerData.showFlags.adShow = false"></ad-video> -->
			<!-- 播放器 -->
			<video @error="error" autoplay show-mute-btn :vslide-gesture="true" @loadedmetadata="loadedmetadata" @ended="ended"
			 @timeupdate="timeupdate" class="videoPlay" id="myVideo" :src="playerOptions.sources[0].src" page-gesture>
			</video>
		</view>
	</view>
</template>

<script>
	// import adVideo from './components/ad-video.vue'
	const initHistoryInfo = {
		vid: '',
		vsid: '',
		seconds: 0,
		seetime: '',
		showVideo: false
	}
	let historyInfo = {
		...initHistoryInfo
	}
	// 方向信息监听器
	// #ifdef APP-PLUS
	let Number = -1
	let orientation = 'middle'
	// #endif
	export default {
		data() {
			return {
				src: '',
				danmuValue: '',
				showVideoErrorMask: false
			}
		},
		computed: {
			//是否显示播放器
			//(如果没有任何 弹窗显示 就显示播放器)
			showVideo() {
				var result = true
				var obj = this.playerData.showFlags
				for (let key in obj) {
					if (obj[key]) {
						result = false
					}
				}
				return result
			}
		},
		mounted() {
			this.videoContext = uni.createVideoContext('myVideo')
			// #ifdef APP-PLUS
			var that = this
			Number = plus.orientation.watchOrientation(function(o) {
				if (o.gamma < -60 && orientation != 'left') {
					console.log('左')
					that.videoContext.exitFullScreen()
					that.videoContext.requestFullScreen(-90)
					orientation = 'left'
				} else if (o.gamma > 60 && orientation != 'right') {
					console.log('右')
					that.videoContext.exitFullScreen()
					that.videoContext.requestFullScreen(90)
					orientation = 'right'
				}
			}, function(e) {
				// 失败
				// console.log("Orientation error: " + e.message);
			});
			// #endif
		},
		props: {
			playerData: {
				type: Object,
				required: true
			},
			playerOptions: {
				type: Object,
				required: true
			}

		},
		beforeDestroy() {
			this.setPlayHistoryToLocal()
			this.updatePlayHistoryToVuexApi()
			// #ifdef APP-PLUS
			plus.orientation.clearWatch(Number)
			// #endif

		},
		methods: {
			setInitialTime(seconds) {
				this.videoContext && this.videoContext.seek(seconds)
			},
			pause() {
				this.videoContext && this.videoContext.pause()
			},
			play() {
				this.videoContext && this.videoContext.play()
			},
			error() {
				this.showVideoErrorMask = true
			},
			ended() {
				this.updatePlayHistoryToVuexApi()
			},

			loadedmetadata() {
				this.updatePlayHistoryToVuexApi()
			},
			timeupdate(e) {
				this.showVideoErrorMask = false
				// #ifdef APP-PLUS
				this.updatePlayHistoryToThis(e.detail.currentTime)
				// #endif
				// #ifdef H5
				this.updatePlayHistoryToThis(e.detail.currentTime)
				// #endif
			},
			setPlayHistoryToLocal() {
				if (historyInfo.seconds !== '' && historyInfo.vid !== '') {
					uni.setStorageSync('lastPlayHistory', JSON.stringify(historyInfo))
				}
			},
			updatePlayHistoryToThis(seconds) {
				if (seconds > 10) {
					historyInfo.vid = this.playerData.vid
					historyInfo.vsid = this.playerData.vsid
					historyInfo.seconds = seconds
					historyInfo.seetime = new Date().toString()
				}
			},
			async updatePlayHistoryToVuexApi() {
				if (!this.$store.state.isLogin) {
					historyInfo = { ...initHistoryInfo
					}
				} else {
					if (historyInfo.vid !== '') {
						await this.$store.dispatch('updatePlayHistory', historyInfo)
						historyInfo = { ...initHistoryInfo
						}
					}
				}

			},
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			},
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-title {
		height: 100upx;
		width: 100%;
		border: 1px solid red;
		z-index: 9999;
	}

	.video-wrap-wrap {
		font-size: 0;
	}

	.full-scroll {
		transform: rotate(90deg);
	}

	.video-error-mask {
		background-color: #000000;
		z-index: 999;
	}

	.me-player {
		position: relative;
		width: 100%;
		height: 450upx;

		& .videoPlay {
			width: 100%;
			height: 450upx;
		}

		& .video-mask {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: white;
			z-index: 2;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: #000000;
		}

		& .bay-but {
			cursor: pointer;
			margin: 12px 0;
			width: 220px;
			height: 30px;
			font-size: 13px;
			background-color: #ba7a5c;
			border-radius: 20px;
			text-align: center;
			line-height: 30px;
		}
	}
</style>
