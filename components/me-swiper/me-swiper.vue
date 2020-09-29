<template>
	<view>
		<view id="refresh-container" class="swiper-wrap" @touchstart="MESWIPER.touchstart" @touchmove="MESWIPER.touchmove"
		 @touchend="MESWIPER.touchend">
			<view class="swiper-window"></view>
			<view class="swiper-window"></view>
			<view class="swiper-window"></view>
		</view>
	</view>
</template>
<script lang="wxs" module="MESWIPER" src="./wxs/ME-swiper.wxs"></script>
<script>
	export default {
		data() {
			return {
				transition: false
			};
		},
		mounted() {
			this.MESWIPER.init(this.init())
		},
		methods: {
			init() {
				var options = {
					itemWidth: 150
				}
				return options
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-wrap {
		white-space: nowrap;
		height: 300upx;
	}

	.swiper-window {
		display: inline-block;
		width: 300upx;
		height: 300upx;

		&:nth-child(1) {
			background-color: #F0AD4E;
		}

		&:nth-child(2) {
			background-color: #000000;
		}

		&:nth-child(3) {
			background-color: #007AFF;
		}
	}
</style>
