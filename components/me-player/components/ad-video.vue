<template>
	<view class="ad-video-wrap">
		<!-- 广告视频 -->
		<video :show-center-play-btn="false" :enable-progress-gesture="false" autoplay class="videoPlay" v-show="show" @ended="ended"
		 src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4">
			<cover-view :key="index" v-for="(item, index) in allTime" v-show="time == item" class="ad-tip">广告{{item}}</cover-view>
		</video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allTime: 30,
				time: 30
			};
		},
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			setInterval(() => {
				this.time--
			}, 1000)
			this.videoCtx = uni.createVideoContext('demoVideo')
		},
		methods: {
			ended() {
				this.$emit('ended')
			}
		}
	}
</script>

<style lang="scss">
	.videoPlay {
		position: relative;
		width: 100%;
		height: 450upx;
	}

	.ad-tip {
		position: absolute;
		left: 50%;
		background-color: #000000;
		font-size: 28upx;
		width: 100upx;
		height: 40upx;
		line-height: 40upx;
		border-radius: 14upx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
