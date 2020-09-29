<template>
	<view class="me-image-wrap">
		<view class="pic" :class="{'error': error}">
			<view class="image-node">
				<image v-if="appear" @load="load" @error="errorHand" :class="{'anim_fade_image': appear}" class="image" :style="{height: height + 'rpx', width: width + 'rpx'}"
				 :src="src" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	let observer = null;
	export default {
		data() {
			return {
				appear: false,
				error: false
			};
		},
		props: {
			src: {
				type: String
			},
			contentclassame: {
				type: String,
				required: true
			},
			width: {
				type: String,
				required: true
			},
			height: {
				type: String,
				required: true
			}
		},
		mounted() {

			uni.createIntersectionObserver(this).relativeToViewport({
				bottom: 20
			}).observe('.image-node', (res) => {
				if (res.intersectionRatio > 0 && !this.appear) {
					this.appear = true;
				}
			})

			// observer = uni.createIntersectionObserver(this);
			// observer.relativeTo(this.contentclassame).observe('.image-node', (res) => {
			// 	if (res.intersectionRatio > 0 && !this.appear) {
			// 		this.appear = true;
			// 		// if (String(this.src).substr(0, 3) !== "http") {
			// 		// 	this.error = true
			// 		// } else {
			// 		// 	this.error = false
			// 		// }
			// 	} else if (!res.intersectionRatio > 0 && this.appear) {
			// 		// this.appear = false;
			// 	}
			// })
		},
		methods: {
			load() {
				this.error = false
			},
			errorHand(e) {
				this.error = true
			}
		}
		// beforeDestroy() {
		// 	observer = null
		// }
	}
</script>

<style scoped>
	.me-image-wrap {
		display: inline-block;
		width: 373upx;
		box-sizing: border-box
	}

	.me-image-wrap .pic {
		position: relative;
		width: 100%;
		height: 200upx;
		background-color: #f8f8f8;
	}

	.me-image-wrap .pic.error {
		background-image: url('~@/static/bgimg/img-empty.png');
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
	}

	.image {
		width: 373upx;
		height: 200upx;
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
