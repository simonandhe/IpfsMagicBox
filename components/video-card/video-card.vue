<template>
	<view class="video" @tap="click(pData.Id)">
		<view class="pic">
			<!-- <me-image src="http://img.cmvideo.cn:8080/publish/noms/2020/02/06/1O24E1BQCNLG3.jpg" contentclassame=".index-content"></me-image> -->
			<!-- <me-image :src="pData.Avatar" contentclassame=".index-content"></me-image> -->
			<!-- <me-image width="372" height="200" :src="imageSrc" contentclassame=".relative-content"></me-image> -->
			<me-image width="372" height="200" :src="pData.Avatar" contentclassame=".relative-content"></me-image>
			<!-- <text class="text">{{pData.Star}}</text> -->
		</view>
		<view class="name">{{pData.VideoName || '--'}}</view>
		<view class="description">{{pData.Intro || '--'}}</view>
	</view>
</template>

<script>
	import {
		images,
		basesrc
	} from '@/util/mockImage.js'
	export default {
		data() {
			return {
				appear: false,
				imageSrc: ''
			};
		},
		watch: {
			pData: {
				handler(newVal) {
					this.getMockImg()
				},
				deep: true
			}
		},
		props: {
			type: {
				type: String,
				required: true,
				// validator: function(value) {
				// 	return value === 'tv' ||
				// 		value === 'movie' ||
				// 		value === 'documental' ||
				// 		value === 'zy' ||
				// 		value === 'cartoon' ||
				// 		value === 'child' ||
				// 		value === 'other' ||
				// 		value === 'all'
				// }
			},
			pData: {
				type: Object
			}
		},
		mounted() {
			this.getMockImg()
		},
		methods: {
			getMockImg() {
				var index = Math.floor(Math.random() * (images.all.length - 0)) + 0
				var src = basesrc + images.all[index].src
				this.imageSrc = src
			},
			click(e) {
				this.$emit('click', e)
			}
		}
	}
</script>

<style scoped>
	.empty-img {
		height: 100upx;
		width: 100upx;
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

	@-webkit-keyframes fadeIn {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.anim_fade_image {
		position: absolute;
		animation-name: fadeIn;
		animation-duration: 1s;
		animation-direction: alternate;
	}
</style>
