<template>
	<view>
		<view class="an-notice-box" :style="'background-color: '+bgColor+';'">
			<scroll-view class="an-notice-content">
				<swiper v-if="show" class="swiper" :autoplay="true" :interval="switchTime*1000" :duration="800" :circular="true"
				 :vertical="true">
					<swiper-item v-for="(text, index) in list" :key="index"  class="an-notice-content-item">
						<view class="swiper-item">
							<text class="an-notice-content-item-text" :style="'color: '+color+';'">
								{{text}}
							</text>
						</view>
					</swiper-item>
				</swiper>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: '暂无未读消息'
			},
			color: {
				type: String,
				default: '#'
			},
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			switchTime: {
				type: Number,
				default: 3
			}
		},
		data() {
			return {
				number: 0,
				list: [],
				copyText: '',
				show: '',
			};
		},
		mounted() {
			this.list = this.text.split('|');
			this.show = true;
			/* this.number = 0;
			this.startMove(); */
		},
		watch: {
			text: function() {
				this.show = true;
				if (this.text != this.copyText) {
					this.copyText = this.text;
					this.list = this.text.split('|');
				}
			}
		},
		methods: {
			more() {
				this.show = false;
				this.$emit('more')
			}
		}
	}
</script>

<style scoped>
	.swiper {
		height: 60upx !important;
	}

	.an-notice-box {
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: flex-start;
	}

	.an-notice-content {
		width: calc(100% - 220upx);
		position: relative;
		font-size: 28upx;
	}

	.an-notice-content-item {
		width: 100%;
		height: 100%;
		text-align: left;
	}

	.an-notice-content-item-text {
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	@keyframes anotice {
		0% {
			transform: translateY(100%);
		}

		30% {
			transform: translateY(0);
		}

		70% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-100%);
		}
	}
</style>
